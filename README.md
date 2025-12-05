# KitForge Military - 3D Printed Military Kit Cards

A modern Next.js 15 prototype e-commerce website for selling 3D-printed military kit cards with custom livery selection and 3D model previews.

## Features

- 📦 **Product Catalog** - Browse military kit cards by vehicle type and kit size
- 🎨 **Custom Livery Selection** - Choose from multiple camouflage patterns for each model
- 🎮 **3D Model Viewer** - Interactive Three.js viewer with texture-based livery preview
- 🔍 **Advanced Filtering** - Filter by vehicle type, kit size, and difficulty
- 📱 **Responsive Design** - Mobile-friendly layout with modern military aesthetic
- 🛒 **Shopify Integration Stubs** - Ready to connect to Shopify Storefront API

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **3D Graphics:** Three.js
- **UI Components:** Custom components with lucide-react icons
- **Deployment:** Vercel-compatible

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A 3D printer (for customers)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
kitforge/
├── app/                    # Next.js App Router pages
│   ├── catalog/           # Product catalog page
│   ├── product/[slug]/    # Product detail pages
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── site-header.tsx    # Navigation header
│   ├── site-footer.tsx    # Footer
│   ├── product-card.tsx   # Product grid card
│   ├── filter-bar.tsx     # Catalog filters
│   ├── badges.tsx         # Badge components
│   ├── model-viewer.tsx   # Three.js 3D viewer
│   └── livery-selector.tsx # Livery/camo selector
├── lib/                   # Utility functions and data
│   ├── types.ts           # TypeScript type definitions
│   ├── data.ts            # Product catalog data
│   ├── utils.ts           # Helper functions
│   └── shopify.ts         # Shopify integration (stub)
├── public/                # Static assets
│   ├── models/            # 3MF model files
│   ├── images/            # Product images
│   └── textures/          # Camouflage textures
└── README.md
```

## Data Model

### Product Structure

```typescript
type KitProduct = {
  id: string;
  slug: string;
  name: string;
  vehicleType: VehicleType;  // "plane" | "helicopter" | "tank" | etc.
  kitSize: KitSize;          // "business-card" | "postcard" | "20x20" | "30x30"
  shortDescription: string;
  longDescription: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  partsCount: number;
  printTimeEstimateHours: number;
  images: string[];
  modelUrl?: string;         // Path to 3MF file
  basePriceAUD: number;
  liveryVariants?: LiveryVariant[];
  shopifyProductHandle?: string;
  shopifyVariantMapping?: Record<string, string>;
};
```

### Livery Variant Structure

```typescript
type LiveryVariant = {
  id: string;
  name: string;              // e.g., "USAF Low Visibility Gray"
  countryCode: string;       // e.g., "US", "AU", "NATO"
  description?: string;
  previewImageUrl: string;   // Preview image
  textureUrl: string;        // Camouflage texture for 3D viewer
};
```

## Adding New Products

1. **Add Product Data** - Edit `lib/data.ts`:

```typescript
{
  id: "new-product",
  slug: "new-product",
  name: "Product Name",
  vehicleType: "plane",
  kitSize: "30x30",
  // ... other fields
  liveryVariants: [
    {
      id: "variant-1",
      name: "Variant Name",
      countryCode: "US",
      previewImageUrl: "/images/preview.png",
      textureUrl: "/textures/camo.jpg",
    },
  ],
}
```

2. **Add 3MF Model** - Place model file in `public/models/`

3. **Add Images** - Place product images in `public/images/`

4. **Add Textures** - Place camouflage textures in `public/textures/`

## Extending Vehicle Types

To add new vehicle types, update `lib/types.ts`:

```typescript
export type VehicleType =
  | "plane"
  | "helicopter"
  | "tank"
  | "light-vehicle"
  | "destroyer"
  | "submarine"
  | "your-new-type";  // Add here
```

Then update the label mapping in `lib/utils.ts`:

```typescript
const labels: Record<string, string> = {
  // ... existing types
  "your-new-type": "Your New Type Label",
};
```

## Shopify Integration

### Current State (Prototype)

The Shopify integration is currently stubbed out in `lib/shopify.ts`. All cart operations are logged to the console and show alerts.

### Production Setup

To connect to real Shopify:

1. **Install Shopify SDK:**

```bash
pnpm add @shopify/shopify-api
```

2. **Set Environment Variables:**

Create `.env.local`:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
```

3. **Update Product Mapping:**

For each product in `lib/data.ts`, set:
- `shopifyProductHandle` - Shopify product handle
- `shopifyVariantMapping` - Map livery variant IDs to Shopify variant IDs

4. **Replace Stub Functions:**

See comments in `lib/shopify.ts` for example implementation using Shopify Storefront API.

## 3D Model Viewer

The 3D viewer (`components/model-viewer.tsx`) uses Three.js to display models with applied textures.

### Current Implementation

- Loads 3MF files (currently creates placeholder geometry)
- Applies camouflage textures based on selected livery
- Default orbit controls (mouse rotate, scroll zoom)

### Production Enhancement

For full 3MF support, consider:
- Implementing a proper 3MF parser
- Using a library like `three-3mf-loader` (if available)
- Pre-converting 3MF to glTF for better web performance

## Customization

### Color Scheme

The site uses a military-inspired palette defined in Tailwind:

- **Primary:** Amber (`amber-500`)
- **Background:** Stone (`stone-900`, `stone-950`)
- **Accents:** Stone grays (`stone-700`, `stone-800`)

To change colors, update Tailwind classes throughout components.

### Typography

Currently using Inter font. To change:

```typescript
// app/layout.tsx
import { YourFont } from "next/font/google";

const yourFont = YourFont({ subsets: ["latin"] });
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Other Platforms

The site is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting

## License

This is a prototype project. Update with your actual license information.

## Support

For questions or issues, contact the development team.

---

**Built with ❤️ for makers and collectors**
