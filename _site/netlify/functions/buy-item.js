// netlify/functions/buy-item.js

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
               .base(process.env.AIRTABLE_BASE_ID);

exports.handler = async (event) => {
  const { user, itemKey } = JSON.parse(event.body || '{}');
  if (!user || !itemKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: 'Missing user or itemKey' })
    };
  }

  try {
    // 1) Load the shop item
    const [itemRec] = await base('ShopItems')
      .select({
        filterByFormula: `{Key}='${itemKey}'`,
        maxRecords: 1
      })
      .all();

    if (!itemRec) {
      return {
        statusCode: 404,
        body: JSON.stringify({ success: false, error: 'Item not found' })
      };
    }

    const price    = itemRec.get('Price');
    const currency = itemRec.get('Currency');

    // 2) Load the user's balance record
    const [balRec] = await base('Balances')
      .select({
        filterByFormula: `{User}='${user}'`,
        maxRecords: 1
      })
      .all();

    if (!balRec) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, error: 'No balance record found' })
      };
    }

    const have = balRec.get(currency) || 0;
    if (have < price) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, error: 'Insufficient funds' })
      };
    }

    // 3) Deduct the cost from the appropriate currency column
    await base('Balances').update([{
      id: balRec.id,
      fields: {
        [currency]: have - price
      }
    }]);

    // 4) Add to (or create) the inventory record
    const invRecs = await base('Inventories')
      .select({
        filterByFormula: `AND({User}='${user}',{ItemKey}='${itemKey}')`,
        maxRecords: 1
      })
      .all();

    if (invRecs.length) {
      const inv = invRecs[0];
      await base('Inventories').update([{
        id: inv.id,
        fields: { Qty: inv.get('Qty') + 1 }
      }]);
    } else {
      await base('Inventories').create({
        User: user,
        ItemKey: itemKey,
        Qty: 1
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
