import React from 'react';

import TodoCard from './TodoCard';

import './TodoCardList.css';

const TodoCardList = (props) => {
  return (
    <div className="card-list">
      {props.todos.map(el => {
        return (
          <div key={el._id}>
            <TodoCard content={el.content}/>
            <input type="checkbox" onChange={() => {props.patchCompleted(el._id)}} checked={el.completed}/>
            <button onClick={() => {props.deleteTodos(el._id)}}>X</button>
          </div>
        )})}
    </div>
  );
};

export default TodoCardList;