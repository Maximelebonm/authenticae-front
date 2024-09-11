import './toggleSwitch.css';
import { Sun, Moon } from 'lucide-react';


export const ToggleSwitch = (props) => {

    const setDarkMode = () =>{
        document.querySelector("body").setAttribute('data-theme','dark');
        localStorage.setItem("selectedTheme", "dark");
    }
    const setLightMode = () =>{
        document.querySelector("body").setAttribute('data-theme','light');
        localStorage.setItem("selectedTheme", "light");
    }

    const selectedTheme = localStorage.getItem("selectedTheme");

    if(selectedTheme === "dark"){
        setDarkMode()
    }

    const toggleTheme =(e) => {
        if(e.target.checked) setDarkMode();
        else setLightMode()
    }

    return (
    <div id='toggleSwitchContainer' className={props.className}>
        <label className='switch'>
            <input type="checkbox" onChange={toggleTheme} />
                { selectedTheme == 'light' ? <><Sun id="iconSwitch" /> theme</> : <><Moon id="iconSwitch" /> theme</>}
        </label>
    </div>
    )
}