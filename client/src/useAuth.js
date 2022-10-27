import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    if (data.isAdmin) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/books", { replace: true });
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const useAuth = () => useContext(AuthContext);
