import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import {signin, authenticate} from '../auth';
import SocialLogin from "./SocialLogin";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
    //Binding using Arrow functions no binding needed here
  }

  handleChange = e => {
    this.setState({ error: "" });
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true});

    const { email, password } = this.state;
    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
          this.setState({ error: data.error, loading: false });
      } else {
          // authenticate
          authenticate(data, () => {
              this.setState({ redirectToReferer: true });
          });
      }
    });
    //console.log(user);
  };

  signinForm = () => {
    const t = this.state;
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={this.handleChange}
            name="email"
            type="email"
            className="form-control"
            value={t.email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            className="form-control"
            value={t.password}
          />
        </div>

        <button
          onClick={this.handleSubmit}
          className="btn btn-raised btn-primary"
        >
          Submit
        </button>
      </form>
    )}

  render() {
    const t = this.state;

    if (t.redirectToReferer) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign In</h2>
        <hr />
          <SocialLogin />
        <hr />

        <div className="alert alert-danger" style={{ display: t.error ? "" : "none"}}>
          {t.error}
        </div>

        {t.loading ? <div className="jumbotron text-center">
          <h2>Loading.....</h2>
        </div> : ""}

        {this.signinForm()}
        <p>
          <Link to="/forgot-password" className="text-danger" className="btn btn-raised btn-warning">
          {" "}
          Forgot Password
          </Link>
        </p>
      </div>
    );
  }
}

export default Signin;

