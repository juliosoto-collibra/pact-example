import path from 'path';
import { Verifier } from '@pact-foundation/pact';
import { VerifierOptions } from '@pact-foundation/pact/src/dsl/verifier/types';
import express from 'express';
import routes from '../routes';
import { setEmptyVisitorsDB } from './db';

// Setup provider server to verify
const app = express();
app.use(routes);
const server = app.listen('8080');

describe('Pact Verification', () => {
  jest.setTimeout(10000);
  it('validates the expectations of the Visitors pact', () => {
    const verifierOptions: VerifierOptions = {
      logLevel: 'info',
      providerBaseUrl: 'http://localhost:8080',
      provider: 'Usage Analytics REST API',
      providerVersion: process.env.GIT_COMMIT || '1.0.0',
      providerVersionBranch: process.env.GIT_BRANCH || 'main',
      providerVersionTags: [process.env.GIT_BRANCH || 'main'],
      consumerVersionSelectors: [
        { consumer: 'Usage Analytics Frontend', branch: 'main' },
      ],
      // pactUrls: [path.resolve(__dirname, '../../../consumer/pacts')],
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL || 'invalid_url',
      pactBrokerToken: process.env.PACT_BROKER_TOKEN || 'invalid_token',
      stateHandlers: {
        'visitors exist': async () => {
          setEmptyVisitorsDB(false);
          Promise.resolve('Visitors in db');
        },
        'no visitors': async () => {
          setEmptyVisitorsDB(true);
          Promise.resolve('Visitors removed from the db');
        },
      },
      // Must be true to publish to the broker the result of the verification
      publishVerificationResult: true,
    };

    return new Verifier(verifierOptions)
      .verifyProvider()
      .finally(() => server.close());
  });
});
