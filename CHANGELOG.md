## 0.2.3 (2016-03-10)

Upgrade typings:

- Express update 4.x
- Created interface Express
- Update LoDash / object -> zipObject, any -> some, contains -> includes

## 0.2.2 (2016-03-09)

Change for TSFramework:

- Change TF for TS module name ...
- Change documentation
- Change repository
- Upgrade dependencias NPM

## 0.2.1 (2014-08-23)

Bug Fixes:

- Fix bug where models share the same waterline collection attributes.

## 0.2.0 (2014-08-17)

Bug Fixes:

- REST api `destroy` action should return the deleted object.

Features:

- Support `after` and `around` action filters.
- Call `configure` static methods for Model and Controller if defined when adding to application.
- Completed `node.d.ts` TypeScript declaration file for NodeJS.

Breaking Changes:

- Disallow passing app declaration file to `Application` constructor. Use `addDeclaration` method instead.
- Use `Reply` interface instead of `Response` object to send data to user.
- Remove `paths` config.
- Add `view`, `assetPath` configs.