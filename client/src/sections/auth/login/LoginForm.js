import {useState} from 'react';
// @mui
import {IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm({loginUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

      {/* <Typography variant="body2" sx={{mb: 5, mt: 3}} textAlign="center" */}
      {/* > */}
      {/*  Don’t have an account? {''} */}
      {/*  <Link variant="subtitle2">Get started</Link> */}
      {/* </Typography> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained"
                     onClick={() => loginUser(email, password)}>
        Login
      </LoadingButton>
    </>
  );
}
