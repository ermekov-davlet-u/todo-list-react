    
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import task from "../store/todo"
import ListItem from './../component/list/TodoList';
import Input from './../component/input/Input';
import { ChangeEvent } from 'react';
    
    const TodoList = observer(function() {
        const [ count, setCount ] = useState<number>(0)
        const [ pages, setPages ] = useState<number>(1)
        const [filterForm, setFilterForm] = useState<{done?: boolean, userName?: string}>({
            done: false,
            userName: ""
        })
        useEffect(() => {
            getTasks()
          }, [])
        
        const getTasks = async () => {
        const res = await fetch("http://localhost:2000/task-done", {
            method: "Post",
            headers: {
            "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({})
            }).then(res => res.json())
            task.newTask(res)
            if(res.length >3){
                setPages(Math.ceil(res.length / 3))
                
            }
        }
        function listShow(num: number, filter:{done?: boolean, userName?: string}){
            let newTaskList: any[] = [];
            if(typeof filter.done == 'undefined' && !filter.userName){
                newTaskList = task.getAllTasks().filter((item, index) => {
                    if(index >= num && index < num + 3){
                            return true
                    }
                    return false
                })
            }else if(filter.userName && typeof  filter.done == 'undefined'){
                newTaskList =task.getTaskByUserName(filter.userName).filter((item, index) => {
                    if(index >= num && index < num + 3){
                            return true
                    }
                    return false
                })
            }else if( !filter.userName && typeof  filter.done !== 'undefined' ){
                newTaskList = task.getTaskByDone(filter.done).filter((item, index) => {
                    
                    if(index >= num && index < num + 3){
                        return true
                    }
                    return false
                })
            } else if( filter.userName && typeof  filter.done !== 'undefined' ){
                newTaskList = task.getTaskByUserNameAndDone(filter.userName, filter.done).filter((item, index) => {
                    if(index >= num && index < num + 3){
                            return true
                    }
                    return false
                })
            }

            
            
            if(newTaskList.length){
                return newTaskList.map((item, index) => {
                    if(task.token){
                        return(
                            <Link to={"/admin/task/edit/" + item.id}>
                                <ListItem index={++index} username={item.username} email={item.email} done={item.done} task={item.task}/>
                            </Link>
                        )
                    }
                    return(
                        <ListItem index={++index} username={item.username} email={item.email} done={item.done} task={item.task}/>
                    )
                })
            }
        }
        function changeForm(e: ChangeEvent<HTMLInputElement>){
            setFilterForm({...filterForm, [e.target.name]: e.target.value})
          }
    

    return ( 
        <>
            <div className="App">
                <div className="list">
                    <div className="filter">
                        <div className="list_titles_all list_title" onClick={() => {
                            setFilterForm({})
                        }}>
                            Все
                        </div>
                        <div className="list_titles_done list_title">
                            Выполненные 
                            <input checked={filterForm.done} type="checkbox"  onChange={(e: any) => {
                                setFilterForm({...filterForm, done: e.target.checked})
                            }}/>
                        </div>
                        <div className="list_titles_user list_title">
                            <Input selectName='userName' value={filterForm.userName} title="По имени прользователя" hundleChange={changeForm}/>
                        </div>
                    </div>
                    <div className="list_titles">
                        <div className="list_titles_user list_title">
                        Имя пользователя
                        </div>
                        <div className="list_titles_email list_title">
                        email
                        </div>
                        <div className="list_titles_task list_title">
                        Задача
                        </div>
                        <div className="list_titles_done list_title">
                        Выполнено
                        </div>
                    </div>
                    {
                        listShow(count, filterForm)
                    }
                </div>
                {
                    pages > 1? 
                    <div className="list_btns">
                        <button className="list_btn" onClick={() => {
                            if(pages > 1 && count > 0){
                                setCount(count - 3)
                            }
                        }}>{"<"}</button>
                        <button className="list_btn" onClick={() => {
                            if((pages * 3 - 3) > count ){
                                setCount(count + 3)
                            }
                        }}>{">"}</button>
                    </div>
                    : 
                    ""
                }
            </div>
        </>
     );
})

export default TodoList;