
import { useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";

const Home = () => {
    let [ isDarkMode, setIsDarkMode ] = useState("false" || mode);
    let [icon, setIcon ] = useState(isDarkMode === "false"? "src/assets/images/icon-moon.svg" : "src/assets/images/icon-sun.svg");
    const [task, setTask] = useState('');
    let [addTask, setAddTask] = useState([] || storedTasks);
    let [tasksLeft, setTasksLeft] = useState(0);
    let [filterTasks, setFilterTasks] = useState("All");
    const [filteredTasks, setFilteredTasks] = useState(addTask);

     useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(addTask));
    }, [addTask]);

    const storedTasks = localStorage.getItem("tasks");
    useEffect(() => {
        if(storedTasks) {
            setAddTask(JSON.parse(storedTasks));
        }
    }, []);

    const handleChange = (e) => {
        setTask(e.target.value);
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            if(task.length !== 0 && task.trim(" ")){
                setAddTask([...addTask, {id: uuidv4(), todo: task, completed: false }]);
                setTask('');
            } 
        }
    }
    const deleteTask = (index) => {
        setAddTask(addTask.filter((_, i) => i !== index));
    }
    const handleCompletTask = (index) => {
        setAddTask(addTask.map((task) => {
            if(task.id === index){
                return {...task, completed: !task.completed};
            }
            return task;
        }));
    }
    const deleteCompletedTasks = () => {
        setAddTask(addTask.filter((task) => !task.completed));
    }

    useEffect(() => {
        const tasksLeftCount = addTask.filter((task) => !task.completed).length;
        setTasksLeft(tasksLeftCount);

    }, [addTask])

    const handleAll = () => setFilterTasks("All");
    const handleActive = () => setFilterTasks("Active");
    const handleCompleted = () => setFilterTasks("Completed");

    useEffect(() => {
        if(filterTasks === "Completed"){
            setFilteredTasks(addTask.filter((task) => task.completed));
        } else if(filterTasks === "Active"){
            setFilteredTasks(addTask.filter((task) => !task.completed));
        };

    }, [filterTasks, addTask]);

    const handleDarkBg = () => {
        isDarkMode === "false"? setIsDarkMode("true") : setIsDarkMode("false") && document.body.classList.remove('dark-bg');
        document.body.classList.add('dark-bg');
        localStorage.setItem('mode', isDarkMode);

    }
    useEffect(() => {
        if(isDarkMode === "false"){
            document.body.classList.remove('dark-bg');
            setIcon("src/assets/images/icon-moon.svg");
        } else {
            setIcon("src/assets/images/icon-sun.svg");
        }
    }, [isDarkMode])

    let mode = localStorage.getItem('mode', isDarkMode);
    useEffect(() => {
        if(mode === "true"){
            document.body.classList.remove('dark-bg');
            setIcon("src/assets/images/icon-moon.svg");
        } else {
            document.body.classList.add('dark-bg');
            setIcon("src/assets/images/icon-sun.svg");
        }
    }, [])

    return (
        <main className="flex items-center h-[100vh]">
            <div className={`bg-img m-auto flex flex-col items-center w-min ${mode === "false"? "dark-border dark-img" : "light-border light-img"}`}>
                <div className="bg-section">
                    <div className="flex justify-between px-5"><h1 className=" py-10 text-2xl tracking-[10px] ">TODO</h1>
                        <div className="h-min my-10"><img className="hover:cursor-pointer" onClick={handleDarkBg}  src={icon} alt="moon icon" /></div>
                    </div>
                    <div className="grid gap-5 justify-center">
                        <div className={`px-5 mx-auto h-10 w-90 bg-white rounded-sm sm:w-150 flex ${mode === "false"? "dark-card" : ""}`}>
                            <div className="flex items-center">
                            <input className="appearance-none w-5 h-5 border-gray-400 border-2 rounded-xl" type="checkbox" disabled />
                            </div>
                            <div className="flex items-center">
                            <input className={`px-3 h-5 pt-1 ${mode === "false"? "placeholder:text-white opacity-50 text-white" : "placeholder:text-gray-400 text-gray-400"}`} type="text" onKeyDownCapture={handleKeyDown} value={task} onChange={handleChange} placeholder="Create a new todo..." /> 
                            </div>
                        </div>
                        <div className={`flex flex-col mx-auto h-80 w-90 bg-white rounded-sm sm:w-150 sm:h-100 overflow-y-auto overflow-x-hidden ${mode === "false"? "dark-card" : ""}`}> 
                            <div>{(filterTasks === "All" ? addTask : filteredTasks).map((task, index) => 
                                (<div key={task.id} className={`border-1 px-5 mx-auto h-10 w-90 bg-white sm:w-150 flex ${mode === "false"? "dark-card border-gray-700" : "border-gray-200 border-r-transparent border-l-transparent"}`}>
                                    <div className="flex items-center">
                                        <input className = "hover-effect appearance-none w-5 h-5 border-gray-400 border-2 rounded-xl  hover:cursor-pointer checked-state"  type="checkbox" checked={task.completed} onClick={() => handleCompletTask(task.id)} />
                                    </div>
                                    <div className="flex items-center w-90 sm:w-150 justify-between">
                                        <p className={`px-3 h-5 ${mode === "false"? "opacity-50 text-white" : "text-gray-400"} ${task.completed ? "text-purple-300 line-through" : ""}`}>{task.todo}</p>             
                                        <img className="hover:cursor-pointer" onClick={() => deleteTask(index)} src="src/assets/images/icon-cross.svg" alt="cross icon" />               
                                    </div>
                                </div>)
                                )}      
                            </div>
                            <div className="text-gray-400 flex">
                            </div>
                            <div className={`border-2 sm:hidden text-gray-400 grid grid-cols-2 mt-auto w-90 opacity-60 h-12 p-3 ${mode === "false"? "border-gray-700" : " border-gray-200 border-r-transparent border-l-transparent"}`}>
                                    <div className="pl-5"><p>{tasksLeft} left</p></div>
                                    <div className="justify-self-end pr-5 "><button className="hover:cursor-pointer hover:text-blue-500" onClick={deleteCompletedTasks}>Clear Completed</button></div>
                            </div>
                            <div className={`border-2 hidden justify-center items-center p-3 h-12 bg-white rounded-sm sm:grid grid-cols-3 gap-0.5 text-gray-500 mt-auto opacity-60 ${mode === "false"? "dark-card border-gray-700" : " border-gray-200 border-r-transparent border-l-transparent"}`}>
                                <div className="opacity-60">
                                    <p>{tasksLeft} left</p>
                                </div>
                                <div className="flex gap-5">
                                    <div><button className={`hover:cursor-pointer hover:text-blue-500 ${filterTasks === "All" ? "text-blue-500" : ""}`} onClick={handleAll}>All</button></div>
                                    <div><button className={`hover:cursor-pointer hover:text-blue-500 ${filterTasks === "Active" ? "text-blue-500" : ""}`} onClick={handleActive}>Active</button></div> 
                                    <div><button className={`hover:cursor-pointer hover:text-blue-500 ${filterTasks === "Completed" ? "text-blue-500" : ""}`} onClick={handleCompleted}>Completed</button></div>
                                </div>
                                <div className="justify-self-end opacity-60">
                                    <button className="hover:cursor-pointer hover:text-blue-500" onClick={deleteCompletedTasks}>Clear Completed</button>
                                </div>
                            </div>
                        </div>
                        <div className={`flex justify-center items-center mx-auto w-90 h-10 bg-white rounded-sm sm:hidden gap-5 text-gray-700 ${mode === "false"? "dark-card" : ""}`}>
                            <div className="opacity-60">
                                <button className={`hover:cursor-pointer hover:text-blue-500 ${filterTasks === "All" ? "text-blue-500" : ""}`} onClick={handleAll}>All</button>
                            </div>
                            <div className="opacity-60">
                                <button className={`hover:cursor-pointer hover:text-blue-500 ${filterTasks === "Active" ? "text-blue-500" : ""}`} onClick={handleActive}>Active</button>
                            </div> 
                            <div className="opacity-60">
                                <button className={`hover:cursor-pointer hover:text-blue-500 ${filterTasks === "Completed" ? "text-blue-500" : ""}`} onClick={handleCompleted}>Completed</button>
                            </div>
                        </div>
                        <div className="flex justify-center pt-3">
                            <p className="text-gray-400">Drag and drop to reorder list</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home