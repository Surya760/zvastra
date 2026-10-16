import express, { Request, Response } from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { storeRouter } from './routes/stores';
import { templateRouter } from './routes/templates';
import { productRouter } from './routes/products';
import { inquiryRouter } from './routes/inquiries';
import { storeService } from './services/storeService';
import { productService } from './services/productService';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/stores', storeRouter);
app.use('/api/v1/templates', templateRouter);
app.use('/api/v1/stores/:storeId/products', productRouter);
app.use('/api/v1/stores/:storeId/inquiries', inquiryRouter);

// Zvastra.com Official Marketplace Landing Page & Interactive Client Onboarding Hub
app.get('/', (req: Request, res: Response) => {
  const stores = storeService.getStoresByUser('user-1');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Zvastra — South Asian Haute Couture & Boutique Website Builder</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        :root {
          --royal-burgundy: #800020;
          --gold: #D4AF37;
          --gold-light: #F7E7CE;
          --navy-dark: #0B1120;
          --navy-card: #131D31;
          --text-muted: #94A3B8;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Inter', sans-serif;
          background: #070B14;
          color: #F8FAFC;
          line-height: 1.6;
        }

        /* Navigation */
        .navbar {
          background: rgba(11, 17, 32, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 16px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .brand-logo-badge {
          background: linear-gradient(135deg, #800020, #4A0012);
          border: 1px solid var(--gold);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #FFFFFF;
        }
        .brand-tag {
          font-size: 10px;
          color: var(--gold);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: -3px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-link {
          color: #CBD5E1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--gold); }
        .btn-launch-nav {
          background: linear-gradient(135deg, var(--gold), #B38F24);
          color: #070B14;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 20px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-launch-nav:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
        }

        /* Hero Section */
        .hero {
          position: relative;
          padding: 90px 20px 80px;
          text-align: center;
          background: radial-gradient(circle at 50% 20%, rgba(128, 0, 32, 0.35) 0%, rgba(7, 11, 20, 1) 70%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: var(--gold);
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: 0.05em;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.18;
          max-width: 900px;
          margin: 0 auto 20px;
          color: #FFFFFF;
        }
        .hero-title span {
          background: linear-gradient(135deg, #FFFFFF, var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #94A3B8;
          max-width: 680px;
          margin: 0 auto 36px;
          font-weight: 400;
        }
        .hero-cta-group {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cta-primary {
          background: linear-gradient(135deg, #800020, #A01030);
          border: 1px solid var(--gold);
          color: white;
          padding: 14px 28px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(128, 0, 32, 0.5);
        }
        .cta-secondary {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          padding: 14px 26px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .cta-secondary:hover { background: rgba(255, 255, 255, 0.12); }

        /* Stats Bar */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          padding: 24px 20px;
          background: rgba(19, 29, 49, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          flex-wrap: wrap;
        }
        .stat-item { text-align: center; }
        .stat-val { font-size: 22px; font-weight: 800; color: var(--gold); }
        .stat-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }

        /* Main Container */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .section-tag {
          color: var(--gold);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          color: #FFFFFF;
          margin-top: 6px;
        }
        .section-desc {
          color: var(--text-muted);
          font-size: 14px;
          max-width: 540px;
          margin: 6px auto 0;
        }

        /* Stores Grid */
        .boutiques-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
        }
        .boutique-card {
          background: var(--navy-card);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
        }
        .boutique-card:hover {
          transform: translateY(-4px);
          border-color: var(--gold);
          box-shadow: 0 12px 30px rgba(0,0,0,0.4);
        }
        .card-banner {
          height: 160px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .card-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(19, 29, 49, 0.95));
        }
        .card-header-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.7);
          color: var(--gold);
          border: 1px solid rgba(212, 175, 55, 0.4);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .card-logo-wrap {
          position: absolute;
          bottom: -20px;
          left: 20px;
        }
        .card-logo {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          object-fit: cover;
          background: white;
        }
        .card-body {
          padding: 28px 20px 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .card-store-name {
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .card-store-slug {
          font-size: 12px;
          color: var(--gold);
          margin-top: 2px;
        }
        .card-store-bio {
          font-size: 13px;
          color: var(--text-muted);
          margin: 10px 0 16px;
          line-height: 1.5;
        }
        .card-meta-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: auto;
          font-size: 12px;
          color: #CBD5E1;
        }
        .card-actions {
          margin-top: 12px;
          display: flex;
          gap: 10px;
        }
        .btn-visit-site {
          flex: 1;
          background: var(--royal-burgundy);
          color: white;
          text-align: center;
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-visit-site:hover { background: #A01030; }

        /* How to Build / Component Architecture Banner */
        .builder-explainer {
          background: linear-gradient(135deg, #131D31, #0E1626);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 20px;
          padding: 40px;
          margin: 60px 0;
        }
        .components-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        .comp-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 18px;
        }
        .comp-icon { font-size: 26px; margin-bottom: 8px; }
        .comp-name { font-size: 15px; font-weight: 700; color: #FFFFFF; }
        .comp-desc { font-size: 12px; color: var(--text-muted); margin-top: 4px; line-height: 1.5; }

        /* Onboarding Modal */
        .modal-overlay {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 200;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .modal-container {
          background: #0F172A;
          border: 1px solid var(--gold);
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 32px;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          background: none;
          border: none;
          color: #94A3B8;
          font-size: 24px;
          cursor: pointer;
        }
        .step-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: var(--gold);
          background: rgba(212, 175, 55, 0.1);
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .form-label {
          font-size: 13px;
          font-weight: 700;
          color: #E2E8F0;
          margin-top: 16px;
          margin-bottom: 6px;
          display: block;
        }
        .form-input {
          width: 100%;
          background: #1E293B;
          border: 1px solid #334155;
          color: white;
          padding: 12px 14px;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }
        .form-input:focus { border-color: var(--gold); }
        .slug-preview {
          font-size: 12px;
          color: var(--gold);
          margin-top: 6px;
        }
        .tpl-picker-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        .tpl-option {
          background: #1E293B;
          border: 2px solid #334155;
          border-radius: 10px;
          padding: 12px 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tpl-option.active {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.08);
        }
        .tpl-option-name { font-size: 12px; font-weight: 700; color: white; margin-top: 6px; }

        .comp-checklist {
          margin-top: 10px;
          background: #1E293B;
          border-radius: 10px;
          padding: 12px;
        }
        .check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #CBD5E1;
          padding: 6px 0;
        }

        .btn-launch-final {
          width: 100%;
          background: linear-gradient(135deg, var(--gold), #B38F24);
          color: #070B14;
          font-size: 15px;
          font-weight: 800;
          padding: 14px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          margin-top: 24px;
        }

        /* Footer */
        .footer {
          background: #05080E;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 40px 20px;
          text-align: center;
          font-size: 13px;
          color: #64748B;
        }
      </style>
    </head>
    <body>
      <!-- Top Navigation -->
      <nav class="navbar">
        <a href="/" class="nav-brand">
          <div class="brand-logo-badge">👗</div>
          <div>
            <div class="brand-name">ZVASTRA</div>
            <div class="brand-tag">Boutique & Haute Couture Network</div>
          </div>
        </a>
        <div class="nav-links">
          <a href="#boutiques" class="nav-link">Explore Boutiques</a>
          <a href="#how-it-works" class="nav-link">How It Works</a>
          <button class="btn-launch-nav" onclick="openOnboarding()">
            ✨ Launch Your Boutique
          </button>
        </div>
      </nav>

      <!-- Marketplace Hero -->
      <header class="hero">
        <div class="hero-pill">👑 SOUTH ASIAN ETHNIC & FUSION NETWORK</div>
        <h1 class="hero-title">
          The Marketplace for Handcrafted Couture.<br>
          <span>The Website Builder for Artisans.</span>
        </h1>
        <p class="hero-subtitle">
          Discover royal bridal lehengas, authentic banarasi silks, and designer fusion drapes from independent boutique studios worldwide. Or launch your own customized boutique website in 60 seconds.
        </p>
        <div class="hero-cta-group">
          <button class="cta-primary" onclick="openOnboarding()">
            ✨ Open Your Boutique Storefront
          </button>
          <a href="#boutiques" class="cta-secondary">
            🛍️ Browse Verified Boutiques
          </a>
        </div>
      </header>

      <!-- Stats -->
      <div class="stats-bar">
        <div class="stat-item">
          <div class="stat-val">250+</div>
          <div class="stat-label">Independent Boutiques</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">100%</div>
          <div class="stat-label">Handloom Certified Silks</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">1-Tap</div>
          <div class="stat-label">Direct WhatsApp Chat</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">60s</div>
          <div class="stat-label">Store Setup Time</div>
        </div>
      </div>

      <main class="container">
        <!-- Live Featured Boutiques -->
        <section id="boutiques">
          <div class="section-header">
            <span class="section-tag">HOSTED ON ZVASTRA</span>
            <h2 class="section-title">Explore Verified Independent Boutiques</h2>
            <p class="section-desc">Each client website runs as an independent site with custom domain, video demo reels, and direct WhatsApp inquiries.</p>
          </div>

          <div class="boutiques-grid">
            ${stores.map(s => `
              <div class="boutique-card">
                <div class="card-banner" style="background-image: url('${s.themeConfig.bannerUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'}')">
                  <div class="card-header-badge">${s.templateId.replace('-', ' ').toUpperCase()}</div>
                  <div class="card-logo-wrap">
                    <img src="${s.themeConfig.logoUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100'}" class="card-logo" alt="${s.name}">
                  </div>
                </div>
                <div class="card-body">
                  <h3 class="card-store-name">${s.name}</h3>
                  <div class="card-store-slug">🌐 ${s.slug}.zvastra.com</div>
                  <p class="card-store-bio">${s.themeConfig.bio}</p>
                  <div class="card-meta-row">
                    <span>👗 ${s.stats.totalProducts} Products</span>
                    <span>👁️ ${s.stats.totalVisits.toLocaleString()} Visitors</span>
                    <span>💬 WhatsApp Ready</span>
                  </div>
                  <div class="card-actions">
                    <a href="/preview/${s.slug}" target="_blank" class="btn-visit-site">
                      Visit Boutique Website ↗
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- How Clients Build Sites From Our Reusable Components -->
        <section id="how-it-works" class="builder-explainer">
          <div class="section-header" style="text-align: left; margin-bottom: 20px;">
            <span class="section-tag">COMPONENT-BASED SITE BUILDER</span>
            <h2 class="section-title" style="font-size: 28px;">How New Clients Build Their Store From Our Blocks</h2>
            <p class="section-desc" style="margin: 6px 0 0;">Similar to WordPress Gutenberg or Shopify Sections, clients assemble their boutique website by picking modular e-commerce components:</p>
          </div>

          <div class="components-grid">
            <div class="comp-card">
              <div class="comp-icon">👑</div>
              <div class="comp-name">Hero Banner Block</div>
              <p class="comp-desc">Editorial header with custom brand logo, banner imagery or background video, tagline, and call-to-action button.</p>
            </div>
            <div class="comp-card">
              <div class="comp-icon">🎥</div>
              <div class="comp-name">Video Reels Block</div>
              <p class="comp-desc">Vertical 9:16 Instagram-style swipeable demo reels allowing shoppers to see saree sheen, fabric fall, and jewelry brilliance.</p>
            </div>
            <div class="comp-card">
              <div class="comp-icon">👗</div>
              <div class="comp-name">Product Catalog Grid</div>
              <p class="comp-desc">Filterable multi-category grid with high-res photo zoom, size variant pills (S, M, L, Custom), and prices.</p>
            </div>
            <div class="comp-card">
              <div class="comp-icon">💬</div>
              <div class="comp-name">WhatsApp Direct Pill</div>
              <p class="comp-desc">Sticky 1-click inquiry button connecting shoppers directly to the artisan's WhatsApp Business chat.</p>
            </div>
            <div class="comp-card">
              <div class="comp-icon">🧵</div>
              <div class="comp-name">Artisan Heritage Block</div>
              <p class="comp-desc">Storytelling card showcasing loom origin, master weavers, and Silk Mark or Craftmark authenticity certifications.</p>
            </div>
            <div class="comp-card">
              <div class="comp-icon">📱</div>
              <div class="comp-name">Mobile Studio Sync</div>
              <p class="comp-desc">Clients manage everything via the Zvastra Seller Studio mobile app: take photos, record reels, and track orders.</p>
            </div>
          </div>
        </section>
      </main>

      <!-- Client Onboarding Wizard Modal -->
      <div id="onboardingModal" class="modal-overlay">
        <div class="modal-container">
          <button class="modal-close" onclick="closeOnboarding()">✕</button>
          
          <div class="step-pill">STEP 1 OF 3: ONBOARDING WIZARD</div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 24px; color: #FFFFFF;">Launch Your Boutique on Zvastra</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Choose your website handle, starting template, and modular commerce blocks.</p>

          <form id="onboardingForm" onsubmit="handleLaunchStore(event)">
            <label class="form-label">Boutique / Brand Name</label>
            <input type="text" id="obStoreName" class="form-input" placeholder="e.g. Roopkala Heritage Silks" required oninput="updateSlug(this.value)">
            <div id="obSlugPreview" class="slug-preview">Website URL: https://roopkala-heritage-silks.zvastra.com</div>

            <label class="form-label">Specialty Category</label>
            <select id="obCategory" class="form-input">
              <option value="Bridal & Festive Couture">Bridal & Festive Couture</option>
              <option value="Handloom Silk Sarees">Handloom Silk Sarees</option>
              <option value="Indo-Western & Fusion Wear">Indo-Western & Fusion Wear</option>
              <option value="Heritage Jewellery & Polki">Heritage Jewellery & Polki</option>
            </select>

            <label class="form-label">Choose Starting Template Layout</label>
            <div class="tpl-picker-row">
              <div class="tpl-option active" onclick="selectTpl(this, 'classic-boutique')">
                <div style="font-size: 20px;">👑</div>
                <div class="tpl-option-name">Classic Boutique</div>
              </div>
              <div class="tpl-option" onclick="selectTpl(this, 'video-reels')">
                <div style="font-size: 20px;">🎥</div>
                <div class="tpl-option-name">Video Reels</div>
              </div>
              <div class="tpl-option" onclick="selectTpl(this, 'minimal-catalog')">
                <div style="font-size: 20px;">⚡</div>
                <div class="tpl-option-name">Minimal Catalog</div>
              </div>
            </div>

            <label class="form-label">Include Pre-Built Components</label>
            <div class="comp-checklist">
              <label class="check-item"><input type="checkbox" checked disabled> <span>👑 Hero Header Banner with Brand Logo</span></label>
              <label class="check-item"><input type="checkbox" checked disabled> <span>🎥 Video Reel Demo Showcase</span></label>
              <label class="check-item"><input type="checkbox" checked disabled> <span>👗 Responsive Product Grid with Variants</span></label>
              <label class="check-item"><input type="checkbox" checked disabled> <span>💬 1-Click WhatsApp Direct Order Button</span></label>
            </div>

            <label class="form-label">WhatsApp Business Number (for customer orders)</label>
            <input type="text" id="obWhatsapp" class="form-input" placeholder="+91 98765 43210" required>

            <button type="submit" id="btnSubmitStore" class="btn-launch-final">
              🚀 Launch Boutique Website Now
            </button>
          </form>
        </div>
      </div>

      <footer class="footer">
        <p>&copy; ${new Date().getFullYear()} ZVASTRA.COM — South Asian Haute Couture & Boutique Commerce Network.</p>
        <p style="margin-top: 6px;">Manage your store on the go with the <strong style="color:var(--gold);">Zvastra Seller Studio Mobile App</strong></p>
      </footer>

      <script>
        let selectedTemplateId = 'classic-boutique';

        function openOnboarding() {
          document.getElementById('onboardingModal').style.display = 'flex';
        }

        function closeOnboarding() {
          document.getElementById('onboardingModal').style.display = 'none';
        }

        function updateSlug(name) {
          const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
          document.getElementById('obSlugPreview').innerText = 'Website URL: https://' + (slug || 'your-brand') + '.zvastra.com';
        }

        function selectTpl(el, tplId) {
          document.querySelectorAll('.tpl-option').forEach(o => o.classList.remove('active'));
          el.classList.add('active');
          selectedTemplateId = tplId;
        }

        async function handleLaunchStore(e) {
          e.preventDefault();
          const name = document.getElementById('obStoreName').value.trim();
          const category = document.getElementById('obCategory').value;
          const whatsapp = document.getElementById('obWhatsapp').value.trim();
          const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

          const btn = document.getElementById('btnSubmitStore');
          btn.innerText = 'Creating Your Site...';
          btn.disabled = true;

          try {
            const res = await fetch('/api/v1/stores', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                slug,
                category,
                templateId: selectedTemplateId
              })
            });
            const data = await res.json();
            if (data.success) {
              alert('🎉 Congratulations! Your boutique site has been created.\\n\\nOpening your live site now: ' + slug + '.zvastra.com');
              window.location.href = '/preview/' + slug;
            } else {
              alert('Error: ' + data.message);
              btn.innerText = '🚀 Launch Boutique Website Now';
              btn.disabled = false;
            }
          } catch (err) {
            alert('Failed to launch site. Please check backend connection.');
            btn.innerText = '🚀 Launch Boutique Website Now';
            btn.disabled = false;
          }
        }
      </script>
    </body>
    </html>
  `);
});


// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', platform: 'Zvastra Multi-Tenant Engine', timestamp: new Date().toISOString() });
});

// Dynamic Storefront Preview Renderer (WordPress-style template rendering)
app.get('/preview/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const store = storeService.getStoreBySlug(slug);

  if (!store) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Store Not Found | Zvastra</title></head>
        <body style="font-family:sans-serif;text-align:center;padding:50px;">
          <h2>Store Not Found</h2>
          <p>The site "${slug}.zvastra.com" does not exist yet or has been moved.</p>
        </body>
      </html>
    `);
  }

  storeService.incrementVisit(store.slug);
  const products = productService.getProductsByStore(store.id);
  const theme = store.themeConfig;

  // Render HTML based on the store's selected template
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${store.name} | Powered by Zvastra</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${theme.primaryColor};
      --accent: ${theme.accentColor};
      --bg: ${theme.backgroundColor};
      --font-family: ${theme.fontFamily || 'Inter, sans-serif'};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      font-family: var(--font-family);
      color: #1e293b;
      line-height: 1.6;
    }
    .header-bar {
      background: white;
      border-bottom: 1px solid rgba(0,0,0,0.06);
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--accent);
    }
    .brand-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary);
    }
    .badge-template {
      font-size: 0.72rem;
      background: #f1f5f9;
      padding: 4px 10px;
      border-radius: 9999px;
      color: #64748b;
      font-weight: 600;
    }
    .hero-banner {
      background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url('${theme.bannerUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400'}');
      background-size: cover;
      background-position: center;
      color: white;
      text-align: center;
      padding: 70px 20px;
    }
    .hero-banner h1 {
      font-size: 2.2rem;
      margin-bottom: 12px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .hero-banner p {
      max-width: 620px;
      margin: 0 auto 20px;
      font-size: 1.05rem;
      opacity: 0.95;
    }
    .social-pills {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .pill-btn {
      background: var(--accent);
      color: white;
      text-decoration: none;
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: opacity 0.2s;
    }
    .pill-btn:hover { opacity: 0.9; }
    .catalog-container {
      max-width: 1140px;
      margin: 40px auto;
      padding: 0 20px;
    }
    .section-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .section-header h2 {
      font-size: 1.8rem;
      color: var(--primary);
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 24px;
    }
    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(0,0,0,0.06);
    }
    .media-container {
      position: relative;
      width: 100%;
      padding-top: 120%; /* 4:5 aspect ratio */
      background: #f8fafc;
    }
    .media-container img, .media-container video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .product-info {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .product-category {
      font-size: 0.75rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .product-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }
    .price-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 12px;
    }
    .price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary);
    }
    .compare-price {
      text-decoration: line-through;
      color: #94a3b8;
      font-size: 0.9rem;
    }
    .btn-inquire {
      margin-top: auto;
      background: #25D366;
      color: white;
      text-align: center;
      text-decoration: none;
      padding: 10px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .footer-bar {
      margin-top: 60px;
      background: #0f172a;
      color: #94a3b8;
      text-align: center;
      padding: 30px 20px;
      font-size: 0.85rem;
    }
    .footer-bar a {
      color: var(--accent);
      text-decoration: none;
    }
  </style>
</head>
<body>
  <header class="header-bar">
    <div class="brand-group">
      ${theme.logoUrl ? `<img src="${theme.logoUrl}" class="brand-logo" alt="${store.name} Logo">` : ''}
      <div>
        <div class="brand-title">${store.name}</div>
      </div>
    </div>
    <span class="badge-template">${store.templateId.replace('-', ' ').toUpperCase()}</span>
  </header>

  <section class="hero-banner">
    <h1>${theme.tagline || store.name}</h1>
    <p>${theme.bio || 'Curated boutique collection'}</p>
    <div class="social-pills">
      <a href="https://wa.me/${theme.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi+${encodeURIComponent(store.name)}" target="_blank" class="pill-btn">
        💬 Chat on WhatsApp
      </a>
      ${theme.instagramHandle ? `
        <a href="https://instagram.com/${theme.instagramHandle.replace('@', '')}" target="_blank" class="pill-btn" style="background:#E1306C;">
          📸 ${theme.instagramHandle}
        </a>
      ` : ''}
    </div>
  </section>

  <main class="catalog-container">
    <div class="section-header">
      <h2>Featured Collections</h2>
      <p style="color:#64748b; font-size: 0.95rem;">Handpicked designs with high-resolution photos and video reels</p>
    </div>

    <div class="products-grid">
      ${products.map(p => {
        const primaryMedia = p.media[0];
        const isVideo = primaryMedia && primaryMedia.type === 'video';
        return `
          <div class="product-card">
            <div class="media-container">
              ${isVideo ? `
                <video src="${primaryMedia.url}" poster="${primaryMedia.thumbnailUrl || ''}" autoplay loop muted playsinline></video>
                <div class="video-tag">▶ Video Reel</div>
              ` : `
                <img src="${primaryMedia ? primaryMedia.url : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'}" alt="${p.title}" loading="lazy">
              `}
            </div>
            <div class="product-info">
              <span class="product-category">${p.category}</span>
              <h3 class="product-title">${p.title}</h3>
              <div class="price-row">
                <span class="price">₹${p.price.toLocaleString('en-IN')}</span>
                ${p.compareAtPrice ? `<span class="compare-price">₹${p.compareAtPrice.toLocaleString('en-IN')}</span>` : ''}
              </div>
              <a href="https://wa.me/${theme.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(p.whatsappMessage || `Hi, I am interested in ${p.title}`)}" target="_blank" class="btn-inquire">
                <span>Direct WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  </main>

  <footer class="footer-bar">
    <p>&copy; ${new Date().getFullYear()} ${store.name}. All rights reserved.</p>
    <p style="margin-top: 6px;">Hosted on the <a href="https://zvastra.com" target="_blank">Zvastra Multi-Tenant Platform</a></p>
  </footer>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🚀 Zvastra Multi-Tenant API running on http://localhost:${PORT}`);
  console.log(`🌐 Live Storefront Preview available at http://localhost:${PORT}/preview/ananya-couture`);
});
