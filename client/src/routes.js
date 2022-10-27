import { Navigate, useRoutes } from "react-router-dom";
import LibraryApp from "./layouts/dashboard";
import AuthorPage from "./pages/AuthorPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import BorrowalPage from "./pages/BorrowalPage";
import BookPage from "./pages/BookPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import UsersPage from "./pages/UserPage";
import GenrePage from "./pages/GenrePage";
import { useAuth } from "./useAuth";

// ----------------------------------------------------------------------

export default function Router() {
  const {user} = useAuth();
  const adminRoutes = useRoutes([
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
      element: <Navigate to="/404" replace/>,
    },
  ]);
  const memberRoutes = useRoutes([
    {
      path: '/',
      element: <LibraryApp/>,
      children: [
        {element: <Navigate to="/app"/>, index: true},
        {path: 'books', element: <BookPage/>},
        {path: 'authors', element: <AuthorPage/>},
        {path: 'genres', element: <GenrePage/>},
        {path: 'borrowals', element: <BorrowalPage/>},
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

  if(user == null || !user.isAdmin){
    return memberRoutes
  }
  return adminRoutes
}
