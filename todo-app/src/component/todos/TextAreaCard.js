import React from 'react';

import './TextAreaCard.css';


// TODO : Auto Extend (vertical)

const TextAreaCard = (props) => {
  return (
    <div>
      <div className="textarea-card">
        <textarea 
          name="text-area-card"
          id="text-area-card"
          onChange={e =>props.setTodo(e.target.value)} 
          value={props.todo} 
          autoFocus> {props.todo}
        </textarea>
      </div>
      <button type="button" onClick={props.postTodos}>추가</button>
      <button type="button" onClick={props.changeCreateMode}>x</button>
    </div>
  )
};

export default TextAreaCard;