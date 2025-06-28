# 📄 PDF Viewer App with Highlight & Search

A modern React-based PDF viewer application that allows you to:
- Upload and preview PDF files
- Open PDF in a modal popup
- Search text across the document
- Highlight all matching terms dynamically

✨ Built with `react-pdf`, Tailwind CSS, and modern React hooks.

---

## 🚀 Features

- 📤 Drag-and-drop PDF upload
- 🖼️ Preview the first page in a card
- 🔍 Search with live text highlighting
- 📚 Page navigation controls
- 💡 Custom highlight using `<mark>`
- 🧼 Clean modal viewer with responsive layout

---

## 📸 Demo

![demo-gif](https://your-demo-link-or-screenshot.png)

> Optional: You can deploy the app with [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and link here.

---

## 🛠️ Tech Stack

- React 18+
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- Tailwind CSS
- JavaScript (ES6+)
- PDF.js Worker

---

## 🧪 Getting Started

### Installation

```bash
git clone https://github.com/yourusername/pdf-viewer-app.git
cd pdf-viewer-app
npm install


## Steps to create your own  concurrent vite and electron project
# React + Vite
This stack contains full out template code written by Merit Mohammed 

Using React + Vite and installing electron in this three steps with the help of tailwindcss

Step 1 ( Installing vite )
- npm create vite@latest . --template react

Step 2 [ Installing Electron ]
- npm install electron --save-dev

Step 3 [ Installing Tailwind and configuring tailwind with vite ]
- npm install tailwindcss @tailwindcss/vite

Step 4 [ Configuring vite.config.js ]
- Add import tailwindcss from '@tailwindcss/vite'
- Add this in the plugin  tailwindcss(),

Step 5 [ To run on vite server on electron ]
- npm install --save-dev concurrently wait-on electron

Step 6 [ Adding the scripts in the package.json ]
-  "scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "electron": "electron .",
  "dev:all": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\""
}

Step 7 
- npm run dev:all

