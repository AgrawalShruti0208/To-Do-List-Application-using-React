import { useState } from 'react' //importing useState Hook from react
import { ToDoList } from './ToDoList'; //importing ToDoList component 
import "./style.css"

export function Header() { //Header component 

  //STATE VARIABLES used in this component:
    // task State variable to store the text entered by user in input field, Initial value:empty string
    const [task,setTask] = useState("");

    //to track and store the unique id stored for last record inserted in List, Initial value: Initial value: 1
    const [lastId, setLastId] = useState(1);

    // to store the Data List of tasks, Initial value: empty array
    const [Task_data,setTaskData] = useState([]);

  // Function to add task in the list
  function handleAddTask(){
    // If the entered input text is not a empty string then,
    if(task !=""){

      // increase the value of last entered unique id by 1 using state variable method setLastId
      setLastId(lastId+1);

      // creating task object with all the details of task inside it, as in React every data is in form of ARRAY OF OBJECTS
      const taskObj = {
        id: lastId, //id to have a unique key for the system to track the component for every object
        taskId: lastId, //custom key for editing,deleting operations
        task: task, //task added by user
        completeStatus: false //to maintain status of completion of task
      };

      // creating a new list and copying all the Task_data List inside it as we should not manipulate state variable directly
      const list = Task_data;
      list.push(taskObj); //pushing the newly created task object inside newly created list

      setTask(""); //setting input field to empty,as Task Added successfully in the List
      setTaskData(list);//updating the List state variable to display added task to the user
      }
    
  }
  return(
    <>
      {/* Header div containing HEADING of application and form to add tasks in the list */}
      <div className='Header'> 
        <h1 className='Heading'>To-Do List Application</h1>
        {/* form to add tasks in the list, preventing form to refresh on clicking submit by using event.preventDefault() */}
        <form className='addFunctionality' onSubmit={(e)=>e.preventDefault()}>

          {/*for storing the text entered inside input in state variable,used setTask method with event "onChange" and getting its value by targetting the event */}
          {/* Controlling the input field by using value attribute to clear the input field on submit button click */}
          <input type="text" className='taskInput' value={task} placeholder='Enter Task to be Added to the List' onChange={(e)=>setTask(e.target.value)} />

          {/* Add task submit button to call handleAddTask function when user click on it or press enter in input field */}
          <button type='submit' className='submitBtn' onClick={handleAddTask}>Add Task to the List</button>

        </form>
      </div>

      {/* Rendering Component ToDoList and passing the List of Tasks to it using props */}
      <ToDoList taskData = {Task_data}/>
    </>
  )
  
}