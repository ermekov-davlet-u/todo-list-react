import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import TodoForm from "./pages/TodoForm";
import TodoList from './pages/TodoList';
import Login from './pages/Login';
import { observer } from 'mobx-react-lite';
import task from "./store/todo"
import EditTask from './pages/EditTask';

export interface TodoFormType{
  id?: number
  username: string;
  email: string;
  task: string;
  done: boolean;
  index?: number
}

const App = observer(() => {


  return (
    <>
      <Router>
      <ul>
        <li>
          <Link to="/login">
            Войти от имени администратора
          </Link>
        </li>
        <li>
          <Link to="/form">
            Зарегистрировать задачу
          </Link>
        </li>
        <li>
          <Link to="/">
            Список задач
          </Link>
        </li>
      </ul>    
      {
        task.token? <h3 style={{marginLeft: "48px"}}> Вы вошли от имени администратора </h3> : ""
      }    
        <Routes>
          <Route path="/form" element={<TodoForm />}>

          </Route>
          <Route path="/login" element={<Login />}>

          </Route>
          <Route path="/" element={<TodoList />}>

          </Route>

          {
            task.token? <Route path="/admin/task/edit/:id" element={<EditTask />}>

            </Route> : ""
          }

        </Routes>
      </Router>
    </>
  );
})

export default App;
