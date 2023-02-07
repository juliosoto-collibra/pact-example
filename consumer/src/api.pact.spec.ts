import { PactV3 as Pact, MatchersV3 as Matchers } from '@pact-foundation/pact';
import { APIGateway } from './api';

/**
 * The Pact mock provider instance is used to mock out the actual
 * provider, meaning that integration-like tests can be run without
 * requiring the actual service provider to be available.
 */
const mockProvider = new Pact({
  consumer: 'Usage Analytics Frontend',
  provider: 'Usage Analytics REST API',
  logLevel: 'info',
});

const mock1VisitorResponse = Matchers.like({
  results: Matchers.arrayContaining({
    isNewInPeriod: Matchers.boolean(true),
    currentVisits: Matchers.number(15),
    previousVisits: Matchers.number(2),
    daysActive: Matchers.number(4),
    fullName: Matchers.string('Christopher Weibel'),
    userName: Matchers.string('christopher.weibel'),
    userId: Matchers.string('5e3c90f5-048d-413b-bffb-0cb3bd44423d'),
    isDisabledUser: Matchers.boolean(false),
  }),
  success: Matchers.boolean(true),
});

const mock3VisitorsResponse = Matchers.like({
  results: Matchers.arrayContaining(
    {
      isNewInPeriod: Matchers.boolean(true),
      currentVisits: Matchers.number(15),
      previousVisits: Matchers.number(2),
      daysActive: Matchers.number(4),
      fullName: Matchers.string('Test One'),
      userName: Matchers.string('test.one'),
      userId: Matchers.string('11111-11111-11111-11111-11111'),
      isDisabledUser: Matchers.boolean(false),
    },
    {
      isNewInPeriod: Matchers.boolean(true),
      currentVisits: Matchers.number(15),
      previousVisits: Matchers.number(2),
      daysActive: Matchers.number(4),
      fullName: Matchers.string('Test Two'),
      userName: Matchers.string('test.two'),
      userId: Matchers.string('22222-22222-22222-22222-22222'),
      isDisabledUser: Matchers.boolean(false),
    },
    {
      isNewInPeriod: Matchers.boolean(true),
      currentVisits: Matchers.number(15),
      previousVisits: Matchers.number(2),
      daysActive: Matchers.number(4),
      fullName: Matchers.string('Test Three'),
      userName: Matchers.string('test.three'),
      userId: Matchers.string('33333-33333-33333-33333-33333'),
      isDisabledUser: Matchers.boolean(false),
    },
  ),
  success: Matchers.boolean(true),
});

const mockNoVisitorsResponse = Matchers.like({
  results: Matchers.arrayContaining(),
  success: Matchers.boolean(true),
});

describe('API Pact test', () => {
  describe('retrieving visitors', () => {
    test('1 visitor exists', async () => {
      /**
       * ARRANGE
       *
       * These lines below tells Pact to set the whole scenario up.
       * This will produce the Pact documentation so we want to be
       * as explicit and lengthy as possible.
       */
      await mockProvider
        .given('1 visitor exists')
        .uponReceiving('a request to get visitors')
        .withRequest({
          method: 'GET',
          path: '/visitors',
        })
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: mock1VisitorResponse,
        });

      return mockProvider.executeTest(async (mockServer) => {
        /**
         * ACT
         *
         * We tell the API client to talk to the Pact mock server instead
         * of the real thing. Thus, in summary we mock the response that
         * comes from the API so that we can unit test it.
         */
        const API = new APIGateway(mockServer.url);
        const visitors = await API.getVisitors();

        /**
         * ASSERT
         *
         * We assert the mocked response the and expected response match.
         */
        expect(visitors).toEqual({
          results: [
            {
              isNewInPeriod: true,
              currentVisits: 15,
              previousVisits: 2,
              daysActive: 4,
              fullName: 'Christopher Weibel',
              userName: 'christopher.weibel',
              userId: '5e3c90f5-048d-413b-bffb-0cb3bd44423d',
              isDisabledUser: false,
            },
          ],
          success: true,
        });
        return;
      });
    });
    test('3 visitors exists', async () => {
      /**
       * ARRANGE
       *
       * These lines below tells Pact to set the whole scenario up.
       * This will produce the Pact documentation so we want to be
       * as explicit and lengthy as possible.
       */
      await mockProvider
        .given('3 visitors exist')
        .uponReceiving('a request to get visitors')
        .withRequest({
          method: 'GET',
          path: '/visitors',
        })
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: mock3VisitorsResponse,
        });

      return mockProvider.executeTest(async (mockServer) => {
        /**
         * ACT
         * The Pact mock provider is used to mock out the actual provider,
         * meaning that integration-like tests can be run without
         * requiring the actual service provider to be available.
         * We tell the API client to talk to the Pact mock server instead
         * of the real thing. Thus, in summary we mock the response that
         * comes from the API so that we can unit test it.
         */
        const API = new APIGateway(mockServer.url);
        const visitors = await API.getVisitors();

        /**
         * ASSERT
         *
         * We assert the mocked response the and expected response match.
         */
        expect(visitors).toEqual({
          results: [
            {
              isNewInPeriod: true,
              currentVisits: 15,
              previousVisits: 2,
              daysActive: 4,
              fullName: 'Test One',
              userName: 'test.one',
              userId: '11111-11111-11111-11111-11111',
              isDisabledUser: false,
            },
            {
              isNewInPeriod: true,
              currentVisits: 15,
              previousVisits: 2,
              daysActive: 4,
              fullName: 'Test Two',
              userName: 'test.two',
              userId: '22222-22222-22222-22222-22222',
              isDisabledUser: false,
            },
            {
              isNewInPeriod: true,
              currentVisits: 15,
              previousVisits: 2,
              daysActive: 4,
              fullName: 'Test Three',
              userName: 'test.three',
              userId: '33333-33333-33333-33333-33333',
              isDisabledUser: false,
            },
          ],
          success: true,
        });
        return;
      });
    });

    test('visitors do not exist', async () => {
      /**
       * ARRANGE
       *
       * These lines below tells Pact to set the whole scenario up.
       * This will produce the Pact documentation so we want to be
       * as explicit and lengthy as possible.
       */
      await mockProvider
        .given('no visitors')
        .uponReceiving('a request to get visitors')
        .withRequest({
          method: 'GET',
          path: '/visitors',
        })
        .willRespondWith({
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: mockNoVisitorsResponse,
        });

      return mockProvider.executeTest(async (mockServer) => {
        /**
         * ACT
         *
         * We tell the API client to talk to the Pact mock server instead
         * of the real thing. Thus, in summary we mock the response that
         * comes from the API so that we can unit test it.
         */
        const API = new APIGateway(mockServer.url);
        const visitors = await API.getVisitors();

        /**
         * ASSERT
         *
         * We assert the mocked response the and expected response match.
         */
        expect(visitors).toEqual({
          results: [],
          success: true,
        });
        return;
      });
    });
  });
});
