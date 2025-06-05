
import { useState, useEffect } from "react"

const Home = () => {
    let [ isDarkMode, setIsDarkMode ] = useState("false");
    const handleDarkBg = () => {
        isDarkMode === "false"? setIsDarkMode("true") : setIsDarkMode("false") && document.body.classList.remove('dark-bg');
        document.body.classList.add('dark-bg');
        localStorage.setItem('mode', isDarkMode);

    }
    useEffect(() => {
        isDarkMode === "false"? document.body.classList.remove('dark-bg') : null;

    }, [isDarkMode])

    let mode = localStorage.getItem('mode', isDarkMode);
    useEffect(() => {
        mode === "true"? document.body.classList.remove('dark-bg') : document.body.classList.add('dark-bg');

    }, [])

    return (
        <main className="bg-img m-auto flex flex-col items-center w-min">
            <div className="bg-section">
                <div className="flex justify-between px-5"><h1 className=" py-10 text-xl tracking-[10px] ">TODO</h1>
                
                <div className="h-min my-10"><img className="" src="src/assets/images/icon-moon.svg" alt="moon icon" /></div>
                </div>
                <div className="grid gap-5 justify-center ">
                <div className= "text-black px-5 mx-auto h-10 w-90 bg-white rounded-sm sm:w-110 flex">
                    <div className="flex items-center">
                    <input className="appearance-none w-5 h-5 border-gray-400 border-2 rounded-xl checked:bg-gradient-to-br checked:from-[#57ddff] checked:to-[#c058f3] checked:border-0" type="checkbox" id="checkbox" />
                    </div>
                    <div className="flex items-center">
                    <input className="px-3 h-min" type="text" placeholder="Create a new todo..." />
                    </div>
                </div>
                <div className="mx-auto h-80 w-90 bg-white rounded-sm sm:w-110 sm:h-90"></div>
                <div className="mx-auto w-90 h-10 bg-white rounded-sm sm:hidden "></div>
                </div>
            </div>
            <button onClick={handleDarkBg} className={`${mode === "false"? "text-white" : "text-black"}`}>dark</button>
        </main>
    )
}
export default Home