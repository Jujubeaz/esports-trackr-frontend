import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, 
      this.state, {
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data)
          this.props.setCurrentUser(res.data.data);
          this.props.history.push(`/`);
          this.props.handleLoginModalOpen();
        })
        .catch ((err) => console.log(err));
  };

  render() {
    return (
      <Modal show={this.props.loginModalOpen} onHide={this.props.handleLoginModalOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="email" name="email" value={this.state.email} required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password" name="password" value={this.state.password} required/>
            </div>
            <button className="btn btn-primary float-right" type="submit">Login</button>
          </form>
        </Modal.Body>
      </Modal>
    )
  };
};

export default withRouter(Login);