import type { backendInterface } from "../backend";
import {
  AssetType,
  SortOrder,
  UserTier,
  Variant_square_portrait_landscape,
} from "../backend";

const FREE: { free: null } = { free: null };
const PREMIUM: { premium: null } = { premium: null };

const sampleAssets = [
  {
    id: BigInt(1),
    title: "Abstract Geometric Vector Set",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    authorId: {} as any,
    createdAt: BigInt(Date.now()),
    tags: ["abstract", "geometric", "vector", "colorful"],
    authorName: "StudioPixel",
    description:
      "A stunning collection of abstract geometric shapes perfect for modern design projects.",
    fileFormats: [
      { url: "#", license: FREE, format: "SVG" },
      { url: "#", license: PREMIUM, format: "EPS" },
    ],
    category: "Abstract",
    downloadCount: BigInt(14230),
    assetType: AssetType.vector,
    previewUrls: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    license: FREE,
    dimensions: { height: BigInt(1200), width: BigInt(1600) },
  },
  {
    id: BigInt(2),
    title: "Minimal Business Card Template",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    authorId: {} as any,
    createdAt: BigInt(Date.now()),
    tags: ["business card", "minimal", "template", "professional"],
    authorName: "DesignForge",
    description:
      "Clean and professional business card template with minimal design aesthetics.",
    fileFormats: [
      { url: "#", license: PREMIUM, format: "PSD" },
      { url: "#", license: PREMIUM, format: "AI" },
    ],
    category: "Templates",
    downloadCount: BigInt(8750),
    assetType: AssetType.template,
    previewUrls: [
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    ],
    license: PREMIUM,
    dimensions: { height: BigInt(600), width: BigInt(1000) },
  },
  {
    id: BigInt(3),
    title: "3D Floating Islands Illustration",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&q=80",
    authorId: {} as any,
    createdAt: BigInt(Date.now()),
    tags: ["3d", "illustration", "fantasy", "islands"],
    authorName: "ArtVault",
    description:
      "Beautiful 3D floating islands concept art for games and fantasy projects.",
    fileFormats: [
      { url: "#", license: FREE, format: "PNG" },
      { url: "#", license: PREMIUM, format: "PSD" },
    ],
    category: "Illustrations",
    downloadCount: BigInt(22400),
    assetType: AssetType.illustration,
    previewUrls: [
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80",
    ],
    license: FREE,
    dimensions: { height: BigInt(1080), width: BigInt(1920) },
  },
  {
    id: BigInt(4),
    title: "Social Media Icon Pack",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
    authorId: {} as any,
    createdAt: BigInt(Date.now()),
    tags: ["icons", "social media", "pack", "flat"],
    authorName: "IconStudio",
    description:
      "Complete social media icon set with 50+ platforms in flat design style.",
    fileFormats: [
      { url: "#", license: FREE, format: "SVG" },
      { url: "#", license: FREE, format: "PNG" },
    ],
    category: "Icons",
    downloadCount: BigInt(35600),
    assetType: AssetType.icon,
    previewUrls: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    ],
    license: FREE,
    dimensions: undefined,
  },
  {
    id: BigInt(5),
    title: "Nature Landscape Photography Pack",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    authorId: {} as any,
    createdAt: BigInt(Date.now()),
    tags: ["nature", "landscape", "photography", "mountains"],
    authorName: "WildShots",
    description:
      "High-resolution nature landscape photos perfect for backgrounds and editorial use.",
    fileFormats: [
      { url: "#", license: PREMIUM, format: "JPG" },
      { url: "#", license: PREMIUM, format: "RAW" },
    ],
    category: "Photography",
    downloadCount: BigInt(5890),
    assetType: AssetType.photo,
    previewUrls: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    license: PREMIUM,
    dimensions: { height: BigInt(3000), width: BigInt(5000) },
  },
  {
    id: BigInt(6),
    title: "Gradient Mesh Background Collection",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    authorId: {} as any,
    createdAt: BigInt(Date.now()),
    tags: ["gradient", "mesh", "background", "colorful", "abstract"],
    authorName: "ChromaLab",
    description:
      "50 premium gradient mesh backgrounds for UI design and digital art.",
    fileFormats: [
      { url: "#", license: FREE, format: "PNG" },
      { url: "#", license: PREMIUM, format: "AI" },
    ],
    category: "Backgrounds",
    downloadCount: BigInt(19200),
    assetType: AssetType.vector,
    previewUrls: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    ],
    license: FREE,
    dimensions: { height: BigInt(2160), width: BigInt(3840) },
  },
  {
    id: BigInt(7),
    title: "Geometric Font Family",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80",
    authorId: {} as any,
    createdAt: BigInt(Date.now()),
    tags: ["font", "geometric", "modern", "typeface"],
    authorName: "TypeLab",
    description:
      "Modern geometric typeface with 6 weights perfect for branding and headlines.",
    fileFormats: [
      { url: "#", license: PREMIUM, format: "OTF" },
      { url: "#", license: PREMIUM, format: "TTF" },
    ],
    category: "Fonts",
    downloadCount: BigInt(7340),
    assetType: AssetType.font,
    previewUrls: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    ],
    license: PREMIUM,
    dimensions: undefined,
  },
  {
    id: BigInt(8),
    title: "Low Poly Animal Illustrations",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
    authorId: {} as any,
    createdAt: BigInt(Date.now()),
    tags: ["low poly", "animals", "illustrations", "colorful"],
    authorName: "PolyArtist",
    description:
      "Charming low poly animal illustrations including lion, fox, deer and more.",
    fileFormats: [
      { url: "#", license: FREE, format: "SVG" },
      { url: "#", license: FREE, format: "PNG" },
    ],
    category: "Illustrations",
    downloadCount: BigInt(11800),
    assetType: AssetType.illustration,
    previewUrls: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    ],
    license: FREE,
    dimensions: { height: BigInt(800), width: BigInt(800) },
  },
];

export const mockBackend: backendInterface = {
  activatePremium: async (_sessionId: string) => true,
  addAssetToCollection: async (_id, _assetId) => undefined,
  canDownload: async () => true,
  createCollection: async (name: string) => ({
    id: BigInt(1),
    userId: {} as any,
    name,
    createdAt: BigInt(Date.now()),
    assetIds: [],
  }),
  deleteCollection: async (_id) => undefined,
  getAsset: async (id) => sampleAssets.find((a) => a.id === id) ?? null,
  getCollectionWithAssets: async (_id) => ({
    id: BigInt(1),
    userId: {} as any,
    name: "My Favorites",
    createdAt: BigInt(Date.now()),
    assets: sampleAssets.slice(0, 3),
  }),
  getMyProfile: async () => ({
    id: {} as any,
    username: "alex_designer",
    createdAt: BigInt(Date.now() - 86400000 * 120),
    tier: UserTier.free,
    email: "alex@example.com",
    downloadCount: BigInt(12),
    downloadLimit: BigInt(10),
  }),
  getSubscriptionStatus: async () => ({
    tier: UserTier.free,
    sessionId: undefined,
  }),
  incrementDownloadCount: async (_id) => undefined,
  listAssets: async (_filter, _sort, _page) => ({
    total: BigInt(sampleAssets.length),
    offset: BigInt(0),
    items: sampleAssets,
  }),
  listMyCollections: async () => [
    {
      id: BigInt(1),
      userId: {} as any,
      name: "My Favorites",
      createdAt: BigInt(Date.now()),
      assetIds: [BigInt(1), BigInt(3), BigInt(6)],
    },
    {
      id: BigInt(2),
      userId: {} as any,
      name: "Work Projects",
      createdAt: BigInt(Date.now() - 86400000 * 30),
      assetIds: [BigInt(2), BigInt(4)],
    },
  ],
  listMyDownloads: async () => [
    {
      assetId: BigInt(1),
      downloadedAt: BigInt(Date.now() - 86400000 * 2),
      assetTitle: "Abstract Geometric Vector Set",
      format: "SVG",
    },
    {
      assetId: BigInt(4),
      downloadedAt: BigInt(Date.now() - 86400000 * 5),
      assetTitle: "Social Media Icon Pack",
      format: "PNG",
    },
    {
      assetId: BigInt(6),
      downloadedAt: BigInt(Date.now() - 86400000 * 10),
      assetTitle: "Gradient Mesh Background Collection",
      format: "PNG",
    },
  ],
  recordStripeSession: async (_sessionId: string) => undefined,
  removeAssetFromCollection: async (_id, _assetId) => undefined,
  searchAssets: async (_keyword, _page) => ({
    total: BigInt(sampleAssets.length),
    offset: BigInt(0),
    items: sampleAssets,
  }),
  trackDownload: async (_assetId, _format) => true,
  upsertUser: async (username: string, email: string) => ({
    id: {} as any,
    username,
    createdAt: BigInt(Date.now()),
    tier: UserTier.free,
    email,
    downloadCount: BigInt(0),
    downloadLimit: BigInt(10),
  }),
};
