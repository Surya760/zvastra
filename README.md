# Zvastra Multi-Tenant Platform & Mobile Seller Studio

A complete WordPress/Shopify-style multi-tenant website builder and commerce engine tailored for ethnic apparel, fusion fashion, and boutique creators, built with **React Native (Expo)**, **Node.js (TypeScript)**, and a **dynamic web storefront engine**.

---

## 📁 Repository Structure

```text
zvastra/
├── backend/            # Multi-Tenant REST API & Site Engine (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── routes/     # /auth, /stores, /templates, /products, /inquiries
│   │   ├── services/   # StoreService, ProductService, Media handler
│   │   ├── data/       # Rich seed data (Bridal couture, video reels, jewelry)
│   │   ├── types/      # Shared interfaces & data models
│   │   └── server.ts   # Express server with live HTML previewer at /preview/:slug
│   └── package.json
│
├── mobile/             # Zvastra Seller Studio App (React Native + Expo)
│   ├── App.tsx         # Tab navigation with real-time lead badge counters
│   ├── app.json        # Expo configuration
│   └── src/
│       ├── screens/    # Dashboard, Templates, Products, ProductForm, StorePreview, Inquiries
│       ├── state/      # React Context (multi-store switcher, theme customizer)
│       ├── services/   # REST API client with offline fallback
│       └── types/      # Data types matching backend contracts
│
└── web-storefront/     # Dynamic Web Storefront Engine (HTML/CSS/JS)
    ├── index.html      # Renders custom templates, video reels & direct WhatsApp checkout
    └── package.json
```

---

## 🚀 Quick Start Guide

Node.js (v22 LTS) is configured on your machine. Open a terminal and run the components:

### 1. Start the Backend API & Preview Engine
```bash
cd /Users/suryavamsi/.gemini/antigravity/scratch/zvastra/backend
npm run build
npm start
```
- **API Base**: `http://localhost:4000/api/v1`
- **Dynamic Web Preview**: `http://localhost:4000/preview/ananya-couture`
- **Health Check**: `http://localhost:4000/health`

---

### 2. Run the Mobile Seller Studio App (React Native / Expo)
```bash
cd /Users/suryavamsi/.gemini/antigravity/scratch/zvastra/mobile
npx expo start
```
- Press `i` to launch in the **iOS Simulator** (if Xcode is installed).
- Press `a` to launch in the **Android Emulator** (if Android Studio is installed).
- Scan the QR code using the **Expo Go** app on your physical iPhone or Android device.
- Press `w` to run directly in your web browser.

---

### 3. Run the Web Storefront Engine
```bash
cd /Users/suryavamsi/.gemini/antigravity/scratch/zvastra/web-storefront
npx serve -l 3000 .
```
Open `http://localhost:3000` to browse stores, toggle themes, watch video reels, and test direct WhatsApp inquiries.

---

## 🎨 Available Templates

1. **Classic Boutique Glamour (`classic-boutique`)**:
   - Editorial layout with hero banners, rich product galleries, and gold accents.
   - Recommended for: Bridal lehengas, pure silk sarees, and couture gowns.

2. **Video Reels & Live Showroom (`video-reels`)**:
   - Vertical video cards and autoplay demo reels showing fabric flow and drape in motion.
   - Recommended for: Trending festive ready-to-wear, Indo-Western fusion, and statement jewelry.

3. **Minimalist Clean Catalog (`minimal-catalog`)**:
   - High-speed, distraction-free grid optimized for quick mobile browsing and direct WhatsApp conversion.
   - Recommended for: Everyday cotton kurtis, dupattas, and artisanal handmade decor.

---

## 💡 Key Seller Features Implemented

- **Multi-Site Management**: One account can create and switch between multiple boutique sites.
- **Template Switcher**: Instant theme swapping with custom primary/accent colors, logo, and banner.
- **Product & Media Studio**: Upload high-resolution photos and demo video reels, set prices, compare-at discounts, sizes, and stock.
- **Live Preview**: Realistic mobile view showing exactly what shoppers see on `[store].zvastra.com`.
- **Customer Inquiry Tracker**: Receive buyer leads with a direct one-tap "Reply on WhatsApp" button.
