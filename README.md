# EARTHLY — Sustainable Living Made Effortless

> **"Makes conscious living easier to choose."**

A production-ready, full-stack sustainable lifestyle e-commerce web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Zod**, **Lucide Icons**, and **Supabase (PostgreSQL)**.

---

## 🌿 Overview & Vision

**EARTHLY** is an architectural response to greenwashing and disposable consumer culture. It enables conscious customers to discover and purchase verified, durable, and plastic-free everyday lifestyle products across India.

### Core Distinctions
- **Zero Unverified Eco-Claims**: No fabricated green logos or vague slogans. Every product lists verified metallurgical grades (e.g. 18/8 food-grade SS 304, high-expansion borosilicate glass), genuine FSC/GOTS license numbers, and certified laboratory test reports.
- **100% Plastic-Free Dispatch Standard**: All orders ship in unbleached FSC corrugated boxes with water-activated starch paper tape and recycled honeycomb cushioning.
- **Fair Indian Artisan Partnerships**: Direct partnerships with craft guilds in Pune, Khurja, Moradabad, and Maheshwar, with verified living wages.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** with Server Components & Turbopack |
| **Language** | **TypeScript 5** with strict type safety & zero compiler errors |
| **Styling** | **Tailwind CSS** with tailored Earthy Design Tokens |
| **State Management** | **React Context API** (`CartContext`, `WishlistContext`, `AuthContext`) + LocalStorage Persistence |
| **Data Validation** | **Zod** schema validation for checkout, products, contact, and newsletter |
| **Database & Auth** | **Supabase** + **PostgreSQL** (complete schema, RLS policies & migration scripts included) |
| **Icons & UI** | **Lucide React** + **Canvas Confetti** |
| **Testing** | **Vitest** for automated unit & integration testing |

---

## 🎨 Design System & Color Palette

The interface is crafted with a serene, nature-inspired palette:

- **Background**: Warm Beige (`#FAF7F2`)
- **Primary Color**: Sage Green (`#5B755A` / `#425941`)
- **Secondary Color**: Forest Green (`#1D2B1F`)
- **Accent Color**: Sand Tan (`#E4DCD0` / `#C8BEAF`)
- **Typography**: Dark Charcoal (`#202421`), Plus Jakarta Sans (Modern body), Lora (Editorial serif headings)
- **Cards & Surfaces**: Pure White (`#FFFFFF`) with subtle earthy borders (`#E5DFD4`)

---

## ✨ Implemented Modules & Features

### 1. Homepage (`/`)
- **Announcement Bar**: Free nationwide carbon-neutral shipping on orders over ₹999 + instant Evaluator Role Switcher.
- **Navigation Bar**: Sticky header with search bar, mega-dropdown for 7 categories, live wishlist counter, and cart trigger with item badge.
- **Hero Section**: *"Make room for better everyday choices."* with dual CTAs and trust indicators.
- **Featured Categories**: Interactive cards for all 7 lifestyle categories.
- **Bestselling Essentials**: Live quick-add buttons and sustainability badges.
- **Curated Bundles Showcase**: Visual cards with savings badges and 1-click bundle purchase.
- **Transparency Manifesto**: Verified facts regarding non-toxic materials, laboratory tests, and packaging.
- **Customer Newsletter**: Real-time Zod email validation with instant feedback.

### 2. Shop & Catalog Discovery (`/shop`)
- **Full Catalog**: Browse all sustainable products in INR (`₹`).
- **Live Search**: Instant keyword search matching titles, descriptions, and materials.
- **Category Filter Pills**: Filter by Home Essentials, Travel Accessories, Kitchen Products, Work & Stationery, Reusable Drinkware, Gift Bundles, and Everyday Essentials.
- **Price Range Slider**: Filter products by maximum budget up to ₹2,500.
- **Availability Filter**: Toggle *In Stock Only*.
- **Sorting**: Featured, Bestsellers, Highest Rated, Price: Low to High, Price: High to Low.
- **Active Filter Pills & Reset**: 1-click filter reset.

### 3. Comprehensive Product Details (`/products/[slug]`)
- **Interactive Gallery**: Main image with thumbnail switching.
- **Pricing & Stock**: Accurate INR pricing, compare-at discounts, and real-time inventory indicator.
- **Variant Selector**: Size, finish, and color choices.
- **Three Deep Transparency Tabs**:
  1. *Materials & Composition*: Detailed ingredient percentages, lab safety report numbers, packaging details.
  2. *Origin & Artisan Maker*: Community story, workshop region, and verified fair-wage audit status.
  3. *Durability & Care*: Drop-test ratings, estimated lifespan (in years), and care instructions.
- **Add to Cart & Wishlist**: Quantity stepper, stock boundary validation, and related products carousel.

### 4. Lifestyle-Based Product Discovery (`/discover`)
- **Preference-Based Questionnaire**:
  - Select active life areas (Home, Travel, Kitchen, Work, Everyday Essentials, Gifting).
  - Select sustainable priority (Plastic elimination, non-toxic food contact, workspace upgrade, zero-waste commute).
- **Algorithmic Matching Engine**: Computes high-affinity product matches with a percentage score.
- **Explainable Rationale**: Displays a clear *"Why this matches your lifestyle"* explanation for each recommendation.

### 5. Curated Product Bundles (`/bundles`)
- Four comprehensive starter kits:
  1. **Home Essentials Bundle** (Save 16% — ₹3,249)
  2. **Travel Essentials Bundle** (Save 17% — ₹2,199)
  3. **Everyday Reusables Bundle** (Save 15% — ₹1,899)
  4. **Conscious Living Gift Bundle** (Save 17% — ₹2,149)
- Itemized breakdown of constituent products with individual pricing.
- **Add Entire Bundle to Cart**: 1-click action applying bundle discounts across cart items.

### 6. Shopping Cart (`/cart` & Slide-over Drawer)
- Live item list with image, variant name, and price.
- Quantity increment/decrement with stock ceiling enforcement.
- **Free Shipping Progress Meter**: Real-time progress towards the ₹999 free shipping threshold.
- **Promo Code Engine**: Supports coupon codes (`EARTHLY10` for 10% off, `WELCOME20` for ₹200 off above ₹999, `CONSCIOUS15`).
- Subtotal, discount deduction, shipping calculation, and final total.

### 7. Safe Demo Checkout & Orders (`/checkout` & `/order-confirmation/[orderId]`)
- **Zod-Validated Form**: Full name, contact phone, email, Indian shipping address, and PIN code.
- **Demo Mode Disclosure**: Transparent disclaimer indicating simulated processing without storing sensitive cards or CVVs.
- **Multiple Payment Modes**: Simulated UPI, Credit/Debit Card, NetBanking, and Cash on Delivery.
- **Order Placement**: Generates a unique order number (`EARTH-XXXXX`) and courier tracking reference.
- **Order Confirmation Page**: Detailed receipt, item list, tracking number, and print/invoice options.

### 8. Customer Account (`/account`)
- Tabbed interface:
  - **Order History**: Real-time fulfillment status (Pending, Processing, Shipped, Delivered) and tracking.
  - **Saved Favourites**: Wishlist with *Move to Cart* action.
  - **Saved Addresses**: Add, view, and delete multiple delivery addresses.
  - **Profile Management**: Contact details and membership status.

### 9. Protected Admin Dashboard (`/admin`)
- **KPI Metrics**: Real-time calculation of Total Revenue (₹), Active Orders, Catalog Products, and Low Stock Warnings.
- **Product Management**: Search, Add Product modal with Zod validation, Edit Product, and Delete Product.
- **Inventory Management**: Real-time stock levels with one-click restock buttons (`+10 Restock`, `-5`).
- **Orders Fulfillment**: View customer orders, payment status, and update fulfillment states (*Pending* &rarr; *Processing* &rarr; *Shipped* &rarr; *Delivered* &rarr; *Cancelled*).
- **Makers & Transparency Hub**: Review verified artisan communities and lab audit reports.
- **Sales & Impact Analytics**: Graphical distribution of inventory by category and single-use plastic avoided.

### 10. Additional Supporting Pages
- `/story` — Our Story & Transparency Manifesto
- `/contact` — Zod-validated customer support form
- `/faq` — Categorized interactive accordion (Materials, Packaging, Shipping, Returns)
- `/shipping-returns` — Plastic-free delivery policy
- `/privacy` — Privacy and customer data rights
- `/terms` — Terms and conditions of sale
- `/_not-found` — Custom 404 error page

---

## 🗄️ Database Architecture (PostgreSQL / Supabase)

The database schema is provided in `supabase/migrations/20261014_init_earthly_schema.sql` covering 19 relational entities:

1. `profiles` — User profile, contact, and role (`customer` / `admin`)
2. `addresses` — Multi-address book for customer delivery
3. `categories` — Sustainable product categories
4. `makers` — Artisan communities, regions, facilities, and fair wage verifications
5. `certifications` — Standard certifications with testing agencies
6. `products` — Core catalog items, pricing, metrics, and ratings
7. `product_images` — Image gallery URLs and sort orders
8. `product_variants` — SKUs, color hexes, size labels, and variant prices
9. `inventory` — Stock levels and low-stock threshold triggers
10. `product_transparency` — Materials array, composition, durability, packaging details
11. `product_certifications` — Many-to-many product certification links
12. `bundles` — Curated bundle sets with discount percentages
13. `bundle_components` — Products and quantities within each bundle
14. `discount_codes` — Promo coupon rules (percentage/fixed, minimum spend)
15. `carts` — User and guest shopping cart sessions
16. `cart_items` — Line items in active carts
17. `favourites` — Customer wishlist links
18. `orders` — Customer orders, shipping addresses, fulfillment statuses
19. `order_items` — Itemized order snapshots with prices
20. `payments` — Transaction references, payment methods, and statuses

*Row Level Security (RLS) policies are configured for public catalog read access, customer-isolated data access, and admin-only management permissions.*

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js **v20.x** or later
- npm **10.x** or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/earthly-sustainable-store.git
cd earthly-sustainable-store

# 2. Install dependencies
npm install

# 3. Setup environment variables (optional for live Supabase)
cp .env.example .env.local

# 4. Run tests
npm test

# 5. Verify TypeScript types
npm run check-types

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing Suite

Automated tests are written with **Vitest**:

```bash
# Run all unit and integration tests
npm test
```

### Verified Test Coverage:
- `src/__tests__/store.test.ts`:
  - Validates catalog has 12+ realistic sustainable products
  - Confirms all 7 requested categories exist
  - Validates all 4 curated bundles and calculated discounts
  - Verifies discount codes (`EARTHLY10`, `WELCOME20`, invalid code rejections)
  - Tests lifestyle discovery recommendations and reasons
  - Tests order creation with unique identifiers
- `src/__tests__/validations.test.ts`:
  - Validates Zod checkout schemas
  - Validates newsletter email formats
  - Validates contact form constraints

---

## ☁️ Deployment Guide (Vercel)

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/earthly-sustainable-store.git
   git branch -M main
   git push -u origin main
   ```
2. Import the project in [Vercel](https://vercel.com).
3. Set the build command to `npm run build` and output directory to `.next`.
4. (Optional) Configure Environment Variables in the Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
5. Deploy! The site builds statically and dynamically without external dependencies.

---

## 📄 License & Credits

Crafted for **EARTHLY** — *Makes conscious living easier to choose.*
All product demonstrations, artisan narratives, and sustainable lifestyle metrics are designed to meet educational and production-grade software architecture standards.
