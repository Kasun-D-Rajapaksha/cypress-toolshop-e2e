# Cypress UI + API — Practice Software Testing

JavaScript Cypress suite for [Toolshop](https://practicesoftwaretesting.com/) and its [public REST API](https://api.practicesoftwaretesting.com/api/documentation). This is the practice app that supports both UI and API in one product, unlike Sauce Demo.

[![Cypress Tests](https://github.com/Kasun-D-Rajapaksha/cypress-toolshop-e2e/actions/workflows/cypress.yml/badge.svg)](https://github.com/Kasun-D-Rajapaksha/cypress-toolshop-e2e/actions/workflows/cypress.yml)

## What this repo demonstrates

- UI tests: login, catalog, search, sort, product details, cart
- API tests: health, products, auth token, negatives, register, cart CRUD
- Hybrid tests: API data asserted in the UI; API register then UI login
- `cy.intercept` to wait on catalog XHR and stub an empty list
- `cy.session` for UI login (`auth-token` in localStorage)
- Light page objects and `data-test` selectors
- `@cypress/grep`: PRs run `@smoke`, pushes to `main` run the full suite
- Mochawesome report and GitHub Actions artifacts

## Application under test

| Layer | URL |
| --- | --- |
| UI | https://practicesoftwaretesting.com |
| API | https://api.practicesoftwaretesting.com |
| Swagger | https://api.practicesoftwaretesting.com/api/documentation |

Published customer login is in [`cypress/fixtures/users.json`](cypress/fixtures/users.json) (`customer@practicesoftwaretesting.com` / `welcome01`).

## How to run

```bash
git clone https://github.com/Kasun-D-Rajapaksha/cypress-toolshop-e2e.git
cd cypress-toolshop-e2e
npm install
npm run lint
npm run cy:open
npm run cy:smoke
npm run cy:run
```

## Coverage

| Area | Specs |
| --- | --- |
| UI auth | Valid login, bad password, empty email, empty password |
| UI catalog | Product list, search, sort A–Z, product details |
| UI cart | Add to cart, continue shopping |
| API | `/status`, products list/detail/search/404, login, `/users/me`, register, cart CRUD |
| Hybrid | API product matches UI search; API register then UI sign-in |
| Intercepts | Wait on login page; wait on products QUERY; stub empty catalog |
| Smoke | Login → search → add to cart |

## Design notes

- Toolshop catalog calls use HTTP **QUERY**, not GET. Intercepts match `/products` by URL.
- Login UI is tested in `ui/auth/login.cy.js`. Other authenticated UI specs call `cy.loginAs('customer')`.
- No hardcoded `cy.wait(ms)`.

## License

MIT
