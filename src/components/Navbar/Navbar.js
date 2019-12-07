import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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
            <Link to="/">
              <span className="navlink">
                <li>Home</li>
              </span>
            </Link>
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
            <Link to="/">
              <span className="navlink">
                <li>Home</li>
              </span>
            </Link>
             <span className="navlink">
              <li>Your Feed</li>
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

export default withRouter(Navbar);