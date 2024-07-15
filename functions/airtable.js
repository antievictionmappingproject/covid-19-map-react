// WIP :|

exports.handler = function (event, context, callback) {
    // Airtable has transitioned from API keys to access tokens, 
    // see here: https://airtable.com/developers/web/api/authentication
    const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const Airtable = require("airtable");
    Airtable.configure({
        apiKey: AIRTABLE_ACCESS_TOKEN,
        endpointUrl: "https://api.airtable.com",
    });
    const base = Airtable.base(AIRTABLE_BASE_ID);

    const allRecords = [];
    base("Content Creation")
        .select({
            // Selecting the first 3 records in Interview Tracking:
            view: "Developer View",
        })
        .eachPage(
            function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.

                records
                    .filter(
                        (i) =>
                            i.fields["Latitude"] &&
                            i.fields["Longitude"] &&
                            i.fields["ENTRY COMPLETED"]
                    )
                    .forEach(function (record) {
                        if (
                            record.fields["Level of Anonymity Requested"] ===
                            "Complete Anonymity"
                        )
                            delete record.fields["Name of Interviewee or Anonymous"];
                        allRecords.push(record);
                    });

                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage();
            },
            function done(err) {
                if (err) {
                    callback(err);
                } else {
                    const response = {
                        statusCode: 200,
                        body: JSON.stringify({ records: allRecords }),
                        headers: {
                            "content-type": "application/json",
                            "cache-control": "Cache-Control: max-age=60, public",
                        },
                    };
                    callback(null, response);
                }
            }
        );
};