// buy-item.js
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
               .base(process.env.AIRTABLE_BASE_ID);

exports.handler = async (event) => {
  const { user, itemKey } = JSON.parse(event.body || '{}');
  if (!user || !itemKey) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing user or itemKey' }) };
  }

  try {
    // 1) Fetch item
    const [ itemRec ] = await base('ShopItems')
      .select({ filterByFormula: `{Key} = '${itemKey}'` })
      .all();
    const price    = itemRec.get('Price');
    const currency = itemRec.get('Currency');

    // 2) Fetch balance
    const [ balRec ] = await base('Balances')
      .select({ filterByFormula: `AND({User}='${user}',{Currency}='${currency}')` })
      .all();

    if (!balRec || balRec.get('Amount') < price) {
      return { statusCode: 200, body: JSON.stringify({ success: false, error: 'Insufficient funds' }) };
    }

    // 3) Deduct balance
    const newAmt = balRec.get('Amount') - price;
    await base('Balances').update([{ id: balRec.id, fields: { Amount: newAmt } }]);

    // 4) Update inventory
    const invRecs = await base('Inventories')
      .select({ filterByFormula: `AND({User}='${user}',{ItemKey}='${itemKey}')` })
      .all();
    if (invRecs.length) {
      const inv = invRecs[0];
      await base('Inventories').update([{ id: inv.id, fields: { Qty: inv.get('Qty') + 1 } }]);
    } else {
      await base('Inventories').create({ User: user, ItemKey: itemKey, Qty: 1 });
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: err.message }) };
  }
};
