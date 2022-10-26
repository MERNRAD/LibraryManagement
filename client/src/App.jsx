import {Toaster} from "react-hot-toast";
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';

export default function App() {
  return (
    <ThemeProvider>
      <div><Toaster/></div>
      <ScrollToTop/>
      <Router/>
    </ThemeProvider>
  );
}
