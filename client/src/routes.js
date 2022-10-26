import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import LibraryApp from './layouts/dashboard';
//
import AuthorPage from './pages/AuthorPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import BorrowalPage from './pages/BorrowalPage';
import BookPage from './pages/BookPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UsersPage from './pages/UserPage';
import GenrePage from "./pages/GenrePage";

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
        {path: 'books', element: <BookPage/>},
        {path: 'borrowals', element: <BorrowalPage/>},
        {path: 'genres', element: <GenrePage/>},
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
      element: <Navigate to="/dashboard" replace/>,
    },
  ]);

  return routes;
}
