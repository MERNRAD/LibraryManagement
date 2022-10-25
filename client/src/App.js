// routes
import axios from "axios";
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import {StyledChart} from './components/chart';


export default function App() {
  const getUser = () => {
    axios.get(`http://localhost:8080/api/user`, {withCredentials: true})
      .then((response) => {
        // handle success
        console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Router />
    </ThemeProvider>
  );
}
