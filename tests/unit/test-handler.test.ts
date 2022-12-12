import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../../src/handlers/getSecretLambda";

describe('Test a valid request where a secret is not found.', function () {
    it('verifies a secret was not found.', async () => {
        const event: APIGatewayProxyEvent = {
            body: {
                secretName: "secret-not-found"
            }
        } as any
        const result = await handler(event)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toStrictEqual(`{"error":"Could not find secret value for secret name: ${event.body.secretName}"}`);
    });
});

describe('Test a invalid request where a secretName key is not provided.', function () {
    it('verifies a secret was not found.', async () => {
        const event: APIGatewayProxyEvent = {
            body: {
                secretName23: "invalid-secret-key"
            }
        } as any
        const result = await handler(event)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toStrictEqual(`{"error":"Secret Service require a 'secretName' in the body request"}`);
    });
});