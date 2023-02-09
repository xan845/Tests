const AWS = require('aws-sdk');
const https = require('https');

const region = ''; // For example, us-west-1
const service = 'es';
const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
const aws4 = require('aws4');

const host = ''; // The OpenSearch domain endpoint with https:// and without a trailing slash
const index = 'movies';
const url = host + '/' + index + '/_search';

// Lambda execution starts here
exports.handler = (event, context, callback) => {

// Put the user query into the query DSL for more accurate search results.
// Note that certain fields are boosted (^).
const query = {
    "size": 25,
    "query": {
        "multi_match": {
            "query": event.queryStringParameters.q,
            "fields": ["title^4", "plot^2", "actors", "directors"]
        }
    }
};

// Elasticsearch 6.x requires an explicit Content-Type header
const headers = {
    "Content-Type": "application/json"
};

// Make the signed HTTP request
const signedUrl = aws4.sign(
    {
        host,
        path: '/' + index + '/_search',
        method: 'GET',
        headers,
        service,
        region,
        body: JSON.stringify(query)
    },
    credentials
);

https.get(signedUrl, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        // Create the response and add some extra content to support CORS
        const response = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": '*'
            },
            "isBase64Encoded": false,
            "body": data
        };

        // Return the response
        callback(null, response);
    });
});
};
