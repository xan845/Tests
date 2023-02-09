const AWS = require('aws-sdk');
const https = require('https');

const region = ''; // For example, us-west-1
const service = 'es';
const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
const aws4 = require('aws4');

const host = ''; // The OpenSearch domain endpoint with https:// and without a trailing slash
const index = 'movies';
const url = host + '/' + index + '/_doc';

// Lambda execution starts here
exports.handler = (event, context, callback) => {

// Put the user data into JSON format
const newData = JSON.parse(event.body);

// Elasticsearch 6.x requires an explicit Content-Type header
const headers = {
    "Content-Type": "application/json"
};

// Make the signed HTTP request
const signedUrl = aws4.sign(
    {
        host,
        path: '/' + index + '/_doc',
        method: 'POST',
        headers,
        service,
        region,
        body: JSON.stringify(newData)
    },
    credentials
);

https.request(signedUrl, (res) => {
    res.setEncoding('utf8');
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
}).end(JSON.stringify(newData));

};
