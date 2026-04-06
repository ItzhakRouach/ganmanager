# GanManager — Claude Code Instructions

## Git Workflow — MANDATORY

Claude must commit and push after every completed unit of work. No exceptions.

### Commit Rules

```bash
# After every feature, page, component, fix, or schema change:
git add .
git commit -m "<type>: <description in english>"
git push origin main
```

### Commit Types

- `feat:` — new feature or page
- `fix:` — bug fix
- `style:` — UI/design changes only
- `refactor:` — code restructure, no new feature
- `db:` — schema or migration changes
- `api:` — new or updated API endpoint
- `docs:` — README or documentation updates

### Commit Granularity

- One commit per completed component
- One commit per completed page
- One commit per API route group
- One commit per database migration
- Never batch multiple unrelated things into one commit

### Examples

```bash
git commit -m "feat: add children list page with add/edit modal"
git commit -m "api: add CRUD endpoints for children"
git commit -m "db: add Employee model and migration"
git commit -m "style: upgrade login page UI with Heebo font and blue palette"
git commit -m "fix: RTL alignment on payment status badge"
```

---

## Agent & Skill Orchestration

### Agents — When to Invoke

**`fullstack-developer` agent:**
Use for any feature touching both backend and frontend:

- New pages that need API endpoints
- Auth flows
- Data models + UI together

**`ui-ux-designer` agent:**
Use to review completed UI before committing:

- RTL compliance check
- Mobile usability audit
- Accessibility review
- Hebrew typography check

### Skills — When to Invoke

**`ui-ux-pro-max` skill:**
Run BEFORE building any page or component:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "daycare management dashboard hebrew rtl" --design-system -p "GanManager"
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "sidebar navigation responsive" --stack react
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation accessibility rtl" --domain ux
```

**`frontend-design` skill:**
Use for aesthetic direction on every page. Commit to a bold, distinctive design. No generic SaaS aesthetics. No Inter font. No purple gradients. No cards-everywhere layouts.

**`senior-frontend` skill:**
Use for component scaffolding, performance patterns, and React best practices.

### Workflow Per Feature

1. Run `ui-ux-pro-max` design system query
2. Apply `frontend-design` skill for aesthetic direction
3. Use `fullstack-developer` agent to build backend + frontend together
4. Use `ui-ux-designer` agent to review the result
5. Fix any flagged issues
6. Commit and push

---

## Project Overview

GanManager is a private full-stack CRM web app for an Israeli children's daycare (גן ילדים).
The owner manages children, parents, employees, payments, and expenses — and gets AI-powered financial insights.
Single admin user (the owner). No public registration.

---

## Tech Stack

### Frontend (`client/`)

- React 18 + TypeScript + Vite
- Tailwind CSS v3
- React Router DOM
- Axios
- Recharts
- i18next + react-i18next

### Backend (`server/`)

- Node.js + Express + TypeScript
- Prisma ORM v6 + PostgreSQL
- JWT (jsonwebtoken) + bcryptjs
- dotenv v16

### Version Locks — Do Not Upgrade

- **dotenv must stay at v16** — v17 is dotenvx, hijacks env loading, causes 403 errors
- **Prisma must stay at v6** — v7 has breaking config changes incompatible with this setup

---

## Critical Requirements

### RTL & Hebrew — Never Compromise

- `index.html` must have `<html lang="he" dir="rtl">`
- ALL UI text in Hebrew
- ALL backend error messages in Hebrew
- `text-right` on all inputs
- Flex and grid layouts must account for RTL direction
- Font: **Heebo** from Google Fonts — add to `client/index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

- Set Heebo as base font in `tailwind.config.js`:

```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Heebo', 'sans-serif'],
    },
  },
},
```

### Design Direction

- Professional, refined, warm dashboard — not cold corporate
- Primary: deep blue `#1e3a5f`
- Accent: warm gold `#f59e0b`
- Background: soft off-white `#f8fafc`
- Cards: white with subtle shadow, `rounded-2xl`
- Sidebar on desktop, bottom nav on mobile
- Fully responsive — owner uses this daily on her phone
- Smooth hover transitions 150-200ms
- No purple gradients. No generic AI aesthetics. No Inter font.

### Code Quality

- No `any` types — use proper TypeScript interfaces everywhere
- All shared interfaces in `client/src/types/index.ts`
- All API responses typed
- Async/await only — no raw `.then()` chains
- Error handling on every API call
- All protected routes must use `protect` middleware from `authMiddleware.ts`

---

## Project Structure

### Frontend (`client/src/`)

```
api/
  axios.ts
context/
  AuthContext.tsx
types/
  index.ts
pages/
  Login.tsx
  Dashboard.tsx
  Children.tsx
  Finance.tsx
  Employees.tsx
  Insights.tsx
components/
  layout/
    Layout.tsx
    Sidebar.tsx
    MobileNav.tsx
  ui/
    Button.tsx
    Input.tsx
    Card.tsx
    Badge.tsx
    Modal.tsx
    Spinner.tsx
  charts/
    IncomeExpenseChart.tsx
    PaymentStatusChart.tsx
hooks/
  useChildren.ts
  useFinance.ts
  useEmployees.ts
```

### Backend (`server/src/`)

```
controllers/
  authController.ts
  childrenController.ts
  parentsController.ts
  employeesController.ts
  paymentsController.ts
  expensesController.ts
  insightsController.ts
routes/
  authRoutes.ts
  childrenRoutes.ts
  parentsRoutes.ts
  employeesRoutes.ts
  paymentsRoutes.ts
  expensesRoutes.ts
  insightsRoutes.ts
middleware/
  authMiddleware.ts
index.ts
```

---

## Database Schema (Prisma v6)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
}

model Child {
  id             Int       @id @default(autoincrement())
  firstName      String
  lastName       String
  dateOfBirth    DateTime
  enrollmentDate DateTime
  tuitionAmount  Float
  subsidyAmount  Float     @default(0)
  isActive       Boolean   @default(true)
  notes          String?
  parents        Parent[]
  payments       Payment[]
  createdAt      DateTime  @default(now())
}

model Parent {
  id        Int     @id @default(autoincrement())
  firstName String
  lastName  String
  phone     String
  email     String?
  children  Child[]
}

model Payment {
  id        Int           @id @default(autoincrement())
  childId   Int
  child     Child         @relation(fields: [childId], references: [id])
  amount    Float
  month     Int
  year      Int
  paidAt    DateTime?
  status    PaymentStatus @default(PENDING)
  notes     String?
  createdAt DateTime      @default(now())
}

model Expense {
  id        Int             @id @default(autoincrement())
  category  ExpenseCategory
  amount    Float
  month     Int
  year      Int
  notes     String?
  createdAt DateTime        @default(now())
}

model Employee {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  phone     String
  role      String
  salary    Float
  startDate DateTime
  isActive  Boolean  @default(true)
}

enum PaymentStatus {
  PENDING
  PAID
  LATE
  PARTIAL
}

enum ExpenseCategory {
  SALARY
  RENT
  SUPPLIES
  FOOD
  MAINTENANCE
  OTHER
}
```

---

## What's Already Built

### Backend ✅

- Express app with CORS, dotenv, routes — `server/src/index.ts`
- Auth controller — register + login with bcrypt + JWT — `server/src/controllers/authController.ts`
- Auth routes — POST `/api/auth/register`, POST `/api/auth/login`
- JWT protect middleware — `server/src/middleware/authMiddleware.ts`
- Prisma schema migrated, DB live at `localhost:5432/ganmanager`

### Frontend ✅

- Axios with JWT interceptor — `client/src/api/axios.ts`
- Auth context — `client/src/context/AuthContext.tsx`
- React Router with protected routes — `client/src/App.tsx`
- Basic login page (needs UI upgrade) — `client/src/pages/Login.tsx`
- Placeholder dashboard — `client/src/pages/Dashboard.tsx`

---

## Build Phases

### Phase 1 — Layout & Navigation

- [ ] Add Heebo font to `index.html`
- [ ] Configure Tailwind fontFamily
- [ ] `Layout.tsx` — sidebar + main content wrapper
- [ ] `Sidebar.tsx` — RTL sidebar, nav links, active state, logout
- [ ] `MobileNav.tsx` — bottom nav for mobile
- [ ] Upgrade `Login.tsx` — full design system applied
- [ ] `Dashboard.tsx` — summary cards: total children, monthly income, expenses, net profit
- **Commit**: `style: phase 1 - layout, sidebar, mobile nav, login upgrade`

### Phase 2 — Children & Parents

- [ ] Backend CRUD for children and parents
- [ ] `Children.tsx` — list, add/edit/deactivate
- [ ] Child card: name, age, tuition, subsidy, payment status this month
- [ ] Add/Edit modal with Hebrew form
- [ ] Parent profiles linked to children
- **Commits**:
  - `api: children and parents CRUD endpoints`
  - `feat: children management page with add/edit modal`

### Phase 3 — Finance

- [ ] Backend routes for payments and expenses
- [ ] `Finance.tsx` — monthly income vs expenses
- [ ] Income table: child, tuition, subsidy, net, status
- [ ] Expenses table: category, amount, notes
- [ ] Add expense form
- [ ] Profit/loss summary card
- [ ] `IncomeExpenseChart.tsx` — bar chart, last 6 months
- [ ] `PaymentStatusChart.tsx` — pie chart, paid/pending/late
- **Commits**:
  - `api: payments and expenses endpoints`
  - `feat: finance page with tables and charts`

### Phase 4 — Employees

- [ ] Backend CRUD for employees
- [ ] `Employees.tsx` — list with salary info, add/edit/deactivate
- [ ] Monthly salary total on Finance page
- **Commits**:
  - `api: employees CRUD endpoints`
  - `feat: employees management page`

### Phase 5 — AI Insights

- [ ] `insightsController.ts` — calls Claude API with last 3 months financial data
- [ ] Returns Hebrew report: health summary, cost-cutting tips, payment patterns, forecast
- [ ] `Insights.tsx` — clean Hebrew report card UI
- **Commits**:
  - `api: insights endpoint with Claude API`
  - `feat: AI insights page with Hebrew financial report`

### Phase 6 — WhatsApp

- [ ] Green API integration (https://green-api.com)
- [ ] Payment reminders to late parents
- [ ] Monthly invoice per parent
- [ ] Broadcast to all parents
- **Commits**:
  - `feat: WhatsApp integration via Green API`
  - `feat: payment reminders and broadcast messaging`

---

## API Endpoints to Build

All routes protected with `protect` middleware except `/api/auth/*`

| Method | Route                           | Description           |
| ------ | ------------------------------- | --------------------- |
| GET    | `/api/children`                 | All active children   |
| POST   | `/api/children`                 | Create child          |
| PUT    | `/api/children/:id`             | Update child          |
| PATCH  | `/api/children/:id/deactivate`  | Soft delete           |
| GET    | `/api/parents`                  | All parents           |
| POST   | `/api/parents`                  | Create parent         |
| PUT    | `/api/parents/:id`              | Update parent         |
| GET    | `/api/payments?month=&year=`    | Payments for a month  |
| POST   | `/api/payments`                 | Create payment        |
| PATCH  | `/api/payments/:id/status`      | Update status         |
| GET    | `/api/expenses?month=&year=`    | Expenses for a month  |
| POST   | `/api/expenses`                 | Create expense        |
| DELETE | `/api/expenses/:id`             | Delete expense        |
| GET    | `/api/employees`                | All active employees  |
| POST   | `/api/employees`                | Create employee       |
| PUT    | `/api/employees/:id`            | Update employee       |
| PATCH  | `/api/employees/:id/deactivate` | Soft delete           |
| POST   | `/api/insights/analyze`         | AI financial analysis |

---

## Environment Variables

### `server/.env`

```
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/ganmanager"
PORT=5000
JWT_SECRET="your_jwt_secret"
ANTHROPIC_API_KEY="your_claude_api_key"
GREENAPI_INSTANCE_ID="your_instance_id"
GREENAPI_TOKEN="your_token"
```

### `client/.env`

```
VITE_API_URL=http://localhost:5000/api
```

---

## Domain Context

- Israeli phone format: `05X-XXX-XXXX`
- All amounts in Israeli Shekel (₪)
- Payments may include government subsidies (סבסוד) — stored as `subsidyAmount` on Child
- Net tuition = `tuitionAmount - subsidyAmount`
- Partial months are common — use payment notes field
- Employee salaries follow Israeli labor law — multi-tier rates may apply
