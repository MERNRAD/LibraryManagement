import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import { useAuth } from "../../hooks/useAuth";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function LibraryApp() {
  const [open, setOpen] = useState(false);
  const {user} = useAuth();

  if (!user) {
    return <Navigate to={'/login'} replace/>
  }

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)}/>
      <Nav openNav={open} onCloseNav={() => setOpen(false)}/>
      <Main>
        <Outlet/>
      </Main>
    </StyledRoot>
  );
}
