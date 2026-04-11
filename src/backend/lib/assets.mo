import Common "../types/common";
import Types "../types/assets";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {

  // ── Helpers ────────────────────────────────────────────────────────────────

  func textContains(haystack : Text, needle : Text) : Bool {
    let h = haystack.toLower();
    let n = needle.toLower();
    if (n.size() == 0) return true;
    let hChars = h.toArray();
    let nChars = n.toArray();
    let hLen = hChars.size();
    let nLen = nChars.size();
    if (nLen > hLen) return false;
    var i = 0;
    label search while (i + nLen <= hLen) {
      var j = 0;
      var matched = true;
      label inner while (j < nLen) {
        if (hChars[i + j] != nChars[j]) {
          matched := false;
        };
        j += 1;
      };
      if (matched) return true;
      i += 1;
    };
    false;
  };

  func assetMatchesFilter(asset : Types.Asset, filter : Types.AssetFilter) : Bool {
    switch (filter.assetType) {
      case (?t) { if (asset.assetType != t) return false };
      case null {};
    };
    switch (filter.category) {
      case (?c) {
        if (asset.category.toLower() != c.toLower()) return false;
      };
      case null {};
    };
    switch (filter.license) {
      case (?l) { if (asset.license != l) return false };
      case null {};
    };
    switch (filter.orientation) {
      case (?o) {
        switch (asset.dimensions) {
          case (?dims) {
            let ok = switch (o) {
              case (#landscape) { dims.width > dims.height };
              case (#portrait)  { dims.height > dims.width };
              case (#square)    { dims.width == dims.height };
            };
            if (not ok) return false;
          };
          case null { return false };
        };
      };
      case null {};
    };
    if (filter.tags.size() > 0) {
      for (reqTag in filter.tags.values()) {
        let found = asset.tags.find(func(t : Text) : Bool {
          t.toLower() == reqTag.toLower()
        });
        if (found == null) return false;
      };
    };
    true;
  };

  func compareAssets(a : Types.Asset, b : Types.Asset, sort : Common.SortOrder) : { #less; #equal; #greater } {
    switch (sort) {
      case (#newest) {
        if (a.createdAt > b.createdAt) #less
        else if (a.createdAt < b.createdAt) #greater
        else #equal;
      };
      case (#mostDownloaded) {
        if (a.downloadCount > b.downloadCount) #less
        else if (a.downloadCount < b.downloadCount) #greater
        else #equal;
      };
      case (#relevance) {
        if (a.createdAt > b.createdAt) #less
        else if (a.createdAt < b.createdAt) #greater
        else #equal;
      };
    };
  };

  func paginate(items : [Types.Asset], page : Common.PageRequest) : Types.AssetPage {
    let total = items.size();
    let offset = page.offset;
    let limit = page.limit;
    if (offset >= total) {
      return { items = []; total; offset };
    };
    let end = if (offset + limit > total) total else offset + limit;
    let sliced = items.sliceToArray(offset, end);
    { items = sliced; total; offset };
  };

  // ── Public API ─────────────────────────────────────────────────────────────

  public func listAssets(
    assets : List.List<Types.Asset>,
    filter : Types.AssetFilter,
    sort : Common.SortOrder,
    page : Common.PageRequest,
  ) : Types.AssetPage {
    let filtered = assets.filter(func(a : Types.Asset) : Bool {
      assetMatchesFilter(a, filter)
    });
    let sorted = filtered.sort(func(a : Types.Asset, b : Types.Asset) : { #less; #equal; #greater } {
      compareAssets(a, b, sort)
    });
    paginate(sorted.toArray(), page);
  };

  public func getAsset(
    assets : List.List<Types.Asset>,
    id : Common.AssetId,
  ) : ?Types.Asset {
    assets.find(func(a : Types.Asset) : Bool { a.id == id });
  };

  public func searchAssets(
    assets : List.List<Types.Asset>,
    keyword : Text,
    page : Common.PageRequest,
  ) : Types.AssetPage {
    let kw = keyword.toLower();
    let matched = assets.filter(func(a : Types.Asset) : Bool {
      if (textContains(a.title, kw)) return true;
      if (textContains(a.description, kw)) return true;
      let tagMatch = a.tags.find(func(t : Text) : Bool {
        textContains(t, kw)
      });
      tagMatch != null;
    });
    let sorted = matched.sort(func(a : Types.Asset, b : Types.Asset) : { #less; #equal; #greater } {
      compareAssets(a, b, #newest)
    });
    paginate(sorted.toArray(), page);
  };

  public func addAsset(
    assets : List.List<Types.Asset>,
    nextId : Nat,
    title : Text,
    description : Text,
    assetType : Common.AssetType,
    category : Text,
    tags : [Text],
    thumbnailUrl : Text,
    previewUrls : [Text],
    fileFormats : [Types.AssetFile],
    dimensions : ?{ width : Nat; height : Nat },
    license : Common.License,
    authorId : Common.UserId,
    authorName : Text,
    createdAt : Common.Timestamp,
  ) : Types.Asset {
    let asset : Types.Asset = {
      id = nextId;
      title;
      description;
      assetType;
      category;
      tags;
      thumbnailUrl;
      previewUrls;
      fileFormats;
      dimensions;
      license;
      downloadCount = 0;
      authorId;
      authorName;
      createdAt;
    };
    assets.add(asset);
    asset;
  };

  public func incrementDownloadCount(
    assets : List.List<Types.Asset>,
    id : Common.AssetId,
  ) : () {
    assets.mapInPlace(func(a : Types.Asset) : Types.Asset {
      if (a.id == id) { { a with downloadCount = a.downloadCount + 1 } }
      else { a }
    });
  };

  // ── Seed data ──────────────────────────────────────────────────────────────

  public func seedAssets(assets : List.List<Types.Asset>, startId : Nat) : Nat {
    let authorId = Principal.fromText("2vxsx-fae");
    let baseTime : Int = 1_700_000_000_000_000_000;

    type SeedEntry = {
      title : Text;
      description : Text;
      assetType : Common.AssetType;
      category : Text;
      tags : [Text];
      thumbnailUrl : Text;
      license : Common.License;
      authorName : Text;
      dims : ?{ width : Nat; height : Nat };
      downloads : Nat;
    };

    let seeds : [SeedEntry] = [
      {
        title = "Tropical Leaves Vector Set";
        description = "A beautiful collection of tropical leaf illustrations perfect for summer designs and nature-themed projects.";
        assetType = #vector;
        category = "Nature";
        tags = ["tropical", "leaves", "nature", "summer", "botanical"];
        thumbnailUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400";
        license = #free;
        authorName = "Maria Chen";
        dims = ?{ width = 1920; height = 1080 };
        downloads = 4230;
      },
      {
        title = "Corporate Business Icons Pack";
        description = "Professional icon set for business presentations and corporate websites. Includes 50 unique icons in various styles.";
        assetType = #icon;
        category = "Business";
        tags = ["icons", "business", "corporate", "professional", "ui"];
        thumbnailUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400";
        license = #free;
        authorName = "Alex Studio";
        dims = null;
        downloads = 8915;
      },
      {
        title = "Abstract Gradient Backgrounds";
        description = "Vibrant abstract gradient backgrounds ideal for websites, apps, and social media posts. High resolution files included.";
        assetType = #photo;
        category = "Backgrounds";
        tags = ["gradient", "abstract", "background", "colorful", "modern"];
        thumbnailUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400";
        license = #free;
        authorName = "PixelCraft";
        dims = ?{ width = 3840; height = 2160 };
        downloads = 12087;
      },
      {
        title = "Mountain Landscape Photography Collection";
        description = "Stunning high-resolution mountain landscape photos capturing dramatic peaks, valleys, and atmospheric conditions.";
        assetType = #photo;
        category = "Nature";
        tags = ["mountains", "landscape", "photography", "nature", "scenic"];
        thumbnailUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400";
        license = #premium;
        authorName = "James Walker";
        dims = ?{ width = 5000; height = 3333 };
        downloads = 3421;
      },
      {
        title = "Tech Startup Website Template";
        description = "Clean, modern website template designed specifically for tech startups. Includes homepage, about, and contact page designs.";
        assetType = #template;
        category = "Technology";
        tags = ["template", "website", "startup", "tech", "landing page"];
        thumbnailUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400";
        license = #premium;
        authorName = "DesignFlow";
        dims = ?{ width = 1440; height = 900 };
        downloads = 5672;
      },
      {
        title = "Flat Design City Illustrations";
        description = "Charming flat-design city scene illustrations featuring buildings, parks, and urban life. Perfect for apps and infographics.";
        assetType = #illustration;
        category = "Backgrounds";
        tags = ["city", "flat design", "illustration", "urban", "buildings"];
        thumbnailUrl = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400";
        license = #free;
        authorName = "Luisa Gomez";
        dims = ?{ width = 2400; height = 1600 };
        downloads = 7834;
      },
      {
        title = "Space Exploration Vector Illustrations";
        description = "Detailed vector illustrations of rockets, planets, and astronauts for science and technology themed projects.";
        assetType = #illustration;
        category = "Technology";
        tags = ["space", "rocket", "planets", "astronaut", "science"];
        thumbnailUrl = "https://images.unsplash.com/photo-1446776709462-d6b525b9c818?w=400";
        license = #free;
        authorName = "CosmicArt";
        dims = ?{ width = 2000; height = 2000 };
        downloads = 9251;
      },
      {
        title = "Hand-drawn Floral Wreath Collection";
        description = "Elegant hand-drawn floral wreaths and botanical elements. Ideal for wedding invitations, greeting cards, and packaging design.";
        assetType = #illustration;
        category = "Nature";
        tags = ["floral", "wreath", "hand-drawn", "botanical", "wedding"];
        thumbnailUrl = "https://images.unsplash.com/photo-1490750967868-88df5691cc36?w=400";
        license = #premium;
        authorName = "Bloom Studio";
        dims = ?{ width = 3000; height = 3000 };
        downloads = 6143;
      },
      {
        title = "Office Workspace Photography";
        description = "Professional office and workspace photography for business presentations, websites, and marketing materials.";
        assetType = #photo;
        category = "Business";
        tags = ["office", "workspace", "business", "professional", "desk"];
        thumbnailUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400";
        license = #free;
        authorName = "WorkLife Photos";
        dims = ?{ width = 4000; height = 2667 };
        downloads = 15320;
      },
      {
        title = "Food Photography Collection — Fruits";
        description = "Vibrant and appetizing fruit photography on clean backgrounds, perfect for food brands, menus, and nutritional content.";
        assetType = #photo;
        category = "Nature";
        tags = ["food", "fruits", "photography", "fresh", "organic"];
        thumbnailUrl = "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400";
        license = #premium;
        authorName = "FoodShot Studio";
        dims = ?{ width = 4500; height = 3000 };
        downloads = 4897;
      },
      {
        title = "Abstract 3D Shapes Collection";
        description = "Stunning 3D rendered geometric shapes and abstract forms. Available as high-resolution renders and editable 3D files.";
        assetType = #threeD;
        category = "Design";
        tags = ["3d", "abstract", "shapes", "geometric", "render"];
        thumbnailUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400";
        license = #premium;
        authorName = "Render Studio";
        dims = ?{ width = 2400; height = 2400 };
        downloads = 3218;
      },
      {
        title = "3D Tech Device Mockups";
        description = "Photorealistic 3D mockups of modern tech devices including smartphones, tablets, and laptops for app and web showcases.";
        assetType = #threeD;
        category = "Technology";
        tags = ["mockup", "device", "3d", "phone", "laptop"];
        thumbnailUrl = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400";
        license = #premium;
        authorName = "MockupLab";
        dims = ?{ width = 3000; height = 2000 };
        downloads = 7654;
      },
      {
        title = "Social Media Post Templates Pack";
        description = "50+ ready-to-use social media post templates for Instagram, Facebook, and Twitter. Fully customizable in popular design tools.";
        assetType = #template;
        category = "Design";
        tags = ["social media", "instagram", "template", "post", "marketing"];
        thumbnailUrl = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400";
        license = #free;
        authorName = "SocialKit";
        dims = ?{ width = 1080; height = 1080 };
        downloads = 22456;
      },
      {
        title = "Business Proposal Presentation Template";
        description = "Professional and clean business proposal template with 30 slides covering executive summary, market analysis, and financials.";
        assetType = #template;
        category = "Business";
        tags = ["presentation", "proposal", "business", "slides", "professional"];
        thumbnailUrl = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400";
        license = #premium;
        authorName = "PresentPro";
        dims = ?{ width = 1920; height = 1080 };
        downloads = 8932;
      },
      {
        title = "Outline UI Icons — 200 Pack";
        description = "Comprehensive outline style UI icon set with 200 carefully crafted icons for web and mobile applications.";
        assetType = #icon;
        category = "Design";
        tags = ["icons", "ui", "outline", "web", "app"];
        thumbnailUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400";
        license = #free;
        authorName = "IconForge";
        dims = null;
        downloads = 31045;
      },
      {
        title = "E-commerce Shopping Icons";
        description = "Flat and solid style e-commerce icons covering cart, payments, shipping, and product categories. SVG and PNG included.";
        assetType = #icon;
        category = "Business";
        tags = ["ecommerce", "shopping", "icons", "cart", "payment"];
        thumbnailUrl = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400";
        license = #free;
        authorName = "ShopIcons";
        dims = null;
        downloads = 18732;
      },
      {
        title = "Forest Animals Vector Illustrations";
        description = "Cute and detailed vector illustrations of forest animals including foxes, deer, owls, and bears in a whimsical style.";
        assetType = #vector;
        category = "Nature";
        tags = ["animals", "forest", "vector", "cute", "illustration"];
        thumbnailUrl = "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400";
        license = #free;
        authorName = "WildVector";
        dims = ?{ width = 2000; height = 1500 };
        downloads = 11289;
      },
      {
        title = "Watercolor Texture Backgrounds";
        description = "Beautiful hand-painted watercolor texture backgrounds in soft pastel and vibrant color palettes. Perfect for artistic projects.";
        assetType = #photo;
        category = "Backgrounds";
        tags = ["watercolor", "texture", "background", "pastel", "artistic"];
        thumbnailUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400";
        license = #free;
        authorName = "AquaArt";
        dims = ?{ width = 3500; height = 2500 };
        downloads = 9876;
      },
      {
        title = "Dark Tech Background Pack";
        description = "Futuristic dark technology backgrounds featuring circuit patterns, network grids, and glowing neon elements.";
        assetType = #photo;
        category = "Technology";
        tags = ["dark", "tech", "background", "futuristic", "neon"];
        thumbnailUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400";
        license = #premium;
        authorName = "NeonLab";
        dims = ?{ width = 4096; height = 2304 };
        downloads = 14523;
      },
      {
        title = "Minimalist Line Art Portraits";
        description = "Elegant one-line minimalist portrait illustrations with a modern artistic style, suitable for prints and editorial design.";
        assetType = #illustration;
        category = "Design";
        tags = ["portrait", "line art", "minimalist", "illustration", "modern"];
        thumbnailUrl = "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400";
        license = #premium;
        authorName = "LineArtist";
        dims = ?{ width = 2000; height = 2800 };
        downloads = 5634;
      },
    ];

    var id = startId;
    for (entry in seeds.values()) {
      let asset : Types.Asset = {
        id;
        title = entry.title;
        description = entry.description;
        assetType = entry.assetType;
        category = entry.category;
        tags = entry.tags;
        thumbnailUrl = entry.thumbnailUrl;
        previewUrls = [entry.thumbnailUrl];
        fileFormats = [{ format = "SVG"; url = entry.thumbnailUrl; license = entry.license }];
        dimensions = entry.dims;
        license = entry.license;
        downloadCount = entry.downloads;
        authorId;
        authorName = entry.authorName;
        createdAt = baseTime + (id.toInt() * 86_400_000_000_000);
      };
      assets.add(asset);
      id += 1;
    };
    id;
  };
};
