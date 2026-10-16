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

// Root Welcome & Developer Hub
app.get('/', (req: Request, res: Response) => {
  const stores = storeService.getStoresByUser('user-1');
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Zvastra Engine — Backend & Preview Hub</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Inter', sans-serif;
          background: #090D16;
          color: #F8FAFC;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
        }
        .container {
          max-width: 800px;
          width: 100%;
          background: #0F172A;
          border: 1px solid #1E293B;
          border-radius: 20px;
          padding: 36px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1E293B;
          padding-bottom: 20px;
          margin-bottom: 28px;
        }
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-icon {
          font-size: 28px;
          background: #800020;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .status-pill {
          background: #064E3B;
          color: #34D399;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background: #34D399;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px #34D399;
        }
        .section-label {
          font-size: 12px;
          font-weight: 700;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 14px;
        }
        .sites-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 28px;
        }
        @media (max-width: 600px) {
          .sites-grid { grid-template-columns: 1fr; }
        }
        .site-card {
          background: #1E293B;
          border: 1px solid #334155;
          border-radius: 14px;
          padding: 20px;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, border-color 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .site-card:hover {
          transform: translateY(-3px);
          border-color: #D4AF37;
        }
        .site-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 4px;
        }
        .site-card-sub {
          font-size: 12px;
          color: #94A3B8;
          margin-bottom: 14px;
        }
        .site-card-btn {
          background: #800020;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 8px;
          text-align: center;
        }
        .api-list {
          background: #131D31;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .api-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #1E293B;
          font-size: 13px;
        }
        .api-item:last-child { border-bottom: none; }
        .api-method {
          font-weight: 700;
          color: #38BDF8;
          background: #0C4A6E;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          margin-right: 8px;
        }
        .api-link {
          color: #94A3B8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .api-link:hover { color: #38BDF8; }
        .footer-note {
          font-size: 12px;
          color: #64748B;
          text-align: center;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-wrap">
            <div class="logo-icon">👗</div>
            <div>
              <div class="title">Zvastra Multi-Tenant Engine</div>
              <div style="font-size: 12px; color: #94A3B8;">Central API & WordPress-style Storefront Host</div>
            </div>
          </div>
          <div class="status-pill">
            <span class="status-dot"></span>
            ACTIVE (PORT ${PORT})
          </div>
        </div>

        <div class="section-label">Live Customer Website Storefronts</div>
        <div class="sites-grid">
          ${stores.map(s => `
            <a href="/preview/${s.slug}" class="site-card" target="_blank">
              <div>
                <div class="site-card-title">${s.name}</div>
                <div class="site-card-sub">Template: <strong>${s.templateId}</strong> • ${s.slug}.zvastra.com</div>
              </div>
              <div class="site-card-btn">Open Live Website ↗</div>
            </a>
          `).join('')}
        </div>

        <div class="section-label">REST API Endpoints</div>
        <div class="api-list">
          <div class="api-item">
            <div><span class="api-method">GET</span> <a class="api-link" href="/api/v1/stores" target="_blank">/api/v1/stores</a></div>
            <span style="color:#64748B;">List all stores</span>
          </div>
          <div class="api-item">
            <div><span class="api-method">GET</span> <a class="api-link" href="/api/v1/templates" target="_blank">/api/v1/templates</a></div>
            <span style="color:#64748B;">Available templates</span>
          </div>
          <div class="api-item">
            <div><span class="api-method">GET</span> <a class="api-link" href="/api/v1/stores/store-1/products" target="_blank">/api/v1/stores/store-1/products</a></div>
            <span style="color:#64748B;">Product catalog</span>
          </div>
          <div class="api-item">
            <div><span class="api-method">GET</span> <a class="api-link" href="/api/v1/stores/store-1/inquiries" target="_blank">/api/v1/stores/store-1/inquiries</a></div>
            <span style="color:#64748B;">Customer leads</span>
          </div>
          <div class="api-item">
            <div><span class="api-method">GET</span> <a class="api-link" href="/health" target="_blank">/health</a></div>
            <span style="color:#64748B;">Health status</span>
          </div>
        </div>

        <div class="footer-note">
          To run the mobile app: <code style="color:#D4AF37;">cd mobile && npx expo start</code>
        </div>
      </div>
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
