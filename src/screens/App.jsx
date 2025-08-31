import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser.js";
import axios from "axios";
import "./App.css";

const url = "http://localhost:3001";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const {user, signOut} = useUser();
  const navigate = useNavigate();

  const headers = user?.token 
  ? { headers: { Authorization: `Bearer ${user.token}` } }
    : undefined;

  useEffect(() => {
    if(!headers) return;
    axios.get(url + "/", headers)
      .then(res => setTasks(res.data))
      .catch(err => alert(err.response?.data?.error ?? err.message));
  }, [user?.token]);

  const addTask = async () => {
    const trimmedTask = task.trim();
    if(!trimmedTask) return;
    const newTask = {description: trimmedTask};

    try{
      const response = await axios.post(url+"/create", {task: newTask}, headers);
      setTasks(prev=>[...prev, response.data]);
      setTask("");
    } catch(err) {
      alert(err.response?.data?.error ?? err.message)
    }
  }

  const  deleteTask = async (deletedID) =>{
    try{
      await axios.delete(url+"/delete/"+ deletedID, headers);
      setTasks((prev) => prev.filter((item) => item.id !== deletedID));
    } catch(err) {
      alert(err.response?.data?.error ?? err.message)
    }
  }

  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <div id="container">
      <div>
        <h3>Todos</h3>
        <div>
          {!!user?.email && <span style={{ marginRight: 12 }}>{user.email}</span>}
          <button className="logout-button" type="button" onClick={handleLogout}>Log out</button>
        </div>
      </div>
      <form>
        <input
        placeholder="Add a new task"
        value={task}
        onChange={e=>setTask(e.target.value)}
        onKeyDown={e => {
          if(e.key === "Enter") {
            e.preventDefault()
            addTask()
          }
        }}
        ></input>
        <button type="button" onClick={()=>addTask()}>Submit</button>
      </form>
        <ul>
        {tasks.map(item => (
          <li key={item.id}>
            {item.description}
            <button className="delete-button" onClick={() => deleteTask(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>    
    </div>

  );
}
