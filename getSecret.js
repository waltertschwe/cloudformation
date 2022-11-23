const AWS = require('aws-sdk')

exports.lambda_handler = async (event, context) => {
    console.log("event = ", event);
    let requestData = {};
    
    const secretName = JSON.parse(event.body).secretName;
    if(typeof secretName === 'undefined') {
        return {
            statusCode:400,
            body: JSON.stringify({"error": "Secret Service require a 'secretName' in the body request"})
        }
    }

    let secretManager = new AWS.SecretsManager({ region: 'us-east-1' });
    try {
        const secretData = await secretManager.getSecretValue({ SecretId: secretName }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(secretData.SecretString),
        };
    } catch(e) {
        
        return {
            statusCode: 400,
            body: JSON.stringify({"error": "Could not find secret value for secret name:" + secretName})
        }
    }
};
