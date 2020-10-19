import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {signup} from '../auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
    //Binding using Arrow functions no binding needed here
  }

  handleChange = e => {
    this.setState({ error: "" });
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };

    signup(user)
    .then(data => {
      if (data.error) this.setState({error: data.error})
        else this.setState({      
          name: "",
          email: "",
          password: "",
          error: "",
          open: true
        })
    });
    //console.log(user);
  };

  signupForm = () => {
    const t = this.state;
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            className="form-control"
            value={t.name}
          />
        </div>
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

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign Up</h2>
        
        <div className="alert alert-danger" style={{ display: t.error ? "" : "none"}}>
          {t.error}
        </div>
        <div className="alert alert-info" style={{ display: t.open ? "" : "none"}}>
          New account is created -->. Please <Link to="/signin">Sign In</Link>
        </div>

        {this.signupForm()}
      </div>
    );
  }
}

export default Signup;
