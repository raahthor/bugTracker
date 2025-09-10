# 🐛 Bug Tracker SaaS

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748.svg)](https://prisma.io/)

</div>

<p align="center">
  <strong>A modern, scalable bug tracking SaaS platform designed for small to medium organizations.</strong>
  <br />
  Streamline your development workflow with intuitive project management, comprehensive bug tracking, and secure team collaboration.
</p>

<div align="center">
  
  🚀 **[Live Demo](#)** • 📚 **[Documentation](#)** • 🐛 **[Report Bug](#)** • ✨ **[Request Feature](#)**
  
</div>

---

## 🌟 Key Features


### 🔐 **Secure Authentication**
- 🔑 **Multi-factor login** - Username/password or Google OAuth
- 🛡️ **Enhanced security** - Google OAuth-only account creation
- 📧 **Password recovery** - Brevo-powered token system
- 🔄 **Session management** - JWT with auto-refresh

### 🏢 **Organization Management**
- 🤝 **Flexible teams** - Create or join with secure codes
- 👑 **Owner privileges** - Full admin control & 30-day recovery
- 👤 **Member access** - Project/bug creation & assignment
- 🔒 **Role-based security** - Granular permission system


### 📊 **Project & Bug Tracking**
- 🔄 **Complete lifecycle** - Creation to resolution tracking
- 🎯 **Smart assignment** - Team member notification system
- 🚨 **Priority levels** - High/Medium/Low categorization
- 📈 **Status workflow** - Open → In Progress → Closed
- ✅ **Ownership control** - Only owners/assignees can close

### 👤 **User Experience**
- 📋 **Personal dashboard** - 3 recent orgs + 5 assigned bugs
- 🔍 **Advanced search** - Instant member & bug filtering
- ⚙️ **Profile management** - Update info, username & password
- 🧭 **Intuitive navigation** - Dedicated pages for everything
- ⚠️ **Safety first** - Confirmations for destructive actions


## 🛠️ **Tech Stack**

<div align="center">

| **Frontend** | **Backend** | **Database & Tools** | **Services** |
|:------------:|:-----------:|:--------------------:|:------------:|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) | ![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=flat&logo=google&logoColor=white) |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) | ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) | ![Brevo](https://img.shields.io/badge/Brevo-0052CC?style=flat&logo=sendinblue&logoColor=white) |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | | |

</div>

<details>
<summary><strong>📋 Detailed Tech Breakdown</strong></summary>

| **Category** | **Technology** | **Purpose** |
|--------------|----------------|-------------|
| **Frontend** | React 18+ | Component-based UI framework with hooks |
| **Framework** | Next.js 14+ | Full-stack React framework with SSR/SSG |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Backend** | Node.js + Express | RESTful API server with middleware support |
| **Database** | PostgreSQL | ACID-compliant relational database |
| **ORM** | Prisma | Type-safe database client with migrations |
| **Authentication** | JWT + Google OAuth | Secure stateless authentication |
| **Email Service** | Brevo | Reliable transactional email delivery |

</details>

## 📖 **Usage Guide**

<div align="center">
  
  ### 🎯 **Quick Navigation**
  
  [Getting Started](#getting-started) • [User Roles](#user-roles--permissions) • [Features](#features-overview)
  
</div>

### **Getting Started**

> 📝 **Pro Tip:** Follow these steps in order for the smoothest setup experience!

<table>
<tr>
<td align="center" width="20%">
  
  **1️⃣**
  
  **Account**
  
</td>
<td>
  
  **Sign up** using your Google account for instant access and enhanced security
  
</td>
</tr>
<tr>
<td align="center">
  
  **2️⃣**
  
  **Organization**
  
</td>
<td>
  
  **Create** a new organization or **join** existing one with a secure join code
  
</td>
</tr>
<tr>
<td align="center">
  
  **3️⃣**
  
  **Projects**
  
</td>
<td>
  
  **Set up projects** within your organization to categorize and organize bugs
  
</td>
</tr>
<tr>
<td align="center">
  
  **4️⃣**
  
  **Bug Tracking**
  
</td>
<td>
  
  **Report bugs** with detailed descriptions, priority levels, and team assignments
  
</td>
</tr>
<tr>
<td align="center">
  
  **5️⃣**
  
  **Collaborate**
  
</td>
<td>
  
  **Assign tasks** to team members and track progress through the complete workflow
  
</td>
</tr>
</table>

### **User Roles & Permissions**

<div align="center">

| **Action** | **👑 Owner** | **👤 Member** | **Description** |
|:-----------|:------------:|:-------------:|:----------------|
| **Organization Management** |
| Create/Edit Organization | ✅ | ❌ | Full control over org settings and details |
| Delete Organization (Soft) | ✅ | ❌ | 30-day recovery window for deleted orgs |
| Remove Members | ✅ | ❌ | Manage team membership and access |
| **Project Management** |
| Create Projects | ✅ | ✅ | Both roles can create new projects |
| Edit Project Details | ✅ | ❌ | Only owners can modify project settings |
| Delete Projects (Permanent) | ✅ | ❌ | Permanent deletion with no recovery |
| **Bug Management** |
| Create/Assign Bugs | ✅ | ✅ | Full bug creation and assignment rights |
| Close Own/Assigned Bugs | ✅ | ✅ | Close bugs you own or are assigned to |

</div>

## 🎨 **Features Overview**

<details>
<summary><strong>🔐 Authentication & Security</strong></summary>

- **Multi-provider login** with username/password and Google OAuth
- **Secure onboarding** exclusively through Google OAuth
- **Token-based recovery** system with email verification
- **Session management** with automatic JWT refresh
- **Role-based access** control with granular permissions

</details>

<details>
<summary><strong>🏢 Organization Management</strong></summary>

- **Flexible team structure** with secure join codes
- **Owner privileges** including soft deletion and recovery
- **Member management** with invitation and removal
- **Organization settings** and customization options

</details>

<details>
<summary><strong>📊 Project & Bug Tracking</strong></summary>

- **Complete bug lifecycle** from creation to resolution
- **Priority categorization** with High/Medium/Low levels
- **Status workflow** tracking through Open → In Progress → Closed
- **Assignment system** with notification support
- **Personal dashboards** for individual bug tracking

</details>

<details>
<summary><strong>👤 User Experience</strong></summary>

- **Personalized dashboard** with quick access to recent activity
- **Advanced search and filtering** for efficient navigation
- **Profile management** with secure password updates
- **Intuitive UI** with confirmation dialogs for safety
- **Responsive design** for desktop and mobile use

</details>

<!-- ---

<div align="center">

## 🚀 **Ready to Get Started?**

<p>
  <a href="#installation">
    <img src="https://img.shields.io/badge/Get%20Started-Now-brightgreen?style=for-the-badge&logo=rocket" alt="Get Started">
  </a>
  <a href="#demo">
    <img src="https://img.shields.io/badge/View%20Demo-Live-blue?style=for-the-badge&logo=play" alt="Live Demo">
  </a>
  <a href="#contributing">
    <img src="https://img.shields.io/badge/Contribute-Welcome-orange?style=for-the-badge&logo=handshake" alt="Contribute">
  </a>
</p>

</div> -->

---

<div align="center">
  
  **Made with ❤️ for developers, by developers**
  
  <!-- <sub>© 2025 Bug Tracker SaaS. All rights reserved.</sub> -->
  
</div>