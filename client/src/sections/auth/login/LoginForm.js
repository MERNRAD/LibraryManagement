import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// @mui
import {IconButton, InputAdornment, Link, Stack, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// components
import axios from "axios";
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = () => {
    if (email === '' || password === '') {
      alert("Please enter email and password");
    } else {
      axios.post(`http://localhost:8080/api/auth/login`, {email, password}, {withCredentials: false})
        .then((response) => {
          // handle success
          if (response.status === 200) {
            navigate('/dashboard', {replace: true});
          }
          console.log(response.data);
        })
        .catch((error) => {
          // handle error
          alert(error.response.data.message);
          console.log(error);
        })
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} required onChange={
          (event) => {
            setEmail(event.target.value);
          }
        }/>

        <TextField
          name="password"
          required
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Typography variant="body2" sx={{mb: 5, mt: 3}} textAlign="center"
      >
        Don’t have an account? {''}
        <Link variant="subtitle2">Get started</Link>
      </Typography>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={loginUser}>
        Login
      </LoadingButton>
    </>
  );
}
