// get-shop.js
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
               .base(process.env.AIRTABLE_BASE_ID);

exports.handler = async () => {
  try {
    const records = await base('ShopItems').select({ view: 'Grid view' }).all();
    const items = records.map(r => ({
      key:      r.get('Key'),
      name:     r.get('Name'),
      desc:     r.get('Description'),
      price:    r.get('Price'),
      currency: r.get('Currency')
    }));
    return { statusCode: 200, body: JSON.stringify(items) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
