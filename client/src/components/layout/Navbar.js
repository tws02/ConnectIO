import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="#!">
          Users
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles"> Users</Link>
      </li>
      <li>
        <Link to="/register"> Register</Link>
      </li>
      <li>
        <Link to="/login"> Login</Link>
      </li>
    </ul>
  );

  if (isAuthenticated)
    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fa fa-connectdevelop"></i> ConnectIO
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProp, { logout })(Navbar);
