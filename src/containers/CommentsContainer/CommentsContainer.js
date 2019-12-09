import React, {Component} from 'react';
import axios from 'axios';

import './CommentsContainer.css'

class CommentsContainer extends Component {

  state = {
    comments: [],
    content: '',
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
              <textarea value='' onChange={this.handleChange} name="content" className="form-control" placeholder="Write a comment..." rows="3"></textarea>
              <br />
              <button type="button" className="btn btn-info pull-right" onClick={this.handleCommentSubmit}>Post</button>
              <div className="clearfix"></div>
              <hr />
              {this.state.comments.length ?
              <>
              {/* <Comments comments={this.state.comments} /> */}
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

export default CommentsContainer;