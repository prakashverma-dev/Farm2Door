# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Used Packages After Vite Project Create -

1. tailwind CSS
2. used google font name 'Outfit'
3. npm i react-router-dom ---> For Project Routing
4. npm i react-hot-toast --> FOr notification
5. We are using https://prebuiltui.com/components components in our project. -->


NOte : -

1) 
useEffect(() => {
  fetch("/api/products");
}, []);

Now the API runs or inside the useEffect, runs only once after the component mounts. mean Inside this will runs once whenever this component will be called. Unlike evertime runs of App.jsx code changes.


2) useEffect(() => {
  fetch("/api/products");
}, [category]);

Now the API runs at component loads or mount and whenver the same 'category' variable data will change at any component level then this means current 'Component will Re-render again i.e inside useEffect runs.'