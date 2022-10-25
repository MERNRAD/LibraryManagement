import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import LibraryApp from './layouts/dashboard';
//
import BlogPage from './pages/BlogPage';
import AuthorPage from './pages/AuthorPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import GenrePage from './pages/GenrePage';
import BorrowalsPage from './pages/BorrowalsPage';

import BooksPage from './pages/BooksPage';
import UserPage from './pages/UserPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Page404 from "./pages/Page404";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LibraryApp/>,
      children: [

        {element: <Navigate to="/app"/>, index: true},
        {path: 'dashboard', element: <DashboardAppPage/>},
        {path: 'authors', element: <AuthorPage/>},
        {path: 'books', element: <ProductsPage/>},
        {path: 'borrowals', element: <ProductsPage/>},
        {path: 'genres', element: <AuthorPage/>},
        {path: 'users', element: <BlogPage/>},
      ],
    },
    {
      path: 'login',
      element: <LoginPage/>,
    },
    {
      path: '404',
      element: <Page404/>,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace/>,
    },
  ]);

  return routes;
}
