import { useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editFlag, setEditFlag] = useState(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addNewTask() {
    if (newTask.trim() == "") {
      return;
    }

    if (editFlag != null) {
      setTasks(tasks.map((task, idx) => (idx == editFlag ? newTask : task)));
      setEditFlag(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setNewTask("");
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function editTask(index) {
    //deleteTask(index);
    setEditFlag(index);
    setNewTask(tasks[index]);
  }

  function moveTaskUp(index) {
    const updatedTasks = [...tasks];
    if (index > 0) {
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    const updatedTasks = [...tasks];
    if (index < tasks.length - 1) {
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="bg-gray-200 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/*Title of ToDo */}
      <div className="flex items-center  justify-center mt-7 gap-2">
        {/* <img src={todo_icon} className='w-8' /> */}
        <p className="text-2xl bg-stone-800 rounded-3xl p-1">📃</p>
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      {/*Add Todo Input */}
      <div className="flex mt-4 justify-center">
        <input
          type="text"
          id=""
          placeholder="Add your task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="mx-2 rounded-2xl" onClick={addNewTask}>
          {editFlag == null ? "➕" : "✅"}
        </button>
      </div>
      <div className="tasks"></div>
      <ol className="mt-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between bg-stone-800 text-white mt-2 p-2 rounded-xl"
          >
            <span>{task}</span>
            <div>
              <button className="mx-1" onClick={() => editTask(index)}>
                ✏️
              </button>
              <button className="mx-1" onClick={() => moveTaskUp(index)}>
                ⬆️
              </button>
              <button className="mx-1" onClick={() => moveTaskDown(index)}>
                ⬇️
              </button>
              <button className="mx-1" onClick={() => deleteTask(index)}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
