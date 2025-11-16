# Massage Booking Application

React aplikace pro rezervaci masážních služeb s administračním rozhraním.

## 🚀 Technologie

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hook Form** - Formuláře
- **Lucide React** - Ikony
- **Recharts** - Grafy
- **React Hot Toast** - Notifikace

## 📦 Instalace

```bash
npm install
```

## 🏃 Spuštění

### Vývojový režim
```bash
npm run dev
```
Aplikace běží na: http://localhost:3000

### Build
```bash
npm run build
```

### Preview produkční verze
```bash
npm run preview
```

## 🔐 Admin přístup

**URL:** `/admin/login`

**Přihlašovací údaje:**
- Email: `admin@example.com`
- Heslo: `Admin123!`

## 📁 Struktura projektu

```
src/
├── components/       # React komponenty
│   ├── admin/       # Admin komponenty
│   ├── booking/     # Booking komponenty
│   ├── common/      # Sdílené komponenty
│   ├── home/        # Home page komponenty
│   └── layout/      # Layout komponenty
├── hooks/           # Custom React hooks
├── pages/           # Stránky aplikace
│   ├── admin/       # Admin stránky
│   └── public/      # Veřejné stránky
├── services/        # API a služby
├── store/           # Zustand stores
├── styles/          # CSS styly
└── utils/           # Utility funkce
```

## 🌐 Deploy na Netlify

Aplikace je připravena pro automatický deploy přes GitHub.

### Build nastavení:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Branch:** `main`

## 📝 Poznámky

- Aplikace používá mock data a mock autentizaci
- Pro produkční použití je třeba připojit backend API
- Admin sekce je chráněna pomocą ProtectedRoute
