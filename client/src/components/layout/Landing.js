import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ auth: { isAuthenticated, loading } }) => {
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  const authLinks = (
    <Link to="/dashboard" className="btn btn-primary">
      Dashboard
    </Link>
  );
  const guestLinks = (
    <Fragment>
      <Link to="/register" className="btn btn-primary">
        Sign Up
      </Link>
      <Link to="/login" className="btn btn-light">
        Login
      </Link>
    </Fragment>
  );
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">ConnectIO</h1>
          <p className="lead">Create your own profile, connect with others</p>
          <div className="buttons">
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
