import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import ListHeader from './ListHeader';
import TodoCardList from './TodoCardList';
import TextAreaCard from './TextAreaCard';

import './ListWrapper.css';
import method from '../firebase/method';

const url = 'http://localhost:5000/todos';

const ListWrapper = () => {

    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState(null);
    const [createMode, setCreateMode] = useState(false);

    // UNIQ. key
    const UniqKey = () => {
        if (todos && todos.length) {
            return todos[todos.length - 1].id + 1;
        } else {
            return 0;
        };
    };

    //GET
    const getTodos = async () => {
        const result = await method.getTodos();
        console.log('todos 가져오기');
        // const result = await Axios.get(url);
        // result > status > 200일 때
        // const { data } = result;
        // setTodos(data);
        setTodos(result);
    }
    //POST
    const postTodos = async (e) => {
        e.preventDefault();
        console.log('todo 작성 시작');
        const sample = {
            //현재 todos의 길이 보다 하나 크게

            //TODO: UNIQ. key
            // id: todos.length + 1,
            id: UniqKey(),
            content: todo,
            completed: false
            // todo state
        }
        //console.log(id); //undefined
        //const id = sample.id; // sample의 id 속성값
        //const {id} = sample; // sample의 속성 중 id 값 (디스트럭처링(구조를 분해)) 위 와 결과 같음 

        // const result = await Axios.post(url, sample);
        await method.postTodos(sample);
        // const { data } = result //result의 속성 중 data를 디스트럭처링

        //여기서 Axios를 부르면 비효율적.. 왜? .. 그래서 setTodos를 사용.
        // console.log(todos);
        // todos.push(data);
        // console.log(todos);
        setTodos([...todos, sample]) //주의점은 react가 지켜보고 있는 state가 바뀌어야 react가 그것을 감지하고 새로 render해줌.
        // console.log(todos);
        setTodo('');
        setCreateMode(!createMode);
    }

    //DELETE
    const deleteTodos = async (id) => {
        //실제 db에서 삭제
        await method.getTodos(id);

        //DOM
        // await Axios.delete(url + `/${id}`); //실제 DB에서 삭제되는 로직 추가 후 주석 처리
        //find helper method를 이용하여 배열에 접근
        const targetTodo = todos.find(el => el.id === id);
        const idx = todos.indexOf(targetTodo);
        todos.splice(idx, 1); //실제 todos 바뀌었지만 react는 아직 감지 못함
        //우리가 잘라놓은 애를 감지할 수 있게 해줘야하므로 setTodos() 사용.
        setTodos([...todos]); //하지만 react setTodos를 그냥 사용하면 
        //todos.splice()함수가 pop 동작하는 애라 splice의 return값이 한 요소만 알려주므로 전체가 지워짐
        //그래서 바뀐 todos를 array로 뿌려줘야 해서 ... 구조할당
    }

    //Todo: 체크박스 onchange사용하기 위해 
    const patchCompleted = async (id) => {
        const targetTodo = todos.find(el => el.id === id);
        //id에 해당하는 값으로 pacth접근
        await Axios.patch(url + `/${id}`, { //데이터(completed) 넣을 자리
            // '!'을 사용해서 toggle 사용
            completed: !targetTodo.completed
        });
        //화면에서도 수정되게
        targetTodo.completed = !targetTodo.completed;
        setTodos([...todos]);
    }

    //
    const changeCreateMode = () => {
        setCreateMode(!createMode);
    };

    //이 함수 안에서는 asyn 하면 안됨.
    useEffect(() => {
        getTodos()
    }, []) //빈 배열로 넣고 한번만 알려줘야 함
    //빈배열에 todos를 부르면 getTodos를 부르고 그 안에서 setTodos를 부르는데 그걸 또 todos라 감지하고 계속 랜더 .. 재귀적 호출이 일어남.

    return (
        <div className="list-wrapper">
            <ListHeader title="Lorem Ipsum" />
            {todos ? <TodoCardList todos={todos} patchCompleted={patchCompleted} deleteTodos={deleteTodos} /> : <div>Spinner</div>}
            {createMode ? <TextAreaCard
                postTodos={postTodos}
                setTodo={setTodo}
                todo={todo}
                changeCreateMode={changeCreateMode} /> : <div className="add-button" onClick={changeCreateMode}>
                    <p>+ Add another card</p>
                </div>}
        </div>
    );
};

export default ListWrapper;