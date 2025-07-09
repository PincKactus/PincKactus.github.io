// netlify/functions/get-balance.js

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
               .base(process.env.AIRTABLE_BASE_ID);

exports.handler = async (event) => {
  try {
    const { user } = JSON.parse(event.body || '{}');
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Missing user' })
      };
    }

    // 1) Fetch the one Balances record for this user
    const [balRec] = await base('Balances')
      .select({
        filterByFormula: `{User}='${user}'`,
        maxRecords: 1
      })
      .all();

    // 2) If none exists, return empty balances
    if (!balRec) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, balances: {} })
      };
    }

    // 3) Extract all fields except the User column
    const fields = { ...balRec.fields };
    delete fields.User;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, balances: fields })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
