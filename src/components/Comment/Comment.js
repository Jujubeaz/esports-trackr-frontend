import React from 'react';

import Button from 'react-bootstrap/Button';
import './Comment.css';

const Comment = (props) => {
  console.log(props)
  const comments = props.comments.map(comment => {
    
    return (
      <li key={comment._id}>
        <div>
          <strong>{comment.user.name}</strong>
          <p>{comment.body}</p>
        </div>
        {props.currentUser == comment.user._id ? 
        <div className="comment-buttons">
          <div className="comment-button">
              <Button className='remove' onClick={() => props.handleDeleteModalOpen(comment._id)} variant="outline-primary">Delete</Button>
          </div>
          <div className="comment-button">
              <Button className='edit' onClick={() => props.handleEditModalOpen(comment)} variant="outline-primary">Edit</Button>
          </div>
        </div>
        :
        <div></div>
        }
      </li>
    )
  })

  return (
    <ul>
      {comments}
    </ul>
  )
}

export default Comment;