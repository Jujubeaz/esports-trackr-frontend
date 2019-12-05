import React, { Component } from 'react';

import './Navbar.css';
import Signup from './Auth/Signup';
import Login from './Auth/Login';

class Navbar extends Component {
  state = {
    loginModalOpen: false,
    signupModalOpen: false,
  };

  handleLoginModalOpen = () => {
    this.setState((prevState) => {
      return {
        loginModalOpen: !prevState.loginModalOpen
      }
    });
  };

  handleSignupModalOpen = () => {
    this.setState((prevState) => {
      return {
        signupModalOpen: !prevState.signupModalOpen
      }
    });
  };

  // handleProfileRedirect = () => {
  //   const userId = localStorage.getItem('uid');
  //   this.props.history.push(`/users/${userId}`);
  // };

  render () {
    return (
      <>
        <nav className="navbar">
        {!this.props.currentUser ?
          <ul>
            <span className="navlink">
              <li>Home</li>
            </span>
            <span 
            className="navlink" 
            onClick={this.handleSignupModalOpen}>
              <li>Signup</li>
            </span>
            <span 
            className="navlink"
            onClick={this.handleLoginModalOpen}>
              <li>Login</li>
            </span>
          </ul>
          :
          <ul>
             <span className="navlink">
              <li>{this.props.currentUser}</li>
            </span>
            <span className="navlink" onClick={this.props.logout}>
              <li>Logout</li>
            </span>
          </ul>
        }
        </nav>
        <Signup 
          signupModalOpen={this.state.signupModalOpen}
          handleSignupModalOpen={this.handleSignupModalOpen}
          setCurrentUser={this.props.setCurrentUser} />
        <Login 
          loginModalOpen={this.state.loginModalOpen}
          handleLoginModalOpen={this.handleLoginModalOpen}
          setCurrentUser={this.props.setCurrentUser} />
      </>
    );
  };
};

export default Navbar;