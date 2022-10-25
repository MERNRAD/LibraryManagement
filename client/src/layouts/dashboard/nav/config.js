// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Books',
    path: '/books',
    icon: icon('ic_cart'),
  },
  {
    title: 'Authors',
    path: '/authors',
    icon: icon('ic_user'),
  },
  {
    title: 'Genres',
    path: '/dashboard/genres',
    icon: icon('ic_blog'),
  },
  {
    title: 'Borrowals',
    path: '/borrowals',
    icon: icon('ic_cart'),
  },
  {
    title: 'Users',
    path: '/users',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
