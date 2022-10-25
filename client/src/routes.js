import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import BlogPage from './pages/BlogPage';
import AuthorPage from './pages/AuthorPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import ProductsPage from './pages/ProductsPage';
import GenrePage from './pages/GenrePage';
import BorrowalsPage from './pages/BorrowalsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'authors', element: <AuthorPage /> },
        { path: 'books', element: <BooksPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'genres', element: <GenrePage /> },
        { path: 'borrowals', element: <BorrowalsPage /> },        
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
