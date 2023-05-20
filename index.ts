export enum Rarity {
    basic = 'basic', // - 8-15 characters
    common = 'common', // - 4-7 characters
    rare = 'rare', // - 3 characters
    ultra_rare = 'ultra_rare', // - 2 characters
    legendary = 'legendary' // - 1 character
}

/**
 * The asset label is a string that is used to identify the asset type.
 * First, remove the first and last 0.
 * Next, use the first 4 characters as the hex and convert to decimal. https://www.rapidtables.com/convert/number/hex-to-decimal.html
 * Finally, use the decimal number and convert to CRC8. It should match the last 2 characters. https://crccalc.com/
 */
export enum AssetNameLabel {
    LABEL_100 = '000643b0', // 100
    LABEL_222 = '000de140', // 222
    LABEL_333 = '0014df10', // 333
    LABEL_444 = '001bc280' // 444
}

export interface KeyPair {
    key: string;
    value: any;
}

export interface SocialItem {
    display: string;
    url: string;
}

interface ISharedPzAppearance {
    pfp_border_color?: string;
    qr_inner_eye?: string; // 'rounded,#0a1fd3';
    qr_outer_eye?: string; // 'square,#0a1fd3';
    qr_dot?: string; // 'dot,#0a1fd3';
    qr_bg_color?: string; // '#22d1af';
    pfp_zoom?: number; // 0.86;
    pfp_offset?: number[]; //[124, 58],
    font?: string; // 'Family Name,https://fonts.com/super_cool_font.woff';
    font_color?: string; // "0a1fd3",
    font_shadow_size?: number[]; // [12, 12, 8],
    text_ribbon_colors?: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    text_ribbon_gradient?: string; // 'linear-45' | 'radial'
}

export interface IPersonalizationNftAppearance extends ISharedPzAppearance {
    font_shadow_color?: string;
    pfp_image?: string;
    bg_image?: string;
    bg_color?: string;
    bg_border_color?: string;
    qr_link?: string;
    socials?: SocialItem[];
}

export interface ICreatorDefaults extends ISharedPzAppearance {
    bg_border_colors?: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    pfp_border_colors?: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    font_shadow_colors?: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    require_pfp_collections?: string[]; // ["<policy_id><asset_prefix>", "<other_policy_id>"],
    require_pfp_attributes?: string[]; // ["Outerwear:Denim Jacket"],
    require_pfp_displayed?: boolean; // true;
    price?: number; // 125;
    force_creator_settings?: boolean; // true;
    custom_dollar_symbol?: boolean; // true;
}

export interface IPersonalization {
    portal?: {
        type: string;
        domain?: string | null;
        custom_settings?: string[] | null;
        default: boolean;
    };
    designer?: IPersonalizationNftAppearance;
    socials?: SocialItem[];
    reference_token: {
        tx_id: string;
        index: number;
        lovelace: number;
        datum: string;
    };
    validated: boolean;
    trial?: boolean;
    nsfw?: boolean;
}

export interface IHandle {
    hex: string;
    name: string;
    image: string;
    standard_image: string;
    pfp_image: string;
    bg_image: string;
    holder: string;
    length: number;
    og_number: number;
    rarity: Rarity;
    characters: string; // 'letters,numbers,special',
    numeric_modifiers: string; // 'negative,decimal',
    default_in_wallet: string; // my_default_hndl
    resolved_addresses: {
        ada: string;
        eth?: string;
        btc?: string;
    };
    created_slot_number: number;
    updated_slot_number: number;
    utxo: string;
    has_datum: boolean;
    datum?: string;
}

export interface IPersonalizedHandle extends IHandle {
    personalization?: IPersonalization;
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
}

export interface IHandleMetadata {
    name: string;
    image: string;
    mediaType: string;
    og: boolean;
    og_number: number;
    rarity: string;
    length: number;
    characters: string;
    numeric_modifiers: string;
    version: number;
}

export interface IPzDatum {
    bg_image: string;
    pfp_image: string;
    standard_image: string;
    image_hash: string;
    portal: string;
    designer: string;
    socials: string;
    vendor: string;
    default: boolean;
    holder: string;
    validated: boolean;
    trial?: boolean;
    nsfw?: boolean;
    svg_version: string;
}

export interface IHandleFileContent {
    slot: number;
    hash: string;
    schemaVersion?: number;
    handles: Record<string, IPersonalizedHandle>;
}
