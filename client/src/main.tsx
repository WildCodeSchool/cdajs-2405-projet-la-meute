import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage.tsx';
import Layout from "./layouts/Layout.tsx";
import PageName from './pages/PageName/PageName.tsx';
import DesignSystem from './pages/DesignSystem/DesignSystem.tsx';
import WelcomePageLayout from './layouts/WelcomePage/WelcomePageLayout.tsx';
import Services from '@/pages/WelcomePage/Services.tsx';
import Contact from '@/pages/WelcomePage/Contact.tsx';
import { ApolloProvider } from "@apollo/client";
import client from "./graphQL/apolloClient.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePageLayout />,
    children: [
      {
        path: "/", element: <Homepage />
      },
      {
        path: "/services", element: <Services />
      },
      {
        path: "/contact", element: <Contact />
      },
    ],
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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApolloProvider client={client}>
		  <RouterProvider router={router} />
		</ApolloProvider>
	</StrictMode>,
);
