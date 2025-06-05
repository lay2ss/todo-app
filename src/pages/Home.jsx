
import { useState, useEffect } from "react"

const Home = () => {
    let [ isDarkMode, setIsDarkMode ] = useState("false" || mode);
    let [icon, setIcon ] = useState(isDarkMode === "false"? "src/assets/images/icon-moon.svg" : "src/assets/images/icon-sun.svg");
    const handleDarkBg = () => {
        isDarkMode === "false"? setIsDarkMode("true") : setIsDarkMode("false") && document.body.classList.remove('dark-bg');
        document.body.classList.add('dark-bg');
        localStorage.setItem('mode', isDarkMode);

    }
    useEffect(() => {
        isDarkMode === "false"? document.body.classList.remove('dark-bg') : null;
        isDarkMode === "false"? setIcon("src/assets/images/icon-moon.svg") : setIcon("src/assets/images/icon-sun.svg");

    }, [isDarkMode])

    let mode = localStorage.getItem('mode', isDarkMode);
    useEffect(() => {
        mode === "true"? document.body.classList.remove('dark-bg') : document.body.classList.add('dark-bg');
        mode === "true"? setIcon("src/assets/images/icon-moon.svg") : setIcon("src/assets/images/icon-sun.svg");

    }, [])

    return (
        <main className="bg-img m-auto flex flex-col items-center w-min">
            <div className="bg-section">
                <div className="flex justify-between px-5"><h1 className=" py-10 text-2xl tracking-[10px] ">TODO</h1>
                    <div className="h-min my-10"><img onClick={handleDarkBg} className={`${mode === "false"? "text-white" : "text-black"}`} src={icon} alt="moon icon" /></div>
                </div>
                <div className="grid gap-5 justify-center">
                    <div className={`px-5 mx-auto h-10 w-90 bg-white rounded-sm sm:w-150 flex ${mode === "false"? "dark-card" : ""}`}>
                    {/* <div className= "text-black px-5 mx-auto h-10 w-90 bg-white rounded-sm sm:w-150 flex"> */}
                        <div className="flex items-center">
                        <input className="appearance-none w-5 h-5 border-gray-400 border-2 rounded-xl checked-state" type="checkbox" id="checkbox" />
                        </div>
                        <div className="flex items-center">
                        <input className={`px-3 h-5 pt-1  ${mode === "false"? "text-white" : "text-black"}`} type="text" placeholder="Create a new todo..." />
                        </div>
                    </div>
                    <div className={`flex mx-auto h-80 w-90 bg-white rounded-sm sm:w-150 sm:h-100 ${mode === "false"? "dark-card" : ""}`}>
                    {/* <div className="flex mx-auto h-80 w-90 bg-white rounded-sm sm:w-150 sm:h-100"> */}
                        <div className="sm:hidden text-gray-500 grid grid-cols-2 self-end w-90 opacity-60 h-10">
                                <div className="pl-5"><p>5 left</p></div>
                                <div className="justify-self-end pr-5"><button>Clear Completed</button></div>
                        </div>
                        <div className={`hidden justify-center items-center mx-auto h-10 bg-white rounded-sm sm:grid grid-cols-3 gap-0.5 text-gray-500 self-end opacity-60 ${mode === "false"? "dark-card" : ""}`}>
                        {/* <div className="hidden justify-center items-center mx-auto h-10 bg-white rounded-sm sm:grid grid-cols-3 gap-0.5 text-gray-500 self-end opacity-60"> */}
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
                    {/* <div className="flex justify-center items-center mx-auto w-90 h-10 bg-white rounded-sm sm:hidden gap-5 text-gray-600"> */}
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