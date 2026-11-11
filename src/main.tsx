import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')!;
const app = <BrowserRouter><App /></BrowserRouter>;

// Production reuses the build-time HTML; Vite development starts with an empty root.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
