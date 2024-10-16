import { ToDoItem } from "./ToDoItem"; //importing child component ToDoItem
import { useState} from "react"; //importing useState Hook from react

export function ToDoList(props){
    //using one state variable to store List of tasks passed by Parent App Component using props, initial value: Same list passed 
    //Now, it is independent of other components, any changes inside this component, will be stored inside this Task_data
    const [Task_data,setTaskData] = useState(props.taskData);

    // deleteTask function to delete the task whose unique taskId is passed by the child component
    function deleteTask(key){

        // confirm dialog box to ensure that user wants to delete the task
        let confirmDelete = confirm("Are you sure you want to delete this item?");

        // If user confirms deletion, i.e. IT RETURNS TRUE, Then start the process of deletion
        if(confirmDelete){
            // copying value of state variable List
            let list = Task_data;
        
            // using FILTER HOf, to have the list of all the tasks except the one user wants to delete
            let filteredList = list.filter((task)=>{
                // add only those tasks to filteredList whose taskId does not matches with the current task 
                return task.taskId !== key;
            })

            // update the List not containing current list inside state variable to re-render the list component after deletion
            setTaskData(filteredList);
        }
         
    }

    // EDIT Task function called by child component and passed its unique taskId
    function editTask(key){
        // copying the value of state variable
        let list = Task_data;
        
        // Applying map() Hof to update the List
        //NOTE: To manipulate a particular obj inside List of objects, you have to traverse the List, using HOF functions
        //You cannot access the object using index and update the state variable
        let updatedList = list.map((item)=>{
            // If any task's id matches with key of current task
            if(item.taskId ==key){
                // open a prompt dialog box to ask user to make edit in the task text by passing task in the prompt and store the EDITED TEXT IN VARIABLE
                let editedTask = prompt("Edit the task:",item.task);
                if(editedTask != null && editedTask.trim() !== ''){
                    // If user clicks cancel, prompt returns null, as we don't want null value we are putting its condition
                    //If user submits empty prompt or enter white spaces in input, we don't want such value so ignoring it with condition
                    // If after validating, it is a valid value, updating the task text to the input user entered
                    item.task = editedTask;
                }
                
            }
            //return all the tasks to the updatedlist including the edited Task
            return item
        });
        
        //At last, update the state variable storing all the Tasks so that it re-renders the component to display the change to the user
        setTaskData(updatedList);   
        
    }

    // FUNCTION TO MARK TASKS STATUS COMPLETE:called from child component with a unique taskId
    function markComplete(key){
        // copying state variable
        let list = Task_data;
        
        // Updating the status of completion of the current task when user either checks/unchecks the checkbox by using map()
        let updatedList = list.map((item)=>{
            // If task's taskId matches with key
            if(item.taskId ==key){
                // Reverse the status from TRUE to False or vice-versa
                item.completeStatus = !item.completeStatus
            }
            // return all the tasks to updatedList variable
            return item
        });
        
        // update the List and re-render the component
        setTaskData(updatedList); 
    }

    // Parent component rendering all the Task Objects as a separate component using map() function
    return(
        <div className="ToDoList">
            {/* Returning individual components with a unique key from TASK list */}
            {/* Props passed to each task component:
                    1.taskDetails: Task object consisting all the properties
                    //Passing all the functions to child component as this functions needed to declare here as they require manipulation in complete list of tasks
                    2. DeleteTask: passing reference of delete function to call this parent function from its child component
                    3. EditTask: to edit the task existing in the list
                    4. MarkTaskCompleted: to change the status of completion inside task obj when user marks checkbox
             */}
           {Task_data.map((task)=>{
                return <ToDoItem key = {task.id} taskDetails = {task} DeleteTask = {deleteTask} EditTask = {editTask} MarkTaskCompleted ={markComplete}/>
           })}
        </div>
    )
}