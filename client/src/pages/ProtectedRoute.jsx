import PropTypes from 'prop-types'
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({user, children}) => {
  if (!user) {
    return <Navigate to="/landing" replace/>;
  }

  return children;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
}
