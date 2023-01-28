export enum Rarity {
    basic = 'basic', // - 8-15 characters
    common = 'common', // - 4-7 characters
    rare = 'rare', // - 3 characters
    ultra_rare = 'ultra_rare', // - 2 characters
    legendary = 'legendary' // - 1 character
}

export interface KeyPair {
    key: string;
    value: any;
}

export interface IPersonalizationNftAppearance {
    handleTextShadowColor?: string;
    handleTextBgColor?: string;
    pfpImageUrl?: string;
    pfpImageUrlEnabled?: boolean;
    pfpBorderColor?: string;
    backgroundImageUrl?: string;
    backgroundImageUrlEnabled?: boolean;
    backgroundColor?: string;
    backgroundBorderColor?: string;
    qrEnabled?: boolean;
    qrColor?: string;
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
