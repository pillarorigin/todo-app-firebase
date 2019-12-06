import React from 'react';

const LogIn = () => {

    const handleSubmit = () => {

    }

    //jsx 로그인 폼 작성
    return (
        <div className="row  justify-content-center">
            <div className="col-8">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" autoFocus/>
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="InputPassword">password</label>
                    <input type="password" className="form-control"/>
                    </div>

                    <button type="button" className="btn btn-primary"> Login </button>

                </form>
            </div>
        </div>
    )
}

export default LogIn;
