import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import LibraryApp from './layouts/dashboard';
// 
import AuthorPage from './pages/AuthorPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404'; 
import BorrowalsPage from './pages/BorrowalsPage'; 
import BooksPage from './pages/BooksPage'; 
import DashboardAppPage from './pages/DashboardAppPage'; 
import UsersPage from './pages/UserPage'; 

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
        {path: 'books', element: <BooksPage/>},
        {path: 'borrowals', element: <BorrowalsPage/>},
        {path: 'genres', element: <AuthorPage/>},
        {path: 'users', element: <UsersPage/>},
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
