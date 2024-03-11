import {useEffect} from "react";
import {useState} from "react";
import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';

document.title = "TODO list";

function App() {
  const[tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  }, []);

  function addTask(name){
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }

  function updateTaskDone(taskIndex, newDone){
    setTasks(prev => {
       const newTasks = [...prev];
       newTasks[taskIndex].done = newDone;
       return newTasks;
    });
  }

  function removeTask(indexToRemove){
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage(){
    const percentage = numberComplete/numberTotal*100;
    if(numberTotal === 0){
      return 'Задач пока нет 💤'
    }
    if(percentage === 0){
      return 'Сделай хотя бы что-то 😐'
    }
    if(percentage === 100){
      return 'Просто супер 🔥'
    }
    return 'Продолжай в том же духе 😊'

  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} выполнено</h1>
      <h3>{getMessage()}</h3>
      <TaskForm onAdd={addTask}/>
      {tasks?.map((task, index) =>(
        <Task{...task} 
        onTrash={() => removeTask(index)}
        onToggle={done => updateTaskDone(index, done)}/>
      ))}
    </main>
  );
}

export default App;
