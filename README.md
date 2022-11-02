# mam-secrets-service

# Execute Cloudformation Stack

aws cloudformation deploy --template ./nbc_secret_service_cloud_formation.json --stack-name mam-secret-service --capabilities CAPABILITY_IAM

 --parameter-overrides (these are all optional values)
 Environment="dev" (defaults to dev)
 InputApplicationTagName="mam-secret-userpool-tag" 
 InputUserPoolName="mam-secret-userpool" ghcdgfggffgfy r
 InputClientName="mam-secret" 
 InputRefreshTokenValidity="30"

# Test client credentials:

This will return an access_token that can be used to query the MAM Secret Service.

curl -X POST --user <app client id>:<app client secret> '<url>?grant_type=client_credentials' -H 'Content-Type: application/x-www-form-urlencoded'

# IAM Roles




