import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage.tsx';
import PageName from './pages/PageName/PageName.tsx';
import DesignSystem from './pages/DesignSystem/DesignSystem.tsx';
import WebsiteLayout from './layouts/Website/WebsiteLayout.tsx';
import Services from '@/pages/Website/Services.tsx';
import Contact from '@/pages/Website/Contact.tsx';
import Login from '@/pages/Website/Login.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/services", element: <Services /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  {
    path: "/connexion",
    element: <Login />
  },
  {
    path: "/page",
    element: <PageName />
  },
  {
    path: "/designsystem",
    element: <DesignSystem />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
