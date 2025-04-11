import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './home/page.tsx';
import Layout from './components/Layout.tsx';
import GetStartedPage from './get-started/GetStartedPage.tsx';

const addLayout = (page: React.ReactNode) => {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: addLayout(<App/>),
    // errorElement: <NotFoundPage />,
  },
  {
    path: "/get-started",
    element: <GetStartedPage />,
  },
  {
    path: "/home",
    element: addLayout(<MainPage />),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);