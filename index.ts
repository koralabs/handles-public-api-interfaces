export enum Rarity {
    basic = 'basic', // - 8-15 characters
    common = 'common', // - 4-7 characters
    rare = 'rare', // - 3 characters
    ultra_rare = 'ultra_rare', // - 2 characters
    legendary = 'legendary' // - 1 character
}

export enum AssetNameLabel {
    LABEL_100 = '000643b0', // 100
    LABEL_222 = '000de140', // 222
    LABEL_333 = '0014df10' // 333
}

export interface KeyPair {
    key: string;
    value: any;
}

export interface IPersonalizationNftAppearance {
    fontShadowColor?: string;
    textRibbonColors?: string[];
    textRibbonGradient?: string;
    fontColor?: string;
    fontUrl?: string;
    pfpImageUrl?: string;
    pfpImageUrlEnabled?: boolean;
    pfpBorderColor?: string;
    pfpZoom?: number;
    pfpOffset?: number[];
    backgroundImageUrl?: string;
    backgroundImageUrlEnabled?: boolean;
    backgroundColor?: string;
    backgroundBorderColor?: string;
    qrEnabled?: boolean;
    qrBgColor?: string;
    qrInnerEye?: string;
    qrOuterEye?: string;
    qrDot?: string;
    socials?: KeyPair[];
    socialsEnabled?: boolean;
    selectedAttributes?: string[];
    purchasedAttributes?: string[];
}

export interface IPersonalization {
    my_page?: {
        type: string;
        domain?: string | null;
        customSettings?: string[] | null;
        default: boolean;
    };
    nft_appearance?: IPersonalizationNftAppearance;
    social_links?: {
        twitter?: string;
        discord?: string;
        facebook?: string;
    };
    sub_handles?: {
        [subHandleName: string]: string; // walletId
    };
    reference_token: {
        tx_id: string;
        index: number;
        lovelace: number;
        datum: string;
    };
}

export interface IHandle {
    hex: string;
    name: string;
    nft_image: string;
    original_nft_image: string;
    holder_address: string;
    length: number;
    og: number;
    rarity: Rarity;
    utxo: string;
    characters: string; // 'letters,numbers,special',
    numeric_modifiers: string; // 'negative,decimal',
    default_in_wallet: string; // my_default_hndl
    profile_pic: string;
    background: string;
    resolved_addresses: {
        ada: string;
        eth?: string;
        btc?: string;
    };
    created_slot_number: number;
    updated_slot_number: number;
    hasDatum: boolean;
    datum?: string;
}

export interface IPersonalizedHandle extends IHandle {
    personalization?: IPersonalization;
}

export interface IHandleStats {
    percentageComplete: string;
    currentMemoryUsed: number;
    ogmiosElapsed: string;
    buildingElapsed: string;
    handleCount: number;
    slotDate: Date;
    memorySize: number;
    currentSlot: number;
    currentBlockHash: string;
}

export interface IHandleFileContent {
    slot: number;
    hash: string;
    schemaVersion?: number;
    handles: Record<string, IPersonalizedHandle>;
}

export interface ICreatorDefaults {
    border_colors: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    pfp_border_colors: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    text_ribbon_colors: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    text_ribbon_gradient: string; // 'linear-45' | 'radial'
    font: string; // 'Family Name,https://fonts.com/super_cool_font.woff';
    font_colors: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    font_shadow_colors: string[]; // ["0a1fd3", "22d1af", "31bc23"],
    qr_background_color: string; // '#22d1af';
    qr_inner_eye: string; // 'rounded,#0a1fd3';
    qr_outer_eye: string; // 'square,#0a1fd3';
    qr_dot: string; // 'dot,#0a1fd3';
    require_pfp_collections: string[]; // ["<policy_id>.<asset_prefix>", "<other_policy_id>"],
    require_pfp_attributes: string[]; // ["Outerwear:Denim Jacket"],
    require_pfp_displayed: boolean; // true;
    pfp_zoom: number; // 0.86;
    pfp_offset: number[]; //[124, 58],
    price: number; // 125;
    force_creator_settings: boolean; // true;
    custom_dollar_symbol: boolean; // true;
}
