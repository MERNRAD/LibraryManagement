import {Helmet} from 'react-helmet-async';
// @mui
import {styled} from '@mui/material/styles';
import {Container, Typography} from '@mui/material';
// hooks
// components
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Logo from '../components/logo';
// sections
import {LoginForm} from '../sections/auth/login';
import {useAuth} from "../useAuth";

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({theme}) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();
  const {login} = useAuth();

  // if (user) {
  //   return <Navigate to="/" />;
  // }

  const loginUser = (email, password) => {
    if (email === '' || password === '') {
      alert("Please enter email and password");
    } else {
      axios.post(`http://localhost:8080/api/auth/login`, {email, password}, {withCredentials: false})
        .then((response) => {
          // handle success
          if (response.status === 200) {
            console.log(response.data);
            login(response.data.user);
          }
        })
        .catch((error) => {
          // handle error
          alert(error.response);
          console.log(error);
        })
    }
  };


  return (
    <>
      <Helmet>
        <title> Login | Library</title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" color="inherit" textAlign="center" gutterBottom paddingBottom={0}>
              Library System
            </Typography>
            <Typography variant="h3" textAlign="center" gutterBottom paddingBottom={3}>
              Sign in
            </Typography>

            <LoginForm loginUser={loginUser}/>

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
