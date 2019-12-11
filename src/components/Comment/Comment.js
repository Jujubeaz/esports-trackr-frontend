import React from 'react';

import Button from 'react-bootstrap/Button';
import './Comment.css';

const Comment = (props) => {
  const comments = props.comments.map(comment => {
    // console.log(comment._id)
    return (
      <li key={comment._id}>
        <div>
          <span>
            <small>{comment.createdAt}</small>
          </span>
          <strong>{comment.user.name}</strong>
          <p>{comment.body}</p>
        </div>
        <div>
            <Button className='remove' onClick={() => props.handleDeleteModalOpen(comment._id)} variant="outline-primary">Delete</Button>
        </div>
        <div>
            <Button className='edit' onClick={() => props.handleEditModalOpen(comment)} variant="outline-primary">Edit</Button>
        </div>
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