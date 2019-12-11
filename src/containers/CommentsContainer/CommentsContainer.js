import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Comment from '../../components/Comment/Comment'

import './CommentsContainer.css'
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';
import EditComment from '../../components/EditComment/EditComment';

class CommentsContainer extends Component {

  state = {
    comments: [],
    body: '',
    editBody: '',
    deleteModalOpen: false,
    editModalOpen: false,
    selectedComment: {}
  };

  componentDidMount(){
    this.fetchComments();
  }

  filterComments = (commentsArr) => {
    return commentsArr.filter(comment => {return comment.match == this.props.matchId})
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fetchComments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/comments/all`)
      .then((res) => {
        const comments = this.filterComments(res.data.data);
        this.setState({
          comments: comments
        }, () => console.log(this.state.comments))
      })
      .catch(err => console.log(err))
  };

  handleCommentSubmit = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/comments/${this.props.match.params.matchId}/newComment`, this.state, {
      withCredentials: true,
    })
    .then((res) => {
      this.fetchComments();
      this.setState({
        body: ''
      })
    })
    .catch(err => console.log(err))
  };

  handleDeleteModalOpen = (comment) => {
    this.setState((prevState) => {
      return {
        selectedComment: comment,
        deleteModalOpen: !prevState.deleteModalOpen
      };
    });
  };

  handleDelete = (commentId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`)
      .then((res) => {
        console.log(commentId)
        this.handleDeleteModalOpen()
        const filterDeleted = this.state.comments.filter(comment => {return comment._id !== commentId})
        this.setState({
          comments: filterDeleted
        })
      })
      .catch(err => console.log(err));
  };

  handleEditModalOpen = (comment) => {
    const commentBody = comment.body;
    this.setState((prevState) => {
      return {
        editModalOpen: !prevState.editModalOpen,
        editBody: commentBody,
        selectedComment: comment
      };
    });
  };

  render() {
    return (
      <div className="row bootstrap snippets">
      <div className="col-md col-md-offset-2 col-sm-12">
        <div className="comment-wrapper">
          <div className="panel panel-info">
            <div className="panel-heading">
              Comments
            </div>
            <div className="panel-body">
              <textarea value={this.state.body} onChange={this.handleChange} name="body" className="form-control" placeholder="Write a comment..." rows="3"></textarea>
              <br />
              <button type="button" className="btn btn-info pull-right" onClick={this.handleCommentSubmit}>Post</button>
              <div className="clearfix"></div>
              <hr />
              {this.state.comments.length ?
              <>
              <Comment 
                comments={this.state.comments} 
                handleDeleteModalOpen={this.handleDeleteModalOpen} 
                deleteModalOpen={this.state.deleteModalOpen} 
                handleDelete={this.handleDelete}
                editModalOpen={this.state.editModalOpen}
                handleEditModalOpen={this.handleEditModalOpen}
                handleEdit={this.handleEdit}
                fetchComments={this.fetchComments}/>
              <DeleteConfirmation 
                deleteModalOpen={this.state.deleteModalOpen} 
                handleDeleteModalOpen={this.handleDeleteModalOpen} 
                handleDelete={() => this.handleDelete(this.state.selectedComment)}/>
              <EditComment 
                editBody={this.state.editBody}
                selectedComment={this.state.selectedComment}
                editModalOpen={this.state.editModalOpen}
                handleEditModalOpen={this.handleEditModalOpen}
                handleChange={this.handleChange}
                handleEdit={this.handleEdit}
                fetchComments={this.fetchComments}/>
              </> : <>
              No comments yet
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
};

export default withRouter(CommentsContainer);