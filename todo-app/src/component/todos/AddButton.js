import React from 'react';


const AddButton = (props) => {
    // console.log(props.todo);
    return (
        <form onSubmit={props.postTodos}>
            <input type="text" onChange={e=>props.setTodo(e.target.value)} value={props.todo} />
            <button type="submit">등록</button>
        </form>
    )
}

export default AddButton;