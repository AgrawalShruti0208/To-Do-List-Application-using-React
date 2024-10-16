// To-Do Item:This component is build for every task display
import { useState } from "react";//importing useState Hook
import './style.css' //importing css to style components

export function ToDoItem(props){
    // state variable to store the individual task object passed by Parent Component
    const [item,setItem] = useState(props.taskDetails);

    //Inside Child component event handlers, invoking the PARENT Component function using props and passing current task's taskId inside it
    function handleDeleteTask(){
        // PARENT FUNCTION to Delete Task
        props.DeleteTask(item.taskId)
    }

    function handleEditTask(){
        // PARENT FUNCTION to Edit Task
        props.EditTask(item.taskId);
    }

    function handleMarkCompleted(){
        // PARENT FUNCTION to Mark Complete the task
        props.MarkTaskCompleted(item.taskId);
    }

    return(
        <div className="Task">
            {/* Display Each Task with a checkbox to Mark complete and buttons to edit and delete task */}
            
            {/* Adding style class based on condition that if complete status of task is TRUE, then style it */}
            <h2 className={item.completeStatus ? 'strikeText' : ''}>{item.task}</h2>
            <div className="actions">
                {/* Input type checkbox calling function when user interacts with it and to display tick/untick used checked attribute with value of the task property */}
                <input className="checkStatus" type="checkbox" onChange={handleMarkCompleted} checked={item.completeStatus}/>

                {/* Button to Delete and Edit Task and calling respective functions on user click */}
                <div className="btn">
                    <button onClick={handleDeleteTask}>Delete Task</button>
                    <img src="/delete.png" height='30px' width='30px' />
                </div>
                <div className="btn">
                    <button onClick={handleEditTask}>Edit Task</button>
                    <img src="/edit.png" height='30px' width='30px' />
                </div>

            </div>
            
            
        </div>
    )
}