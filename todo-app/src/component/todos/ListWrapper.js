import React, { useState, useEffect } from 'react';

import ListHeader from './ListHeader';
import TodoCardList from './TodoCardList';
import TextAreaCard from './TextAreaCard';

import './ListWrapper.css';
import method from '../../firebase/method';

const ListWrapper = () => {

    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState(null);
    const [createMode, setCreateMode] = useState(false);
    // TODO : spinner 
    const [spinner, setSpineer] = useState(null);

    //GET
    const getTodos = async () => {
        try {
            const result = await method.getTodos();
            setTodos(result);
            return;
        }catch(error){
            console.log(error);
            //POST home/posts/1/comment
            //redirect > home/posts/1
        }
    }
    //POST
    const postTodos = async (e) => {
        e.preventDefault();
        setCreateMode(!createMode);
        setSpineer(true);
        const sample = {
            content: todo,
            // create_at: false
        }
        //console.log(id); //undefined
        //const id = sample.id; // sample의 id 속성값
        //const {id} = sample; // sample의 속성 중 id 값 (디스트럭처링(구조를 분해)) 위 와 결과 같음 

        // const result = await Axios.post(url, sample);
        const result = await method.postTodos(sample);
        console.log(result)
        // const { data } = result //result의 속성 중 data를 디스트럭처링

        //여기서 Axios를 부르면 비효율적.. 왜? .. 그래서 setTodos를 사용.
        // todos.push(data);
        setTodos([...todos, result]) //주의점은 react가 지켜보고 있는 state가 바뀌어야 react가 그것을 감지하고 새로 render해줌.
        setTodo('');
        setSpineer(false);
    }

    //DELETE
    const deleteTodos = async (id) => {
        //실제 db에서 삭제
        await method.deleteTodos(id);
        //DOM
        // await Axios.delete(url + `/${id}`); //실제 DB에서 삭제되는 로직 추가 후 주석 처리
        //find helper method를 이용하여 배열에 접근
        const targetTodo = todos.find(el => el._id === id); //local에 있는 id이므로 _id로 적어야
        const idx = todos.indexOf(targetTodo);
        todos.splice(idx, 1); //실제 todos 바뀌었지만 react는 아직 감지 못함
        //우리가 잘라놓은 애를 감지할 수 있게 해줘야하므로 setTodos() 사용.
        setTodos([...todos]); //하지만 react setTodos를 그냥 사용하면 
        //todos.splice()함수가 pop 동작하는 애라 splice의 return값이 한 요소만 알려주므로 전체가 지워짐
        //그래서 바뀐 todos를 array로 뿌려줘야 해서 ... 구조할당
    }

    //Todo: 체크박스 onchange사용하기 위해
    //git flow feature 기능 test 
    const patchTodos = async (id, payload) => {
        const targetTodo = todos.find(el => el._id === id);
        const sample = {
            // content: '이것은 새로운 todo',
            completed : !targetTodo.completed
        }; //sample  객체는 true or false 값을 가짐
        const result = await method.patchTodos(id, sample);
        //id에 해당하는 값으로 pacth접근
        console.log(result);
        targetTodo.completed = !targetTodo.completed;
        setTodos([...todos]);
    }

    //
    const changeCreateMode = () => {
        setCreateMode(!createMode);
    };

    //이 함수 안에서는 asyn 하면 안됨.
    useEffect(() => {
        getTodos() //단 한번 동작이 되길 원하는 로직을 넣음.
        //hook rules
        // if() {

        // }
    }, []) //빈 배열로 넣고 한번만 알려줘야 함
    //빈배열에 todos를 부르면 getTodos를 부르고 그 안에서 setTodos를 부르는데 그걸 또 todos라 감지하고 계속 랜더 .. 재귀적 호출이 일어남.

    return (
        <div className="list-wrapper"> <ListHeader title="Bobby's Todo List" />
            {todos ? <TodoCardList todos={todos} patchCompleted={patchTodos} deleteTodos={deleteTodos} /> : <div>Spinner</div>}
            {createMode ? <TextAreaCard postTodos={postTodos} setTodo={setTodo} todo={todo} changeCreateMode={changeCreateMode} /> : <div className="add-button" onClick={changeCreateMode}> <p>+ Add another card</p> </div>}
            {!createMode && spinner ? <p>Spinner</p> : null}  
        </div>
    );
};

export default ListWrapper;