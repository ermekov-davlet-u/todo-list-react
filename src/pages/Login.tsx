import Input from "../component/input/Input";
import { useState } from 'react';
import { ChangeEvent } from 'react';
import Button from "../component/input/Button";
import { useRoutes, useNavigate } from "react-router-dom";
import task from '../store/todo' 


function Login() {
    const [ regis, setRegis ] = useState<boolean>(false)
    const navigate = useNavigate()
    const [ loginForm, setLoginForm ] = useState<{
        login: string;
        password: string;
        username?: string
    }>({
        login: "",
        password: "",
        username: ''
    })

    function changeForm(e: ChangeEvent<HTMLInputElement>){
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    async function sendReq(){
        if(regis){
            if(loginForm.login && loginForm.username && loginForm.password){
                const res = await fetch("http://localhost:2000/user/register", {
                    method: "Post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode: "cors",
                    body: JSON.stringify(loginForm)
                }).then(res => res.json())
                if(res){
                    console.log(res)
                    setRegis(false)
                }
            }
        }else{
            if(loginForm.login && loginForm.username && loginForm.password){
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
        }
    }
    function hundleRegis(){
        setRegis( !regis )
    }

    return ( <>

        <div className="login">
            <div className="login_container">
                <h2 className="login_title">
                    Форма входа
                </h2>
                <Input value={loginForm.login} selectName="login" hundleChange={changeForm} title="Логин"/>
                {
                    regis? 
                    <Input value={loginForm.username} selectName="username" hundleChange={changeForm} title="Имя пользователя"/>
                    :
                    ""
                }
                <Input value={loginForm.password} selectName="password" hundleChange={changeForm} title="Пароль"/>
                <Button title="Войти" clickFunc={sendReq}/>

                <div className="login_register" onClick={hundleRegis}>
                    {
                        !regis?
                        "Зарегистрироваться"
                        : 
                        "Уже есть аккаунт"
                    }
                </div>

            </div>
        </div>

    </> );
}

export default Login;