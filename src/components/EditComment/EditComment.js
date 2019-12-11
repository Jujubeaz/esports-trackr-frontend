import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

class EditComment extends Component {

  dummyComment = {}

  saveChanges = (e) => {
    e.preventDefault();
    console.log(this.props.editBody)
    const newComment = {
      body: this.props.editBody
    }
    axios.put(`${process.env.REACT_APP_API_URL}/comments/${this.props.selectedComment._id}`, newComment, {
      withCredentials: true,
    })
      .then((res) => {
        this.props.handleEditModalOpen(this.dummyComment);
        this.props.fetchComments();
      })
      .catch((err)=>console.log(err));
  };

  render () {
    return (
      <Modal show={this.props.editModalOpen} onHide={() => this.props.handleEditModalOpen(this.dummyComment)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.saveChanges} >
            <div className="form-group">
              <textarea onChange={this.props.handleChange} className="form-control form-control-lg" type="text" id="editBody" name="editBody" value={this.props.editBody} />
            </div>
            <button className="btn btn-primary float-right" type="submit">Post</button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default EditComment;