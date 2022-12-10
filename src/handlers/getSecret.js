const AWS = require('aws-sdk')

exports.lambda_handler = async (event, context) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    }
};
