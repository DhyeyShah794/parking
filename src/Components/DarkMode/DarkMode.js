import React, { useEffect } from "react";
import ContrastIcon from '@mui/icons-material/Contrast';
import Brightness5TwoToneIcon from '@mui/icons-material/Brightness5TwoTone';
import Themelogo from '../../Images/theme.png'
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
        localStorage.setItem("selectedTheme", "dark")
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
        localStorage.setItem("selectedTheme", "light")
    }

    useEffect(() => {
        const selectedTheme = localStorage.getItem("selectedTheme")
        if (selectedTheme === "dark") {
            setDarkMode();
        }
    }, []);

    const toggleTheme = () => {
        const selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === "dark") {
            setLightMode();
        } else {
            setDarkMode();
        }
    };

    return (
        <div className='dark_mode' onClick={toggleTheme}>
            <img src={Themelogo} alt="Brightness5TwoToneIcon" style={{ width: '30px', height: '30px' }} />   
        </div>
    );
};

export default DarkMode;





// import React from "react";
// import { ReactComponent as Sun } from "./Sun.svg";
// import { ReactComponent as Moon } from "./Moon.svg";
// import ContrastIcon from '@mui/icons-material/Contrast';
// import "./DarkMode.css";

// const DarkMode = () => {
//     const setDarkMode = () => {
//         document.querySelector("body").setAttribute('data-theme', 'dark')
//         localStorage.setItem("selectedTheme", "dark")
//     }
//     const setLightMode = () => {
//         document.querySelector("body").setAttribute('data-theme', 'light')
//         localStorage.setItem("selectedTheme", "light")
//     }

//     const selectedTheme = localStorage.getItem("selectedTheme")
//     if (selectedTheme === "dark") {
//         setDarkMode();
//     }

//     const toggleTheme = e => {
//         if (e.target.checked) setDarkMode();
//         else setLightMode();
//       };

//     return (
//         <div className='dark_mode'>
//             <input
//                 className='dark_mode_input'
//                 type='checkbox'
//                 id='darkmode-toggle'
//                 onChange={toggleTheme}
//                 defaultChecked={selectedTheme === "dark"}
//             />
//             <label className='dark_mode_label' for='darkmode-toggle'>
//                 <Sun />
//                 <Moon />
//             </label>
//         </div>
//     );
// };

// export default DarkMode;
