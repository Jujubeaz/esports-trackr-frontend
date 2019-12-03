import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
  };

  setCurrentUser = (userId) => {
    this.setState({ surrentUser: userId });
    localStorage.setItem('uid', userId);
  };

  logout = () => {
    localStorage.removeItem('uid');
    axios.post(`${process.env.REACT_APP_BASE_API}/auth/logout`, { withCredentials: true })
      .then(res => {
        console.log(res);
        this.setState({ currentUser: null });
        this.props.history.push('/login');
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <h1>ali sux</h1>
      </div>
    );
  }
}

export default withRouter(App);
