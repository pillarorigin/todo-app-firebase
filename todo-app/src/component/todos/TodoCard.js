import React, { useState } from 'react';

import './TodoCard.css';

const TodoCard = (props) => {
  const [hover, setHover] = useState(false);
  
  const isEnter = () => {
    setHover(true);
  };
  const isLeave = () => {
    setHover(false);
  };

  return (
    <div className="card" onMouseEnter={isEnter} onMouseLeave={isLeave}>
      <p className="card-content">{props.content}</p>
      <span className={`edit-content ${hover? 'edit-content-hovered':''}`}>edit</span>
    </div>
  );
};

export default TodoCard;