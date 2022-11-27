# Contract Testing Example

## Overview

Contract testing is a technique for testing an integration point by checking each application in isolation to ensure the requests it sends or the responses it receives conform to a shared understanding that is documented in a "contract".

In practice, a common way of implementing contract tests (and the way Pact does it) is to check that all the calls to your test doubles return the same results as a call to the real application would.

<img src="https://docs.pact.io/img/how-pact-works/summary.png" />
