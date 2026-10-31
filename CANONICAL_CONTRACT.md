# handles-public-api-interfaces canonical contract

## Purpose and authority

I publish the TypeScript types and enums for the Handles public API (`index.ts`, built to `lib/` and published as `@koralabs/handles-public-api-interfaces`). I follow the API's OpenAPI contract and live payloads; the API is the authority, not me. I hold no secrets and move no value, but my constants (asset label hex values, rarity names, handle types) are what consumers use to read chain data.

## Invariants (must never be violated)

1. **Types describe what the API really returns.** A required field must always be present in the live payload; personalization and subhandle fields stay optional.
2. **Asset label constants are exact.** `AssetNameLabel` values (`00000000`, `000643b0`, `000de140`, `0014df10`, `001bc280`) must never change; a wrong label points consumers at the wrong token.
3. **Rarity and handle-type names are stable** (`basic`..`legendary`, `handle`, `nft_subhandle`, `virtual_subhandle`).
4. **A breaking change is a major version** in `package.json` plus a `CHANGELOG.md` entry.
5. **No secrets, keys or endpoints with credentials** in the package.

Tested today: `test/consumer.contract.ts` compiles a consumer against the built declarations, with a negative control for making an optional field required. Not tested: label constants (invariant 2), enum names (3), version bump on breaking change (4), and agreement with the live API (1).

## Boundaries and known limits

- Compiled `lib/` is a build output. The publish workflow (`.github/workflows/deploy.yml`) is ordinary review.
- I cannot prove API conformance; that needs the API's own tests.

## Refactors needed to enforce this

- Add a test that pins the `AssetNameLabel` values and enum members.
- Generate or check types against `https://api.handle.me/swagger.json` in a local test.
- Add a check that a changed exported type bumps the major version.
