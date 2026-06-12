# handles-public-api-interfaces

Common TypeScript interfaces library for the [Handles Public API](https://api.handle.me/).

This package contains the shared type definitions (handles, personalization,
script details, datums, OAuth, etc.) used across the Handles ecosystem and by
external consumers such as the Cardano SDK. It ships no runtime code — only
types and the enums/const values they reference.

## Install

```bash
npm install @koralabs/handles-public-api-interfaces
```

## Usage

```ts
import { IHandle, Rarity, HandleType } from '@koralabs/handles-public-api-interfaces';

const handle: Partial<IHandle> = {
    name: 'my.handle',
    rarity: Rarity.basic,
    handle_type: HandleType.HANDLE
};
```

## Build

`tsc` compiles `index.ts` into `./lib` (JavaScript + `.d.ts` declarations).

```bash
npm install
npm run build
```

## Publishing

Publishing is automated. Pushing to `master` runs the
[`handles-public-api-interfaces`](.github/workflows/deploy.yml) GitHub Action,
which builds the package and publishes it to both GitHub Packages and npmjs.org.
Bump the `version` in `package.json` before merging — a push that reuses an
already-published version is rejected by both registries.

The API contract these interfaces mirror is documented in the Handles Public
API Swagger (`https://api.handle.me/swagger.json`). Keep the types in sync with
that contract when the API changes.
