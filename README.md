# PST Playwright TS

End-to-end tests written with [Playwright](https://playwright.dev) and TypeScript for [Practice Software Testing](https://practicesoftwaretesting.com), a demo web shop built for testing practice.

This is a personal practice project. It is not affiliated with or endorsed by the owners of Practice Software Testing.

## What is covered

- **Products:** the home page lists products.
- **Login:** a valid user reaches "My account"; unknown credentials show an error.
- **Cart:** a product can be added and the cart counter updates.
- **Checkout:** a full purchase, from login to the order confirmation.

The tests run on Chromium and Firefox.

## How it is organized

```
src/
  data/users.ts      demo user, defined once
  pages/             page objects, one class per page or shared component
                     (HomePage, ProductPage, LoginPage, CheckoutPage, Header)
tests/               specs: products, login, cart, checkout
playwright.config.ts base URL, browsers, reporter
```

- **Page Object Model:** locators and actions live in `src/pages`, and the specs only describe the scenario and make the assertions.
- **Locators:** role- and label-based (`getByRole`, `getByLabel`) before anything else.
- **`test.step`:** the checkout test is split into named steps that show up in the HTML report.

## Getting started

You need Node.js (a current LTS version).

```bash
npm ci
npx playwright install chromium firefox
```

On Debian or Ubuntu, `npx playwright install --with-deps` also installs the system libraries.

## Running the tests

```bash
npm test                  # all tests, headless
npm run test:ui           # Playwright UI mode
npm run test:headed       # with a visible browser
npm run report            # open the last HTML report
```

A single file or browser:

```bash
npx playwright test tests/cart.spec.ts
npx playwright test --project=chromium
```

## Things worth knowing

- The tests run against the public demo site, so they depend on its availability.
- The login uses the demo user `customer2@practicesoftwaretesting.com` from the app's own README. The user `customer@practicesoftwaretesting.com` gets locked (HTTP 423) after a few failed logins, so the failed-login test uses an email that does not exist.
- The checkout uses a US address with postal code `60601` on purpose: the API rejects a postal code that does not match the country.
- The GitHub Actions workflow is manual (`workflow_dispatch`). The demo site sits behind Cloudflare, which blocks GitHub-hosted runners with a bot check, so runs on every push always failed.

## License

[MIT](LICENSE)
