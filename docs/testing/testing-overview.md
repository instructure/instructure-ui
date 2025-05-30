---
title: Testing
category: Testing
order: 1
---

## Testing

This page provides an overview of the testing strategies we use to ensure the quality and stability of our components. We use a combination of modern tools to support our testing needs. Each tool serves a different purpose in our testing pyramid, from unit-level validations to full-blown visual and behavioral regression tests.

### Technologies Used:

#### Vitest + React Testing Library:

These tools are our primary stack for writing component-level unit tests. They are lightweight and fast. [Vitest](https://vitest.dev/guide/) is one of the fastest modern testing framework. It offers a Jest-like API and runs in a Node.js environment, making it ideal for testing individual components and functions in isolation. Paired with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), Vitest encourages accessible and maintainable test practices by querying elements the way users interact with them. It's best suited for testing component logic, rendering conditions, and props/state changes without needing a full browser environment. For a deeper dive into Vitest unit testing, check out our [detailed guides and examples.](/#vitest-unit-testing)

#### Cypress Component Testing:

[Cypress Component Testing](https://docs.cypress.io/app/component-testing/get-started) allows you to mount individual components in a real browser environment for precise interaction testing. Unlike traditional unit tests, it renders with full CSS and browser APIs, offering more realistic behavior. This makes it ideal for testing user interactions like clicks, keyboard navigation, focus traps, and animations. While a bit heavier than Vitest, it provides greate visibility and debugging capabilities for complex UI logic. For a deeper dive into Cypress component testing, check out our [detailed guides and examples.](#cypress-component-testing)

#### Chromatic Visual Regression Testing with Cypress:

We use [Cypress](https://docs.cypress.io/app/tooling/visual-testing) end-to-end tests to generate structured layouts and capture screenshots of components. [Chromatic](https://www.chromatic.com/docs/diff-inspector/) handles the visual diffing and review process. It's especially effective for catching layout shifts, styling regressions, or broken UI elements that don’t trigger functional test failures. Tests are run after changes are pushed, comparing the new screenshots to a baseline stored from a previously verified state. When differences are detected, the test fails and provides side-by-side diffs for easy review. This type of testing is particularly valuable for pixel-perfect components, design systems, or any feature with strict visual requirements.

#### Cypress Behavioral Regression Testing:

[Cypress Behavioral Regression Testing](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test) focuses on simulating realistic user flows across complex components or pages to ensure key behaviors remain stable. These tests often replicate critical workflows like navigation, and keyboard interactions. They are useful after feature changes or refactors, as they verify that the components still behaves correctly from the user’s perspective. Since the tests run in a real browser, they provide visibility into full-stack behavior, including browser APIs. These more complex end-to-end style tests are helps catch integration issues or regressions that unit and visual tests may overlook.
