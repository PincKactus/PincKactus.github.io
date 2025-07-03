// get-balance.js
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
               .base(process.env.AIRTABLE_BASE_ID);

exports.handler = async (event) => {
  const user = event.queryStringParameters?.user;
  if (!user) return { statusCode: 400, body: 'Missing user parameter' };

  try {
    const records = await base('Balances')
      .select({ filterByFormula: `{User} = '${user}'` })
      .all();
    const balances = records.map(r => ({
      currency: r.get('Currency'),
      amount:   r.get('Amount')
    }));
    return { statusCode: 200, body: JSON.stringify(balances) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
