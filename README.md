# Rule Engine MVP - Frontend Requirements Specification

## Executive Summary
A web-based frontend application for managing NCPDP routing rules for pharmacy chains. The application consumes existing backend APIs to display and manage routing configurations, including BINs, PCNs, Group Numbers, and NPI/NDC inclusion/exclusion lists.

---
## 1. System Overview

### 1.1 Objective
Provide pharmacy administrators with an intuitive interface to:

- View and search for customers (pharmacy chains)
- Access specific NCPDP rules by customer
- Download NPI/NDC lists for operational use
- Manage rules (create, edit, deactivate) — MVP focused on reading and downloading; basic CRUD operations optional as per roadmap

### 1.2 Target Audience
Operational and IT administrators of pharmacy chains.

---

## 2. Technology (Technical Summary)

- **Framework:** Next.js 16.0.0 (App Router)
- **UI:** React 19.2.0 + Tailwind CSS 4 (custom pharmaceutical theme)
- **Language:** TypeScript 5
- **Icons:** Lucide React
- **State:** React Hooks (`useState`, `useEffect`) — lightweight store; Possible refactoring to React Query / SWR if needed
- **Build/CI:** Node 20+, Vercel/Netlify, or CI pipeline (GitHub Actions)

---
XXXX
## 3. Functional Requirements

### 3.1 Client Management Module

#### 3.1.1 Client List Page (`/clients`)
**Priority:** P0 (Must Have)

**Display / UX**
- Paginated table (10 clients per page) with support for *infinite scroll* (or page loading with "Load more" button).
- Columns: `ID (GUID)`, `Name`, `Created At`, `Status`, `Actions`.
- Visual status indicator (badge): **Active = green**, **Inactive = red**.
- Actions per row: `Settings` (leads to `/clients/[id]/settings`) and, optionally, `View`.

**Search / Filter**
- Global search bar in the table header — real-time, case-insensitive search that filters by `ID`, `Name`, `Date`, `Status`.
- Clear button (X) and result counter (e.g., `Showing 3 of 124`).

**Sort**
- Sort by `Name` (asc/desc) by clicking on the header; show icon (↑/↓).
- Other headers not sortable in MVP, but designed for extension.

### 3.2 Client Settings Module

#### 3.2.1 Client Settings Page (`/clients/[id]/settings`)

**Priority:** P0 *(Must Have)*

---

#### A. Header Section

- Back navigation to client list
- Client ID display *(read-only)*
- Page title: **"Client Settings"**

---

#### B. NCPDP Rules Table

**Display Columns:**
- Rule ID
- **BIN** (6 digits, badge format)
- **PCN** (alphanumeric, badge format)
- **Group Number** (alphanumeric, badge format)
- **Excluded NPIs** (count + download)
- **Excluded NDCs** (count + download)
- **Included NPIs** (count + download)
- **Allowed NDCs** (count + download)
- **Created At** (MM/DD/YYYY HH:MM)

---

**Search Functionality:**
- Search bar in table header
- Filter by: *Rule ID, BIN, PCN, Group Number, Date*
- Real-time filtering
- Result counter

---
- **GETTING STARTED:**
- npm run dev
