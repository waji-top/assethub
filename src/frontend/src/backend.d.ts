import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CollectionPublic {
    id: CollectionId;
    userId: UserId;
    name: string;
    createdAt: Timestamp;
    assetIds: Array<AssetId>;
}
export interface PageRequest {
    offset: bigint;
    limit: bigint;
}
export type Timestamp = bigint;
export interface AssetFile {
    url: string;
    license: License;
    format: string;
}
export interface UserPublic {
    id: UserId;
    username: string;
    createdAt: Timestamp;
    tier: UserTier;
    email: string;
    downloadCount: bigint;
    downloadLimit: bigint;
}
export interface AssetPage {
    total: bigint;
    offset: bigint;
    items: Array<Asset>;
}
export interface CollectionWithAssets {
    id: CollectionId;
    userId: UserId;
    name: string;
    createdAt: Timestamp;
    assets: Array<Asset>;
}
export interface DownloadRecord {
    assetId: AssetId;
    downloadedAt: Timestamp;
    assetTitle: string;
    format: string;
}
export type UserId = Principal;
export interface AssetFilter {
    tags: Array<string>;
    category?: string;
    assetType?: AssetType;
    license?: License;
    orientation?: Variant_square_portrait_landscape;
}
export interface Asset {
    id: AssetId;
    title: string;
    thumbnailUrl: string;
    authorId: UserId;
    createdAt: Timestamp;
    tags: Array<string>;
    authorName: string;
    description: string;
    fileFormats: Array<AssetFile>;
    category: string;
    downloadCount: bigint;
    assetType: AssetType;
    previewUrls: Array<string>;
    license: License;
    dimensions?: {
        height: bigint;
        width: bigint;
    };
}
export type AssetId = bigint;
export interface SubscriptionStatus {
    tier: UserTier;
    sessionId?: string;
}
export type CollectionId = bigint;
export enum AssetType {
    illustration = "illustration",
    font = "font",
    icon = "icon",
    threeD = "threeD",
    vector = "vector",
    template = "template",
    photo = "photo"
}
export enum SortOrder {
    mostDownloaded = "mostDownloaded",
    newest = "newest",
    relevance = "relevance"
}
export enum UserTier {
    premium = "premium",
    free = "free"
}
export enum Variant_square_portrait_landscape {
    square = "square",
    portrait = "portrait",
    landscape = "landscape"
}
export interface backendInterface {
    activatePremium(sessionId: string): Promise<boolean>;
    addAssetToCollection(id: CollectionId, assetId: AssetId): Promise<void>;
    canDownload(): Promise<boolean>;
    createCollection(name: string): Promise<CollectionPublic>;
    deleteCollection(id: CollectionId): Promise<void>;
    getAsset(id: AssetId): Promise<Asset | null>;
    getCollectionWithAssets(id: CollectionId): Promise<CollectionWithAssets | null>;
    getMyProfile(): Promise<UserPublic | null>;
    getSubscriptionStatus(): Promise<SubscriptionStatus>;
    incrementDownloadCount(id: AssetId): Promise<void>;
    listAssets(filter: AssetFilter, sort: SortOrder, page: PageRequest): Promise<AssetPage>;
    listMyCollections(): Promise<Array<CollectionPublic>>;
    listMyDownloads(): Promise<Array<DownloadRecord>>;
    recordStripeSession(sessionId: string): Promise<void>;
    removeAssetFromCollection(id: CollectionId, assetId: AssetId): Promise<void>;
    searchAssets(keyword: string, page: PageRequest): Promise<AssetPage>;
    trackDownload(assetId: AssetId, format: string): Promise<boolean>;
    upsertUser(username: string, email: string): Promise<UserPublic>;
}
