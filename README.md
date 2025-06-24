# React Bottom Sheet Assignment

> **Frontend Assignment**: React Bottom Sheet with Multiple Screen Snap Points and Spring Motion

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://reactjs.org/)

---

## 📸 Screenshots

1. ![Screenshot 1](public/s1.png)
2. ![Screenshot 2](public/s2.png)
3. ![Screenshot 3](public/s3.png)
4. ![Screenshot 4](public/s4.png)
5. ![Screenshot 5](public/s5.png)
6. ![Screenshot 6](public/s6.png)
7. ![Screenshot 7](public/s7.png)

---

## 🎯 Assignment Overview

This project implements a **React Bottom Sheet component** with multiple snap points and spring motion animations as per the frontend assignment requirements. The implementation demonstrates advanced React patterns, custom animations, and responsive design principles **without using external animation libraries**.

### 📋 Requirements Fulfilled

- ✅ **React Application Setup** - Next.js with hooks and functional components
- ✅ **Bottom Sheet Component** - Three snap points (closed, half-open, fully open)
- ✅ **Spring Motion Animation** - Custom implementation without external libraries
- ✅ **Drag & Drop Functionality** - Mouse and touch gesture support
- ✅ **Manual Controls** - Button controls and keyboard navigation
- ✅ **Responsive Design** - Optimized for desktop and mobile devices

---

## 🚀 Live Demo

**[View Live Demo](https://react-bottom-sheet-dusky.vercel.app/)**

---

## 🛠️ Technology Stack

| Technology       | Version | Purpose                                         |
| ---------------- | ------- | ----------------------------------------------- |
| **Next.js**      | 15.3.4  | React framework with App Router                 |
| **React**        | 19.0.0  | JavaScript library for building user interfaces |
| **TypeScript**   | 5.0+    | Type-safe development                           |
| **Tailwind CSS** | 4.0+    | Utility-first styling                           |
| **Lucide React** | 0.523.0 | Modern icon library                             |

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** for version control

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/karthikks26/react-bottom-sheet.git
cd react-bottom-sheet-assignment

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run type-check  # TypeScript type checking
```

---

## 🏗️ Project Structure

```
react-bottom-sheet-assignment/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main demo page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── bottom-sheet.tsx     # Core BottomSheet component
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets and screenshots
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

---

## 🎮 Features & Usage

### Core Features

#### 1. **Multiple Snap Points**

- **Closed** (100%): Sheet hidden, only handle visible
- **Half-open** (50%): Partial content visible
- **Fully open** (10%): Complete content displayed

#### 2. **Comprehensive Interaction Support**

- **Drag & Drop**: Smooth mouse and touch support
- **Button Controls**: Manual snap point selection
- **Keyboard Navigation**: Arrow keys and Escape
- **Backdrop Click**: Click outside to close

### How to Use

#### Desktop Interaction

1. **Click** any restaurant card to open the bottom sheet
2. **Drag** the handle or content area to move between positions
3. **Use control buttons** for precise snap point selection
4. **Keyboard shortcuts**:
   - `↑` Arrow Up: Move to higher snap point
   - `↓` Arrow Down: Move to lower snap point
   - `Esc` Escape: Close bottom sheet

#### Mobile Interaction

1. **Tap** restaurant cards to trigger bottom sheet
2. **Swipe up/down** on handle or content to drag
3. **Release** to automatically snap to nearest position
4. **Tap backdrop** to close

### Visual Feedback

- **Drag Handle**: Visual feedback during interaction
- **Snap Point Indicators**: Current position dots on the right
- **Backdrop Opacity**: Shows sheet state
- **Button States**: Disabled when not applicable

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repository directly to the **Vercel dashboard** for automatic deployment.

### Other Platforms

- **Netlify**: `npm run build` → deploy `/out` folder
- **AWS Amplify**: Connect GitHub repository
- **GitHub Pages**: Configure static export (if needed)

---

## 📫 Contact

If you have any questions or feedback, feel free to reach out via [GitHub Issues](https://github.com/karthikks26/react-bottom-sheet/issues).
