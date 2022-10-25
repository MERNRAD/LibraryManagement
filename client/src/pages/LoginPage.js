import {Helmet} from 'react-helmet-async';
// @mui
import {styled} from '@mui/material/styles';
import {Container, Typography} from '@mui/material';
// hooks
// components
import Logo from '../components/logo';
// sections
import {LoginForm} from '../sections/auth/login';

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

            <LoginForm/>

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
