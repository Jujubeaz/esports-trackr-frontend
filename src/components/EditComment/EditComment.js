import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

class EditPostDetails extends Component {

  state = {
    body: ''
  };


  componentDidMount() {
    console.log(this.props)
    this.setState({
      body: this.props.comment.body
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  saveChanges = (e) => {
    e.preventDefault();
    const commentId = this.props.comment._id;
    axios.put(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, this.state.body, {
      withCredentials: true,
    })
      .then((res) => {
        this.props.handleEditPostFormOpen();
      })
      .catch((err)=>console.log(err));
  }

  render () {
    return (
      <Modal show={this.props.editModalOpen} onHide={this.props.handleEditModalOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.saveChanges} >
            <div className="form-group">
              <textarea onChange={this.handleChange} className="form-control form-control-lg" type="text" id="body" name="body" value={this.state.body} />
            </div>
            <button className="btn btn-primary float-right" type="submit">Post</button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default EditPostDetails;