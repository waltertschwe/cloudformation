import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../../src/handlers/getSecretLambda";
import { SecretsManager as fakeSecretsManager } from 'aws-sdk';

// jest.mock('aws-sdk');
// const setup = () => {
//     const mockGetSecretValue = jest.fn();
//     fakeSecretsManager.prototype.getSecretValue = mockGetSecretValue;
//     return { mockGetSecretValue };
// };

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

const mockgetSecretValue = jest.fn((SecretId) => {
    switch (SecretId) {
      case "secret1":
        return {
          SecretString: "secret-1-value",
        };
      case "secret2":
        return {
          SecretString: "secret-2-value",
        };
      default:
        throw Error("secret not found");
    }
  });
  
  jest.mock("aws-sdk", () => {
    return {
      config: {
        update() {
          return {};
        },
      },
      SecretsManager: jest.fn(() => {
        return {
          getSecretValue: jest.fn(({ SecretId }) => {
            return {
              promise: () => mockgetSecretValue(SecretId),
            };
          }),
        };
      }),
    };
  });

  describe('Test we have found a secret.', function () {
    it('verifies a secret was found and returned', async () => {
        const spy = jest.spyOn(AWS, "SecretsManager");
        const event: APIGatewayProxyEvent = {
            body: {
                secretName: "secret1"
            }
        } as any
        const result = await handler(event)

        expect(spy).toHaveBeenCalledTimes(2);
        expect(result.statusCode).toEqual(200);
    });
});