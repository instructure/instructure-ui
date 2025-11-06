# Regression testing app

This is a simple Next.js app importing (locally) @instructure/ui. This allows us to test a couple of different things:

- With Cypress and Chromatic we can detect visual changes in our components (e.g. the `<Button/>` component got a larger padding)
- With Cypress and axe-core we can detect a11y issues (e.g. the `<Button/>` component is missing an `aria-label`)

## Why npm instead of pnpm?

This app uses **npm** for package management, while the main InstUI monorepo uses **pnpm**. This is intentional to simulate how external consumers would use the `@instructure/ui` package.

Since most external users install packages via npm, using it here helps us:

- Test the package as it would be consumed in real-world scenarios
- Catch potential issues with dependency resolution that differ between npm and pnpm
- Ensure published packages work correctly with npm's installation behavior

## Development

### To run this app and cypress tests locally

1. Run `pnpm install` and `pnpm run bootstrap` from the project root.
2. Then open the regression test folder: `cd regression-test`
3. Install dependencies: `npm install`
4. Run the dev server with `npm run dev`
5. The dev server will be accessible at `localhost:3000`
6. Once the dev server is running you can start the Cypress e2e tests with the `npm run cypress` command. Run `npm run cypress-chrome` to open the Cypress GUI where you can see detailed error logs, snapshots etc.

### To add a new component

1. Create a new subfolder under `src/app` with the name of your new component and add an empty `page.tsx` file. E.g. if you want to create a page for `<Avatar/>`, create the page at `instructure-ui/regression-test/src/app/avatar/page.tsx`
2. Add some examples for your component that are meaningfully different. This usually means setting some props like `disabled` or `renderLabel`. Your goal is to make a page that can be screenshotted by Chromatic and if an unexpected change happens in that component, the screenshot will have a pixel difference.
3. After you have created an example page for the component, navigate to `instructure-ui/regression-test/cypress/e2e/spec.cy.ts` and add a new test block like this:

```typescript
it('check MyComponent', () => {
  cy.visit('http://localhost:3000/my-component')
  cy.injectAxe()
  cy.checkA11y(undefined, undefined, terminalLog)
})
```

4. This should be it. Commit your changes and push it to remote. The CI tool should now include your new component in the Chromatic tests and also run Axe a11y checks on it.
