
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { TodoFormType } from './../App';
import task from "../store/todo"
import Input from './../component/input/Input';
import Button from './../component/input/Button';
import TextArea from './../component/input/TextArea';

const TodoForm = observer(function() {

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
    
      function createTask(){
        if(toDoForm.email, toDoForm.username, toDoForm.task){
            const res = fetch("http://localhost:2000/task", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(toDoForm)
            })            
        }
        setToDoForm({
            username: "",
          email: "",
          task: "",
          done: false
        })
      }

    return ( 
        <>
            <div className="App">
                <h2>
                Создать задачу
                </h2>
                <Input selectName='username' value={toDoForm.username} title="Имя пользователя" hundleChange={changeForm}/>
                <Input selectName='email' value={toDoForm.email} title="email" type='email' hundleChange={changeForm}/>
                <TextArea selectName='task' value={toDoForm.task} title="Описание задачи" hundleChange={changeFormTextArea}/>
                <Button title="Сохранить" clickFunc={createTask}/>
                
            </div>
        </>
     );
})

export default TodoForm;