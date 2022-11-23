// const SecretsManager = require('./AwsSecretsManager.js');
const AWS = require('aws-sdk')

exports.lambda_handler = async (event, context) => {
    console.log("event = ", event);
    let requestData = {};
    const secretName = JSON.parse(event.body).secretName;
        
    console.log("request secret = " + secretName);
    var region = 'us-east-1';

    
    let secretManager = new AWS.SecretsManager({ region: 'us-east-1' });
    const secretData = await secretManager.getSecretValue({ SecretId: secretName }).promise();
    console.log(`data is: ${JSON.stringify(secretData.SecretString)}`);
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(secretData.SecretString),
    };
    return response;
};
