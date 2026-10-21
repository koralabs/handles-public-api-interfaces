import {
    AddressType,
    HandleType,
    Rarity,
    type BoolInt,
    type HexString,
    type IApiError,
    type IHandle,
    type IPersonalizationDesigner,
    type IReferenceToken
} from '../lib/index';

// Invariant: consumers can use a core handle without personalization/subhandle
// extensions. Failure: making optional extensions required breaks this fixture.
// Negative control: make pfp_asset required in IHandle; compilation must fail.
const coreHandle = {
    hex: '74657374',
    name: 'test',
    handle_type: HandleType.HANDLE,
    holder: 'fixture-holder',
    holder_type: AddressType.enterprise,
    length: 4,
    og_number: 123,
    rarity: Rarity.common,
    characters: 'letters',
    numeric_modifiers: '',
    default_in_wallet: 'test',
    image: 'ipfs://fixture',
    image_hash: 'fixture-hash',
    standard_image: 'ipfs://fixture-standard',
    standard_image_hash: 'fixture-standard-hash',
    resolved_addresses: { ada: 'fixture-address' },
    created_slot_number: 1,
    updated_slot_number: 2,
    utxo: 'fixture-transaction#0',
    has_datum: false,
    svg_version: 3,
    version: 1
} satisfies IHandle;

function destination(handle: IHandle): string {
    return handle.resolved_addresses.ada;
}
destination(coreHandle);
destination({ ...coreHandle, svg_version: '3.1', pz_enabled: true });

// Invariant: resolved ADA destinations remain mandatory and string-valued.
// Failure: weakening/removing destination requirements accepts unusable records.
// Negative control: make resolved_addresses optional; the expected error becomes
// unused (or consumer access above fails), and the contract check must fail.
const { resolved_addresses: _address, ...withoutAddress } = coreHandle;
// @ts-expect-error A handle without its resolved address is not consumable.
destination(withoutAddress);
// @ts-expect-error An address object must include its ADA destination.
destination({ ...coreHandle, resolved_addresses: {} });
// @ts-expect-error Non-string destinations must not be accepted.
destination({ ...coreHandle, resolved_addresses: { ada: 123 } });

// Invariant: flags and hex fields retain their declared wire representation.
// Failure: broadening BoolInt to number or HexString to string erases validation.
// Negative control: either broadening makes its @ts-expect-error unused.
const enabled: BoolInt = 1;
const disabled: BoolInt = 0;
const hex: HexString = '0xabcdef';
// @ts-expect-error Only 0 and 1 are valid integer booleans.
const invalidFlag: BoolInt = 2;
// @ts-expect-error Hex fields require the wire-format prefix.
const invalidHex: HexString = 'abcdef';
const designer: IPersonalizationDesigner = {
    font_color: '',
    bg_color: hex,
    creator_defaults_enabled: enabled
};

// Invariant: script is optional on a reference token, but transaction identity is
// not. Failure: requiring script or making tx_id optional changes this contract.
// Negative control: either optionality change fails compilation.
const reference: IReferenceToken = {
    tx_id: 'fixture-transaction', index: 0, lovelace: 2_000_000,
    datum: 'd87980', address: 'fixture-address'
};
const { tx_id: _transaction, ...withoutTransaction } = reference;
// @ts-expect-error Reference tokens must identify their transaction.
const invalidReference: IReferenceToken = withoutTransaction;

// Invariant: consumers can always branch on error code and display a message/link.
// Failure: making error fields optional accepts incomplete API failure envelopes.
// Negative control: making docs optional makes the expected error unused.
const failure: IApiError = {
    error: 'handle_not_found', message: 'No such handle', docs: 'https://example.invalid/errors'
};
// @ts-expect-error Error envelopes must retain their documentation link.
const incompleteFailure: IApiError = { error: 'handle_not_found', message: 'No such handle' };

void [disabled, designer, failure, invalidFlag, invalidHex, invalidReference, incompleteFailure];
