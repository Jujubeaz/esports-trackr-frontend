import React from 'react';

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