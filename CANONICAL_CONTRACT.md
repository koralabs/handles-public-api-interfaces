# handles-public-api-interfaces canonical contract

I publish the TypeScript types and enums for the Handles public API (`@koralabs/handles-public-api-interfaces`). The API is the authority; my constants are what consumers use to read chain data.

1. **Types describe what the API really returns.** A required field is always present in the live payload; personalization and subhandle fields stay optional.
2. **Asset label constants are exact.** `AssetNameLabel` values (`00000000`, `000643b0`, `000de140`, `0014df10`, `001bc280`) never change.
3. **Rarity and handle-type names are stable** (`basic`..`legendary`, `handle`, `nft_subhandle`, `virtual_subhandle`).
4. **A breaking change is a major version** with a `CHANGELOG.md` entry.
