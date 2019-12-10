import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Comment from '../../components/Comment/Comment'

import './CommentsContainer.css'

class CommentsContainer extends Component {

  state = {
    comments: [],
    body: '',
    deleteModalOpen: false,
    editModalOpen: false
  };

  componentDidMount(){
    this.fetchComments();
  }

  filterComments = (commentsArr) => {
    return commentsArr.filter(comment => {return comment.match == this.props.matchId})
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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

  handleDeleteModalOpen = () => {
    this.setState((prevState) => {
      return {
        deleteModalOpen: !prevState.deleteModalOpen
      };
    });
  };

  handleDelete = (commentId) => {
    console.log(commentId)
    axios.delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`)
      .then((res) => {
        this.handleDeleteModalOpen()
        const filterDeleted = this.state.comments.filter(comment => {return comment._id !== commentId})
        this.setState({
          comments: filterDeleted
        })
      })
      .catch(err => console.log(err));
  };

  handleEditModalOpen = () => {
    this.setState((prevState) => {
      return {
        editModalOpen: !prevState.editModalOpen
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
                handleEditModalOpen={this.handleEditModalOpen}/>
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