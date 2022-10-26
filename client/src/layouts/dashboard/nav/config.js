import {FiBookOpen, FiCheckCircle, FiHome, FiList, FiLock, FiUsers} from "react-icons/fi";

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FiHome/>,
  },
  {
    title: 'Books',
    path: '/books',
    icon: <FiBookOpen/>,
  },
  {
    title: 'Authors',
    path: '/authors',
    icon: <FiUsers/>,
  },
  {
    title: 'Genres',
    path: '/genres',
    icon: <FiList/>,
  },
  {
    title: 'Borrowals',
    path: '/borrowals',
    icon: <FiCheckCircle/>,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FiLock/>,
  },
];

export default navConfig;
