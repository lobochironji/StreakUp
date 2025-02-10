import { IoClose } from "react-icons/io5"
import { useState,useRef,useEffect} from "react";
import { IoMdArrowDropdown } from "react-icons/io";


export default function Modal(props){
    const [repeatDropDown,setRepeatDropDown] = useState(false);
    const [toggleButton,setToggleButton] = useState(false);
    const dropdownref = useRef(null);
    const [repeatTextValue,setRepeatTextValue] = useState("");
    function closePopupModal(){
        props.setShowModal(false);
        props.setWarning(false);
    }
    
function RepeatDropDown(){
    return(
        <div className="repeat-drop-down">
            <div className="repeat-drop-down-content">
            <button onClick={() => setRepeatTextValue("Daily")} type="button">Daily</button>
            <button onClick={() => setRepeatTextValue("Monthly")} type="button">Monthly</button>
            </div>
        </div>
    )
}

useEffect(() => {
    document.addEventListener("mousedown",clickOutside);
    function clickOutside(event){
        if(dropdownref.current && !dropdownref.current.contains(event.target)){
            setRepeatDropDown(null);
        }
    }
    return () => document.removeEventListener("mousedown",clickOutside);
},[]);

return(
    <div className="modal-background" >
        <div>
            <div className="modal-popup">
                <div className="modal-popup-header">
                <h1>Add new habit</h1>
                <button  onClick={closePopupModal} style={{background:'none', border:'none', fontSize:'30px', color:'rgb(248,248,248)'}}><IoClose/></button>
                </div>
                <form onSubmit={props.addHabit}>
                    <div className="habit-input">
                        <div className="habit-input-11">
                            <p>Name</p>
                            <input name="habitName" type="text" onKeyDown={(event) => event.key === "Enter" && event.preventDefault()}></input>
                            {props.warning && <p className="warning">{props.warning}</p>}   
                        </div>
                        <div className="habit-input-12">
                            <p>Strict Mode</p>
                            <button type="button" className= {toggleButton ? "toggle-btn-on":"toggle-btn-off"} onClick={() => setToggleButton(!toggleButton)}>
                                <input readOnly hidden value={toggleButton} name="strictMode"></input>
                                <div className="circle"></div>
                            </button>
                        </div>
                        <div className="habit-input-13">
                            <p>Repeat</p>
                            <input name="habitRepeat" onClick={()=>setRepeatDropDown(true)} type="textbox" readOnly onKeyDown={(event) => event.key === "Enter" && event.preventDefault()} value={repeatTextValue}></input>
                            {repeatDropDown && 
                            <div ref={dropdownref}>
                            <RepeatDropDown/>
                            </div>}
                        </div>
                        <div className="habit-input-21">
                            <div className="habit-input-21a">
                                <p>Frequency</p>
                                <input name="habitFrequency" type="text-box" onKeyDown={(event) => event.key === "Enter" && event.preventDefault()}></input>
                            </div>
                            <div className="habit-input-21b">
                                <p>Time</p>
                                <input name="habitTime" type="time" onKeyDown={(event) => event.key === "Enter" && event.preventDefault()}></input>
                            </div>
                        </div>
                        <div className="habit-input-22">
                            <p>Duration</p>
                            <input name="habitDuration" type="date" onKeyDown={(event) => event.key === "Enter" && event.preventDefault()}></input>
                        </div>
                    </div>
                    <div className="habit-input-buttons">
                        <button type="button" onClick={closePopupModal}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}