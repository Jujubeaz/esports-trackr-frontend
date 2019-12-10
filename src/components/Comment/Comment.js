import React from 'react';

import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import EditComment from '../EditComment/EditComment';

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
            <DeleteConfirmation 
              deleteModalOpen={props.deleteModalOpen} 
              handleDeleteModalOpen={props.handleDeleteModalOpen} 
              commentId={comment._id} 
              handleDelete={() => props.handleDelete(comment._id)}/>
        </div>
        <div>
            <Button className='edit' onClick={props.handleEditModalOpen} variant="outline-primary">Edit</Button>
            <EditComment 
              comment={comment}
              editModalOpen={props.editModalOpen}
              handleEditModalOpen={props.handleEditModalOpen}/>
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