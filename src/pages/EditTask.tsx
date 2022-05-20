
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState, useEffect } from 'react';
import { TodoFormType } from './../App';
import task from "../store/todo"
import Input from './../component/input/Input';
import Button from './../component/input/Button';
import TextArea from './../component/input/TextArea';
import { useParams } from 'react-router-dom';
import TodoForm from './TodoForm';

const EditTask = observer(function() {

    const [toDoForm, setToDoForm] = useState<TodoFormType>({
        username: "",
        email: "",
        task: "",
        done: false
      })
    
      function changeForm(e: ChangeEvent<HTMLInputElement>){
        setToDoForm({...toDoForm, [e.target.name]: e.target.value})
      }

      function changeFormTextArea(e: ChangeEvent<HTMLTextAreaElement>){
        setToDoForm({...toDoForm, task: e.target.value})
      }
    
    async function updateTask(){
        if(toDoForm.email, toDoForm.username, toDoForm.task){
            const res = await fetch("http://localhost:2000/admin/task", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": task.token
                },
                body: JSON.stringify(toDoForm)
            }).then(res => res.json())   
            console.log(res);
                 
        }
      }
    const { id } = useParams()

    useEffect(() => {
        const a = task.tasks.find(item => item.id == id)
        if(a){
            setToDoForm(a)
        }
    }, [])

    return ( 
        <>
            <div className="App">
                <h2>
                    Редактировать задачу
                </h2>
                <Input readonly={true} selectName='username' value={toDoForm.username} title="Имя пользователя" hundleChange={changeForm}/>
                <Input selectName='email' readonly={true} value={toDoForm.email} title="email" type='email' hundleChange={changeForm}/>
                <TextArea selectName='task' value={toDoForm.task} title="Описание задачи" hundleChange={changeFormTextArea}/>
                <div className="input_title">
                    Выполнено
                </div>
                <input checked={toDoForm.done} type="checkbox"  onChange={(e: any) => {
                    setToDoForm({...toDoForm, done: e.target.checked})
                }}/>
                <Button title="Сохранить" clickFunc={updateTask}/>
                
            </div>
        </>
     );
})

export default EditTask;