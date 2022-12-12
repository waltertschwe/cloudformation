const AWS = require('aws-sdk')

const handler = async (event, context) => {
    let requestData = null;
    try {
        requestData = JSON.parse(event.body);
        
    } catch(e) {
        requestData = JSON.parse(JSON.stringify(event.body));
    }

    const secretName = requestData.secretName;
    if(typeof secretName === 'undefined') {
        return {
            statusCode:400,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"error": "Secret Service require a 'secretName' in the body request"})
        }
    }

    let secretManager = new AWS.SecretsManager({ region: 'us-east-1' });
    try {
        const secretData = await secretManager.getSecretValue({ SecretId: secretName }).promise();
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: secretData.SecretString,
        };
    } catch(e) {
        
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"error": "Could not find secret value for secret name:" + secretName})
        }
    }
};

module.exports = {
    handler,
};