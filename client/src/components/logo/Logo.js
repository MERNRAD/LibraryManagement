import PropTypes from 'prop-types';
import {forwardRef} from 'react';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import {useTheme} from '@mui/material/styles';
import {Box, Link} from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({disabledLink = false, sx, ...other}, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'inline-flex',
        textAlign: 'center',
        margin: 'auto',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <img src="./libraryLogo.svg" alt="Logo" width="80%"/>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{display: 'contents'}}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
