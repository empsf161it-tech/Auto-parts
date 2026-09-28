# Auto Parts — High-Performance Automotive E-Commerce Template

A high-performance, modern automotive parts and accessories e-commerce website template engineered with an **Industrial Precision / High-Performance Automotive Engineering** aesthetic.

---

## 🏎️ Template Overview
- **Website Name**: Auto Parts
- **Industry / Niche**: Automotive Parts & Accessories
- **Template Type**: E-commerce / Product Catalog
- **Dashboard**: Yes (Admin Console & Driver Garage Portal)
- **RTL Support**: Yes (Full Right-To-Left bidirectional layout with dedicated `rtl.css` and `⇆` switcher)
- **Frameworks**: Pure Vanilla HTML5, Modern CSS3 (Variables, Flexbox, Grid), and Vanilla ES6+ JavaScript. No bulky frameworks or dependencies.
- **Icons**: Remix Icon CDN (`remixicon@4.2.0`)

---

## 🎨 Step 2 — Design System & Tokens
| Token | Specification |
|---|---|
| **Colors (Max 3)** | **Primary**: Deep Obsidian/Slate (`#0d131f`)<br>**Secondary**: Engineered Steel/Cool Platinum (`#3b485d`)<br>**Accent**: High-Octane Performance Amber-Orange (`#f95716`) |
| **Typography** | **Headings**: `'Chakra Petch'`, sans-serif<br>**Body**: `'Plus Jakarta Sans'`, sans-serif<br>*(Neither uses Inter, Roboto, Arial, or browser defaults)* |
| **Heading Weight Rule** | **H1–H3 never exceed weight 580** (H1: 580, H2: 540, H3: 520, H4: 500) |
| **Border Radius** | Exactly **8px** used globally across cards, buttons, badges, inputs, and modals |
| **Shadows** | Single uniform shadow style: `0 10px 30px -8px rgba(13, 19, 31, 0.08)` (light) / `0 10px 30px -8px rgba(0, 0, 0, 0.6)` (dark) |
| **Spacing Scale** | 8px base unit scale (`8px`, `16px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`) |

---

## 📐 Step 3 — Global Alignment Rules
- **ALL section headings** (`.section-header h2`) are strictly `text-align: center`.
- **ALL section subtext** (`.section-header p`) are strictly `text-align: center`.
- **Cards** (`.card`, `.product-card`, `.category-card`):
  - Equal height (`height: 100%`)
  - Uniform padding and spacing
  - Internal layout: `flex-direction: column; align-items: center; text-align: center;`
  - Elements inside cards start on the same horizontal baseline.
- **Buttons**: Uniform padding, `8px` radius, and font weight (`510`) across all pages.

---

## 🧭 Step 4 — Navbar & Menu Structure
### Breakpoint Behavior (Strict Rule)
- **`> 1024px`**: Full horizontal navbar — all links visible.
- **`≤ 1024px`**: Hamburger icon button (`44px` touch target) opening a slide-in drawer.
- **`360px`**: Slide drawer occupies full width with smooth transition.
- **No in-between state**: At exactly 1024px and below, hamburger is triggered.

### Fixed Menu Items
```text
Home | Home 2 | Services | Shop | Blog | Contact | Dashboard | Login
```
- Logo positioned on the left.
- Nav links centered.
- Actions on the right: RTL toggle (`⇆`), Dark/Light mode toggle, Cart counter badge, and **"Login"** button (labeled strictly "Login").
- Dashboard link opens `dashboard.html`.
- Active page link displays a visible active underline indicator.
- Sticky/fixed on scroll with subtle backdrop blur.

---

## 🌐 Step 5 — RTL Support
- RTL toggled via `dir="rtl"` on `<html>` and `.rtl` class on `<body>`.
- All layout utilizes CSS logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`).
- **RTL Toggle Icon**: Uses a double-arrow icon `⇆` (`ri-arrow-left-right-line`), NOT a text label.
- Overrides are cleanly separated into `assets/css/rtl.css`.
- In RTL mode, the mobile drawer slides in from the **LEFT**.

---

## 🌗 Step 6 — Dark / Light Mode Theme Toggle
- **`> 1024px` (Desktop)**: Shown in navbar right side next to Login.
- **`≤ 1024px` (Mobile/Tablet)**: Hidden from navbar header and placed **INSIDE** the hamburger drawer.
- Detects `prefers-color-scheme` system default and persists choice via `localStorage`.
- Controlled via `[data-theme="dark"]` on `<html>`.
- **Auth Pages (`login.html`, `register.html`)**: **NO theme toggle shown anywhere**, and **NO back-to-home button**.

---

## 📱 Step 7 — Responsive Breakpoints
```css
@media (min-width: 1440px) { /* Large Desktop */ }
@media (min-width: 1025px) and (max-width: 1439px) { /* Desktop */ }
@media (max-width: 1024px) { /* Tablet + Mobile (Hamburger Starts Here) */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 360px) { /* Small Mobile */ }
```

---

## 🛠️ Step 9 — Complete Page Index
| File | Purpose & Requirements Met |
|---|---|
| [`index.html`](file:///d:/project%203/Auto%20Parts/index.html) | Home page: Hero animation, Quick vehicle fitment finder widget (Year/Make/Model/Engine), 10 main categories, featured performance parts, 20% brake offer banner, core services, about story, features grid, driver testimonials, CTA, multi-column footer. |
| [`home2.html`](file:///d:/project%203/Auto%20Parts/home2.html) | Alternative Home: Unique hero animation, **Interactive Dyno & Performance Package Builder Simulator** (+45HP / +110HP / +240HP live specs and parts recommendation), bestsellers, driver community reviews. |
| [`services.html`](file:///d:/project%203/Auto%20Parts/services.html) | 6 Core automotive services (Fitment guarantee, ECU dyno tuning, CNC cylinder machining, OEM core exchange, fleet supply, dyno diagnostics) + feature comparison & pricing table. |
| [`shop.html`](file:///d:/project%203/Auto%20Parts/shop.html) | Complete E-Commerce Catalog: Filter pills for all 10 categories, live search, price and rating sort, Add to Cart simulator with toast notification and badge counter update. |
| [`about.html`](file:///d:/project%203/Auto%20Parts/about.html) | Heritage story (est. 2012), mission & vision, 4-step milestone timeline, engineering leadership team bios. |
| [`blog.html`](file:///d:/project%203/Auto%20Parts/blog.html) | 6 Technical automotive guides with tags, dates, read times, and author avatars. |
| [`blog-single.html`](file:///d:/project%203/Auto%20Parts/blog-single.html) | In-depth technical guide to upgrading rotors & calipers, thermal spec table, master mechanic tip box, author bio, and client-side validated comment form. |
| [`contact.html`](file:///d:/project%203/Auto%20Parts/contact.html) | Client-side validated technical contact form, interactive map coordinates card, headquarters hours, 360px mobile centered layout. |
| [`login.html`](file:///d:/project%203/Auto%20Parts/login.html) | Centered vertically & horizontally, no-scroll layout, Email & Password, primary "Login" button, official Google & Apple login, register link, **NO theme toggle, NO back button**. |
| [`register.html`](file:///d:/project%203/Auto%20Parts/register.html) | Centered vertically & horizontally, no-scroll layout, Name, Email, Password, Confirm Password, Terms & conditions checkbox, "Register" button, social buttons, login link, **NO theme toggle, NO back button**. |
| [`dashboard.html`](file:///d:/project%203/Auto%20Parts/dashboard.html) | Full Admin Console (KPI cards, order search, user accounts, content catalog, analytics charts, settings) + Driver Garage Portal (Profile, registered vehicles, order tracking, wishlist, messages). |
| [`404.html`](file:///d:/project%203/Auto%20Parts/404.html) | High-octane automotive 404 track limit warning, clear message, navigation back to Home and Shop. |
| [`coming-soon.html`](file:///d:/project%203/Auto%20Parts/coming-soon.html) | Live JavaScript countdown timer (Days, Hours, Minutes, Seconds) + early access VIP newsletter capture with client-side validation. |

---

## 📦 Step 13 — File Structure
```text
Auto Parts/
├── index.html
├── home2.html
├── services.html
├── shop.html
├── about.html
├── blog.html
├── blog-single.html
├── contact.html
├── login.html
├── register.html
├── dashboard.html
├── 404.html
├── coming-soon.html
├── README.md
└── assets/
    ├── css/
    │   ├── style.css      # Core styles, design tokens, responsive rules, dark theme
    │   └── rtl.css        # RTL layout overrides & left drawer slide
    └── js/
        ├── main.js        # Theme toggle, RTL, mobile drawer, form validation, cart, countdown
        └── dashboard.js   # Admin/User view switcher, tab navigation, order filter
```

---

## ⚡ Form Validation (Step 12)
All forms (`#login-form`, `#register-form`, `#contact-form`, `#vehicle-finder-form`, newsletters) feature client-side validation:
- Red border + descriptive error message on failure
- Green border on field validity
- Regex format validation on email inputs
- Passwords must be at least 8 characters
- Password and Confirm Password must match
- Checkboxes require acceptance before submission
- Inline feedback messages displayed with zero disruptive page reloads
