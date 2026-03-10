# FrontierBioLabs Services Hub

Secure B2B Biotech Experimentation Platform — Built with React + Vite + Tailwind CSS.

## 🧬 Overview

FrontierBioLabs Services Hub is a HIPAA/GDPR/FDA-compliant platform for managing custom scientific experimentation services between biotech suppliers and pharmaceutical clients.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
frontierbiolabs/
├── public/
├── src/
│   ├── components/
│   │   ├── UI.jsx              # Shared UI components (StatCard, StatusBadge, etc.)
│   │   ├── PublicLayout.jsx    # Navbar + Footer for public pages
│   │   └── DashboardLayout.jsx # Dashboard nav + footer
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page with lab imagery backgrounds
│   │   ├── AboutPage.jsx       # About / mission page
│   │   ├── ServicesPage.jsx    # Service catalog (public)
│   │   ├── ContactPage.jsx     # Contact form
│   │   ├── LoginPage.jsx       # Authentication
│   │   ├── RegisterPage.jsx    # Registration (buyer/supplier)
│   │   ├── SupplierDashboard.jsx  # Supplier home dashboard
│   │   ├── BuyerDashboard.jsx     # Buyer home dashboard
│   │   ├── ActiveProjects.jsx     # Project listing (supplier)
│   │   ├── MyProjects.jsx         # Project listing (buyer)
│   │   ├── ServicesManagement.jsx # Service CRUD (supplier)
│   │   ├── ClientRequests.jsx     # Incoming requests (supplier)
│   │   ├── Invoicing.jsx         # Invoice management
│   │   ├── Messages.jsx          # Chat/messaging
│   │   ├── BrowseServices.jsx    # Service catalog (buyer)
│   │   └── ProjectWorkspace.jsx  # Core collaboration workspace
│   ├── constants.js           # Image URLs, status styles
│   ├── App.jsx                # Router configuration
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind + custom styles + background images
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design Features

- **Real lab/biotech background images** from Unsplash (free, no attribution required)
- Light-colored overlay gradients for readability on all backgrounds
- Glassmorphism cards (`glass-card` class)
- Floating animated particles
- DNA/molecule SVG patterns
- Custom `Outfit` display + `DM Sans` body typography
- Teal/emerald gradient color system
- HIPAA / GDPR / FDA compliance badges throughout

## 📋 Pages

### Public Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, features, how it works, services, security, CTA |
| About | `/about` | Mission, values, stats |
| Services | `/services` | Categorized service catalog |
| Contact | `/contact` | Contact form + info |
| Login | `/login` | Authentication (links to both dashboards) |
| Register | `/register` | Registration with buyer/supplier toggle |

### Supplier Dashboard
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/supplier/dashboard` | Stats, project table, quick actions |
| Active Projects | `/supplier/projects` | Progress tracking for all projects |
| Services Mgmt | `/supplier/services` | CRUD for service catalog |
| Client Requests | `/supplier/requests` | Incoming request review |
| Invoicing | `/supplier/invoicing` | Invoice management |
| Messages | `/supplier/messages` | Client communication |
| Workspace | `/supplier/workspace/:id` | Document sharing, discussion, activity |

### Buyer Dashboard
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/buyer/dashboard` | Stats, project tracking, browse CTA |
| Browse Services | `/buyer/browse` | Filterable service catalog |
| My Projects | `/buyer/projects` | Commissioned experiments |
| Invoices | `/buyer/invoices` | Payment tracking |
| Messages | `/buyer/messages` | Supplier communication |
| Workspace | `/buyer/workspace/:id` | Collaboration workspace |

## 🛡️ Background Images

All background images use Unsplash photos with semi-transparent gradient overlays:
- **Hero**: Lab equipment / microscope (dark overlay)
- **Features**: DNA strands (light overlay)  
- **How It Works**: Petri dish / lab (dark overlay)
- **Services**: Test tubes (light overlay)
- **Security**: Molecular structure (light overlay)
- **Dashboard**: Lab equipment (very light overlay, fixed attachment)

## 📄 License

Proprietary — FrontierBioLabs Services Hub
