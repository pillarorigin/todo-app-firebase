// react가 제공하는 기본 component
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
// 사용자 정의 component
import ListWrapper from './todos/ListWrapper'
import SignUp from './accounts/SignUp';
import LogIn from './accounts/LogIn';
// 스타일 component

const App = () => {
  return (
    <div className="container">
      <div>
        {/* nav */}
        <BrowserRouter>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={LogIn} />
          <Route path='/todo' component={ListWrapper} />
        </BrowserRouter>
        {/* footer */}
      </div>
    </div>
  );
};

export default App;
