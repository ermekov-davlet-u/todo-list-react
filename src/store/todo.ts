import { makeAutoObservable } from "mobx";
import { TodoFormType } from './../App';



class Task{
    token: string = ""
    tasks:TodoFormType[] = []
    constructor() {
        makeAutoObservable(this)
    }
    getTaskByDone(done: boolean){
        return this.tasks.filter(item => item.done == done)
    }
    getTaskByUserName( userName: string){
        return this.tasks.filter(item => item.username.includes(userName))
    }
    getTaskByUserNameAndDone( userName: string, done: boolean){
        return this.tasks.filter(item => item.username.includes(userName) && item.done == done)
    }
    getAllTasks(){
        return this.tasks
    }

    newTask(param: TodoFormType[]){
        this.tasks =  param
    }

    newAuth(param: string){
        this.token = param
    }

}

export default new Task()