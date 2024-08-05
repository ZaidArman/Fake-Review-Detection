// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("token"); // Check if the token exists

  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
