# Changelog

## 3.0.0

Interfaces realigned to the current Handles Public API contract
(https://api.handle.me/swagger.json), verified against live API responses.

### Breaking changes (TypeScript)

Only three existing members of `IHandle` changed type — everything else in this
release is additive, and **no exports were removed**:

- **`holder_type: string` → `AddressType`** — string literals are no longer assignable; use the `AddressType` enum.
- **`svg_version: string` → `string | number`** — the API returns numeric `0` for un-personalized handles and a semver string otherwise; string methods now error without a narrow.
- **`handle_type` added as a required field** — `IHandle` object literals that omit it will fail to compile.

Constructing `IHandle` objects is therefore stricter; reads of unchanged fields
are unaffected.

### Added

- Fields on `IHandle`: `og`, `lovelace`, `original_address`, `virtual { expires_time, public_mint }`, SubHandle fields (`sub_length`, `sub_rarity`, `sub_characters`, `sub_numeric_modifiers`), and personalization-flattened fields (`pz_enabled`, `last_update_address`, `last_edited_time`, `payment_key_hash`, `policy`).
- Enums: `AddressType`, `DatumType`, `FilterType`, `MintingType`, `HealthStatus`.
- Interfaces: `IUTxO`, `IStats`, `IHolder`, `ISubHandleSettings`, `IApiError`, `IHealthResponse`.
- `IPersonalizationDesigner` gains `socials_color`, `circuit_color`; `IPersonalizationPortal` gains `default`; `ScriptDetails` gains `type` (family slug).

### Notes

- `version` remains `number` — the API returns a number; the Swagger `string` typing is incorrect.

## 2.13.0

Baseline restored from the published npm package after the GitHub repository was
removed. Adds the shared Kora Labs npm-publish workflow and emits `index.d.ts`
(the published 2.13.0 tarball was missing its declaration file).
