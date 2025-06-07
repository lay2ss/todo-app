
import { useState, useEffect, useRef } from "react";

const Home = () => {
    let [ isDarkMode, setIsDarkMode ] = useState("false" || mode);
    let [icon, setIcon ] = useState(isDarkMode === "false"? "src/assets/images/icon-moon.svg" : "src/assets/images/icon-sun.svg");
    const [task, setTask] = useState('');
    let [addTask, setAddTask] = useState([]);

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            if(task.length !== 0 && task.trim(" ")){
                setAddTask([...addTask, task]);
                setTask('');
            } 
        }
    }
    const deleteTask = (index) => {
        setAddTask(addTask.filter((_, i) => i !== index));
    }

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
        <main className={`bg-img m-auto flex flex-col items-center w-min ${mode === "false"? "dark-border dark-img" : "light-border light-img"}`}>
            <div className="bg-section">
                <div className="flex justify-between px-5"><h1 className=" py-10 text-2xl tracking-[10px] ">TODO</h1>
                    <div className="h-min my-10"><img onClick={handleDarkBg}  src={icon} alt="moon icon" /></div>
                </div>
                <div className="grid gap-5 justify-center">
                    <div className={`px-5 mx-auto h-10 w-90 bg-white rounded-sm sm:w-150 flex ${mode === "false"? "dark-card" : ""}`}>
                        <div className="flex items-center">
                        <input className="hover-effect appearance-none w-5 h-5 border-gray-400 border-2 rounded-xl checked-state" type="checkbox" />
                        </div>
                        <div className="flex items-center">
                        <input className={`px-3 h-5 pt-1 ${mode === "false"? "placeholder:text-white opacity-50 text-white" : "placeholder:text-gray-400 text-gray-400"}`} type="text" onKeyDownCapture={handleKeyDown} value={task} onChange={handleChange} placeholder="Create a new todo..." /> 
                        </div>
                    </div>
                    <div className={`flex flex-col mx-auto h-80 w-90 bg-white rounded-sm sm:w-150 sm:h-100 overflow-y-auto overflow-x-hidden ${mode === "false"? "dark-card" : ""}`}> 
                        <div>{addTask.map((task, index ) => 
                            (<div key={index} className={`border-1 px-5 mx-auto h-10 w-90 bg-white sm:w-150 flex ${mode === "false"? "dark-card border-gray-600" : "border-gray-200 border-r-transparent border-l-transparent"}`}>
                                <div className="flex items-center">
                                    <input className="hover-effect appearance-none w-5 h-5 border-gray-400 border-2 rounded-xl checked-state" type="checkbox" />
                                </div>
                                <div className="flex items-center w-90 sm:w-150 justify-between">
                                    <p className={`px-3 h-5 ${mode === "false"? "opacity-50 text-white" : "text-gray-400"}`}>{task} </p>             
                                    <img onClick={() => deleteTask(index)} src="src/assets/images/icon-cross.svg" alt="cross icon" />               
                                </div>
                            </div>)
                            )}      
                        </div>
                        <div className="text-gray-400 flex">
                        </div>
                        <div className={`border-2 sm:hidden text-gray-400 grid grid-cols-2 mt-auto w-90 opacity-60 h-12 p-3 ${mode === "false"? "border-gray-600" : " border-gray-200 border-r-transparent border-l-transparent"}`}>
                                <div className="pl-5"><p>5 left</p></div>
                                <div className="justify-self-end pr-5"><button>Clear Completed</button></div>
                        </div>
                        <div className={`border-2 hidden justify-center items-center p-3 h-12 bg-white rounded-sm sm:grid grid-cols-3 gap-0.5 text-gray-500 mt-auto opacity-60 ${mode === "false"? "dark-card border-gray-600" : " border-gray-200 border-r-transparent border-l-transparent"}`}>
                            <div className="opacity-60">
                                <p>5 left</p>
                            </div>
                            <div className="flex gap-5">
                                <div><button className="">All</button></div>
                                <div><button className="">Active</button></div> 
                                <div><button className="">Completed</button></div>
                            </div>
                            <div className="justify-self-end opacity-60">
                                <button className="">Clear Completed</button>
                            </div>
                        </div>
                    </div>
                    <div className={`flex justify-center items-center mx-auto w-90 h-10 bg-white rounded-sm sm:hidden gap-5 text-gray-600 ${mode === "false"? "dark-card" : ""}`}>
                        <div className="opacity-60">
                            <button className="">All</button>
                        </div>
                        <div className="opacity-60">
                            <button className="">Active</button>
                        </div> 
                        <div className="opacity-60">
                            <button className="">Completed</button>
                        </div>
                    </div>
                    <div className="flex justify-center pt-3">
                        <p className="text-gray-400">Drag and drop to reorder list</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Home