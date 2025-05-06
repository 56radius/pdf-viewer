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