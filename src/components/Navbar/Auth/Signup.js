import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, this.state, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        this.props.setCurrentUser(res.data.data._id);
        this.props.handleSignupModalOpen();
      })
      .catch(err => console.log(err))
  };

  render() {
    return (
      <Modal show={this.props.signupModalOpen} onHide={this.props.handleSignupModalOpen}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="name" name="name" value={this.state.name} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input onChange={this.handleChange} className="form-control form-control-lg" type="email" id="email" name="email" value={this.state.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password" name="password" value={this.state.password} />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password2" name="password2" value={this.state.password2} />
          </div>
          <button className="btn btn-primary float-right" type="submit">Sign Up</button>
        </form>
      </Modal.Body>
    </Modal>
    )
  };
};

export default withRouter(Signup);
