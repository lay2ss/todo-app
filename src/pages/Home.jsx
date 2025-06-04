
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
        <main className="m-auto flex flex-col items-center border-amber-500 border-4">
            <div className="bg-section">
                <div className="flex justify-between px-5"><h1 className=" py-10 text-xl tracking-[10px] ">TODO</h1>
                <div className="h-min my-10"><img className="" src="src/assets/images/icon-moon.svg" alt="moon icon" /></div>
                </div>
                <input className= "mx-auto h-10 w-9/10 bg-white rounded-sm" type="text" />
            </div>
            <button onClick={handleDarkBg} className={`${mode === "false"? "text-white" : "text-black"}`}>dark</button>
        </main>
    )
}
export default Home