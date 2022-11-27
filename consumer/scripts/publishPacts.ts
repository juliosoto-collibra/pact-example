import * as path from 'path';
import pact from '@pact-foundation/pact-node';

const PUBLISHER_OPTIONS = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: process.env.PACT_BROKER_BASE_URL || 'invalid_url',
  pactBrokerToken: process.env.PACT_BROKER_TOKEN || 'invalid_token',
  consumerVersion: process.env.GIT_REVISION || '1.0.0',
  branch: process.env.GIT_BRANCH || 'main',
  tags: [process.env.GIT_BRANCH || 'main'],
};

const ERROR_MESSAGE = '==== There were problems publishing pact contracts ====';

const publishPacts = async () => {
  await pact.publishPacts(PUBLISHER_OPTIONS).catch((err) => {
    console.log(ERROR_MESSAGE);
    console.error(err);
    process.exit(1);
  });
  return true;
};

publishPacts();
