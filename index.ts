// Interfaces for the Handles Public API (https://api.handle.me/).
// The shapes below mirror the API's OpenAPI/Swagger contract
// (https://api.handle.me/swagger.json) and the live response payloads.
// Field optionality reflects what the API actually returns: core fields are
// always present, personalization- and subhandle-derived fields appear only
// when relevant.

export enum Rarity {
    basic = 'basic', // - 8-15 characters
    common = 'common', // - 4-7 characters
    rare = 'rare', // - 3 characters
    ultra_rare = 'ultra_rare', // - 2 characters
    legendary = 'legendary' // - 1 character
}

export type BoolInt = 0 | 1;
export type HexString = `0x${string}`;
export type HexStringOrEmpty = HexString | '';

/**
 * The asset label is a string that is used to identify the asset type.
 * First, remove the first and last 0.
 * Next, use the first 4 characters as the hex and convert to decimal. https://www.rapidtables.com/convert/number/hex-to-decimal.html
 * Finally, use the decimal number and convert to CRC8. It should match the last 2 characters. https://crccalc.com/
 */
export enum AssetNameLabel {
    LABEL_000 = '00000000', // 0
    LABEL_100 = '000643b0', // 100
    LABEL_222 = '000de140', // 222
    LABEL_333 = '0014df10', // 333
    LABEL_444 = '001bc280' // 444
}

export enum HandleType {
    VIRTUAL_SUBHANDLE = 'virtual_subhandle',
    NFT_SUBHANDLE = 'nft_subhandle',
    HANDLE = 'handle'
}

/**
 * Classification of a holder/resolved address.
 * - `wallet` - Shelley address, not a script, has a stake key
 * - `script` - Shelley address that is a script
 * - `enterprise` - Shelley address, not a script, no stake key
 * - `other` - not a Shelley address
 */
export enum AddressType {
    wallet = 'wallet',
    script = 'script',
    enterprise = 'enterprise',
    other = 'other'
}

/** Encoding requested from the `/datum` endpoints. */
export enum DatumType {
    json = 'json',
    tx_metadata_json = 'tx_metadata_json',
    tx_metadata_cbor = 'tx_metadata_cbor',
    plutus_data_json = 'plutus_data_json',
    plutus_data_cbor = 'plutus_data_cbor'
}

/** Lookup key used by the handle filter/search endpoints. */
export enum FilterType {
    handle = 'handle',
    handlehex = 'handlehex',
    assetname = 'assetname',
    holder = 'holder',
    bech32stake = 'bech32stake',
    bech32address = 'bech32address',
    hexaddress = 'hexaddress',
    paymentkeyhash = 'paymentkeyhash',
    stakekeyhash = 'stakekeyhash'
}

/** SubHandle minting type filter. */
export enum MintingType {
    nft = 'nft',
    virtual = 'virtual'
}

/** Index/sync health status reported by the health endpoint. */
export enum HealthStatus {
    current = 'current',
    updating = 'updating',
    ogmios_behind = 'ogmios_behind',
    storage_behind = 'storage_behind',
    waiting_on_cardano_node = 'waiting_on_cardano_node'
}

export interface KeyPair {
    key: string;
    value: any;
}

export interface SocialItem {
    display: string;
    url: string;
}

interface ISharedPzDesigner {
    pfp_border_color?: HexStringOrEmpty;
    qr_inner_eye?: string; // 'rounded,#0a1fd3';
    qr_outer_eye?: string; // 'square,#0a1fd3';
    qr_dot?: string; // 'dot,#0a1fd3';
    qr_bg_color?: HexStringOrEmpty; // '0x22d1af';
    qr_image?: string; // url or data:image;base64;
    pfp_zoom?: number; // 125 (percentage as integer > 100)
    pfp_offset?: number[]; //[124, 58],
    font?: string; // 'Family Name,https://fonts.com/super_cool_font.woff';
    font_color?: HexStringOrEmpty; // "0x0a1fd3",
    font_shadow_size?: number[]; // [12, 12, 8],
    text_ribbon_colors?: HexStringOrEmpty[]; // ["0x0a1fd3", "22d1af", "31bc23"],
    text_ribbon_gradient?: string; // 'none' | 'linear-XX' | 'radial'
}

export interface IPersonalizationDesigner extends ISharedPzDesigner {
    font_shadow_color?: HexStringOrEmpty;
    bg_color?: HexStringOrEmpty; // "0x0a1fd3"
    bg_border_color?: HexStringOrEmpty; //"0x0a1fd3"
    qr_link?: string;
    socials?: SocialItem[];
    socials_color?: string;
    circuit_color?: string;
    creator_defaults_enabled?: BoolInt;
}

export interface ICreatorDefaults extends ISharedPzDesigner {
    bg_border_colors?: HexStringOrEmpty[]; // ["0x0a1fd3", "22d1af", "31bc23"],
    pfp_border_colors?: HexStringOrEmpty[]; // ["0x0a1fd3", "22d1af", "31bc23"],
    font_shadow_colors?: HexStringOrEmpty[]; // ["0x0a1fd3", "22d1af", "31bc23"],
    require_pfp_collections?: HexStringOrEmpty[]; // ["0x<policy_id><asset_prefix>", "0x<other_policy_id>"],
    require_pfp_attributes?: string[]; // ["Outerwear:Denim Jacket"],
    require_pfp_displayed?: BoolInt; // true;
    price?: number; // 125;
    force_creator_settings?: BoolInt; // true;
    custom_dollar_symbol?: BoolInt; // true;
}

export interface IPersonalizationPortal {
    type: string;
    domain?: string | null;
    custom_settings?: string[] | null;
    default?: boolean;
}

export interface ScriptDetails {
    handle: string;
    handleHex: string;
    refScriptUtxo?: string;
    refScriptAddress?: string;
    cbor?: string;
    unoptimizedCbor?: string;
    validatorHash: string;
    latest?: boolean;
    type?: string; // family slug, e.g. 'pers', 'persprx'
}

export interface IReferenceToken {
    tx_id: string;
    index: number;
    lovelace: number;
    datum: string;
    address: string;
    script?: ScriptDetails;
}

/** A UTxO as exposed by the public API (`UTxO` swagger schema). */
export interface IUTxO {
    tx_id: string;
    index: number;
    lovelace: number;
    datum?: string;
    address: string;
    script?: ScriptDetails;
    reference_script?: string;
}

export interface IPersonalization {
    portal?: IPersonalizationPortal;
    designer?: IPersonalizationDesigner;
    socials?: SocialItem[];
    validated_by: string;
    trial: boolean;
    nsfw: boolean;
}

export interface IHandle {
    hex: string;
    name: string;
    handle_type: HandleType;
    holder: string;
    holder_type: AddressType;
    length: number;
    og_number: number;
    og?: boolean;
    rarity: Rarity;
    characters: string; // 'letters,numbers,special',
    numeric_modifiers: string; // 'negative,decimal',
    default_in_wallet: string; // my_default_hndl
    image: string;
    image_hash: string;
    standard_image: string;
    standard_image_hash: string;
    pfp_image?: string;
    pfp_asset?: string;
    bg_image?: string;
    bg_asset?: string;
    resolved_addresses: {
        ada: string;
        eth?: string;
        btc?: string;
    };
    created_slot_number: number;
    updated_slot_number: number;
    utxo: string;
    lovelace?: number;
    has_datum: boolean;
    datum?: string;
    script?: {
        type: string; // 'plutus_v2', etc
        cbor: string;
    };
    // SubHandle-only fields
    sub_length?: number;
    sub_rarity?: Rarity;
    sub_characters?: string;
    sub_numeric_modifiers?: string;
    original_address?: string; // address a SubHandle was originally minted to, if exposed
    virtual?: {
        expires_time?: number; // POSIX time the Virtual SubHandle expires
        public_mint?: boolean;
    };
    // Personalization-derived fields flattened onto the handle by the API
    pz_enabled?: boolean;
    last_update_address?: string;
    last_edited_time?: number;
    payment_key_hash?: string;
    policy?: string;
    svg_version: string | number;
    version: number;
}

export interface ICip68Handle extends IHandle {
    reference_token?: IReferenceToken;
}

export interface IPersonalizedHandle extends ICip68Handle {
    personalization?: IPersonalization;
}

/** Aggregate counts exposed by the public `/stats` endpoint. */
export interface IStats {
    total_handles: number;
    total_holders: number;
}

/** A holder/owner as exposed by the public `/holders` endpoints. */
export interface IHolder {
    total_handles: number;
    address: string; // stake / enterprise / script / other address
    type: AddressType;
    known_owner_name?: string;
    default_handle?: string;
    manually_set?: boolean;
}

/** SubHandle configuration set by a root Handle owner. */
export interface ISubHandleSettings {
    nft?: Record<string, any>;
    virtual?: Record<string, any>;
    buy_down_paid?: number;
    buy_down_price?: number;
    buy_down_percent?: number;
    agreed_terms?: string;
    payment_address?: string;
    migrate_sig_required?: boolean;
}

/** Uniform error envelope returned by every 4xx/5xx response. */
export interface IApiError {
    error: string; // machine-stable code, e.g. 'handle_not_found'
    message: string; // human-readable; do not branch logic on this
    docs: string; // url to the most-relevant docs
}

/** Response from the API health endpoint. */
export interface IHealthResponse {
    status: HealthStatus;
    ogmios?: Record<string, any> | null;
    stats: {
        percentage_complete?: number;
        index_memory_size?: number;
        slot_date?: string;
        handle_count?: number;
        holder_count?: number;
        memory_size?: number;
        current_slot?: number;
        last_slot?: number;
        current_block_hash?: string;
        tip_block_hash?: string;
        utxo_schema_version?: number;
        index_schema_version?: number;
        lock_lambdas?: any | null;
        estimated_sync_time?: string;
    };
}

export interface IHandleStats {
    percentage_complete: string;
    current_memory_used: number;
    ogmios_elapsed: string;
    building_elapsed: string;
    handle_count: number;
    slot_date: Date;
    memory_size: number;
    current_slot: number;
    current_block_hash: string;
    schema_version: number;
}

export interface IHandleMetadata {
    name: string;
    image: string;
    mediaType: string;
    og: BoolInt;
    og_number: number;
    rarity: string;
    length: number;
    characters: string;
    numeric_modifiers: string;
    version: number;
    sub_rarity?: string;
    sub_length?: number;
    sub_characters?: string;
    sub_numeric_modifiers?: string;
    handle_type: HandleType;
}

export interface IPzDatum {
    standard_image: string; // ipfs://cid
    image_hash: HexStringOrEmpty; // sha256 checksum of custom handle jpeg
    standard_image_hash: HexStringOrEmpty; // sha256 checksum of standard_image jpeg
    bg_image?: string; // ipfs://cid
    pfp_image?: string; // ipfs://cid
    pfp_asset?: HexStringOrEmpty; // 0x<policy><assetName>
    bg_asset?: HexStringOrEmpty; // 0x<policy><assetName>
    portal: string;
    designer: string; // ipfs://cid containing IPersonalizationDesigner
    socials: string;
    vendor: string;
    default: BoolInt;
    last_update_address: HexStringOrEmpty; // ByteArray, not Bech32
    validated_by: HexStringOrEmpty; // PubKeyHash
    resolved_addresses?: {
        ada: HexStringOrEmpty;
    };
    trial: BoolInt;
    nsfw: BoolInt;
    svg_version: string;
    agreed_terms: string; //https://adahandle.com/tou
    migrate_sig_required: BoolInt;
}

export interface IHandleFileContent {
    slot: number;
    hash: string;
    schemaVersion?: number;
    handles: Record<string, IPersonalizedHandle>;
}

export interface IHandleSvgOptions extends IPersonalizationDesigner {
    pfp_image?: string;
    pfp_asset?: string;
    bg_image?: string;
    bg_asset?: string;
    og_number?: number;
}

export interface PzSettings {
    treasury_fee: number; // lovelace
    treasury_cred: HexStringOrEmpty; // ValidatorKeyHashBytes
    pz_min_fee: number; // lovelace
    pz_providers: { [pubKeyHashBytes: HexString]: HexStringOrEmpty }; // { PubKeyHashBytes: ValidatorKeyHashBytes }
    valid_contracts: HexStringOrEmpty[]; // ValidatorKeyHashBytes[]
    admin_creds: HexStringOrEmpty[]; // PubKeyHashBytes[]
    settings_cred: HexStringOrEmpty; // ValidatorKeyHashBytes
}

export interface ApprovedPolicies {
    [policyId: HexString]: {
        [patternMatch: HexString]: [number, number, number?]; // [nsfw, trial, price?]
    };
}

export enum OAuthSocial {
    'twitter',
    'facebook',
    'discord',
    'instagram',
    'tiktok',
    'youtube',
    'twitch',
    'linkedin',
    'snapchat',
    'telegram',
    'whatsapp',
    'medium',
    'github',
    'reddit',
    'pinterest',
    'pin',
    'spotify',
    'soundcloud',
    'paypal'
}

export interface OAuthTokenMessage {
    error?: string;
    username?: string;
    token?: string;
    identifier?: string;
    social: OAuthSocial;
}

export interface OAuthToken {
    identifier: string;
    username: string;
    token: string;
    social: OAuthSocial;
}
