import React from 'react';
import PropTypes from 'prop-types';

import './register.css';
import AuthenticationRoute from '../components/authentication_route/authentication-route';

export default class Register extends AuthenticationRoute {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };

    this.register = props.register;
    this.goToLogin = props.goToLogin;
  }

  async registerSubmit() {
    try {
      let cleanUsername = '';
      let cleanPassword = '';

      try {
        cleanUsername = this.sanitizeLogin(this.state.username, 'username', 6, 32);
        cleanPassword = this.sanitizeLogin(this.state.password, 'password', 8, 18);
      } catch (err) {
        document.getElementById('error-text').innerHTML = err.message;
      }

      if (cleanUsername !== '' && cleanPassword !== '') {
        if (this.state.password === this.state.confirmPassword) {
          await this.userApi.addUser(cleanUsername, cleanPassword);
        } else {
          document.getElementById('error-text').innerHTML = 'Password and Confirm Password did not match.';
        }
      }
    } catch (err) {
      document.getElementById('error-text').innerHTML = 'Something went wrong';
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <img id="background-img" src={this.backgroundImg} alt="Icy River"></img>
        <div id="register-div">
          <label id="title">Test Website</label>
          <br />
          <br />

          <label>Username:</label>
          <input id="username" type="text" className="float-right" onChange={(event) => this.handleChange(event)}></input>
          <br />
          <br />

          <label>Password:</label>
          <input id="password" type="password" className="float-right" onChange={(event) => this.handleChange(event)}></input>
          <br />
          <br />

          <div id="confirm-password-div">
            <label >Confirm Password:</label>
            <input id="confirm-password" type="password" className="float-right" onChange={(event) => this.handleChange(event)}></input>
            <br className="clear"/>
            <br />
          </div>

          <input id="submit-button" type="button" className="float-right" value="Submit" onClick={() => this.registerSubmit()}></input>
          <input id="login-button" type="button" className="float-left" value="Login" onClick={this.goToLogin}></input>
          <br />
          <br />

          <p id="error-text"></p>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  match: PropTypes.object,
  register: PropTypes.func,
  goToLogin: PropTypes.func
};