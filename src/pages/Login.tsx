import Input from "../component/input/Input";
import { useState } from 'react';
import { ChangeEvent } from 'react';
import Button from "../component/input/Button";
import { useRoutes, useNavigate } from "react-router-dom";
import task from '../store/todo' 


function Login() {

    const navigate = useNavigate()
    const [ loginForm, setLoginForm ] = useState<{
        login: string;
        password: string
    }>({
        login: "",
        password: ""
    })

    function changeForm(e: ChangeEvent<HTMLInputElement>){
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    async function sendReq(){
        const res = await fetch("http://localhost:2000/user/login", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(loginForm)
        }).then(res => res.json())
        if(res.token){
            task.newAuth(res.token)
            navigate('/')

        }
    }

    return ( <>

        <div className="login">
            <div className="login_container">
                <h2 className="login_title">
                    Форма входа
                </h2>
                <Input value={loginForm.login} selectName="login" hundleChange={changeForm} title="Логин"/>
                <Input value={loginForm.password} selectName="password" hundleChange={changeForm} title="Пароль"/>
                <Button title="Войти" clickFunc={sendReq}/>
            </div>
        </div>

    </> );
}

export default Login;