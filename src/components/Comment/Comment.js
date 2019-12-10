import React from 'react';

import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';

import Button from 'react-bootstrap/Button';
import './Comment.css';

const Comment = (props) => {
  const comments = props.comments.map(comment => {
    return (
      <li>
        <div>
          <span>
            <small>{comment.createdAt}</small>
          </span>
          <strong>{comment.user.name}</strong>
          <p>{comment.body}</p>
        </div>
        <div>
            <Button className='remove' onClick={props.handleDeleteModalOpen} variant="outline-primary">Delete</Button>
            <DeleteConfirmation deleteModalOpen={props.deleteModalOpen} handleDeleteModalOpen={props.handleDeleteModalOpen} />
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