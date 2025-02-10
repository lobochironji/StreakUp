import React from "react";
import { useRef,useEffect } from "react";
import Modal from "../components/Modal";
import DropDown from "../components/DropDown";
import { FiPlus} from "react-icons/fi";
import { CiTextAlignCenter } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import Progress from "../Progress";

export default function Habits({isOpen,setIsOpen}){
    const [habits,setHabits] = React.useState([]);
    const [showModal,setShowModal] = React.useState(false);
    const [warning, setWarning] = React.useState("");
    const [activeDropDown, setActiveDropDown] = React.useState(null);
    const [viewProgressBar,setViewProgressBar] = React.useState(false);
    const [selectedIndex,setSelectedIndex] = React.useState(null);
    const dropDownRef = useRef(null);
    const [time,setTime] = React.useState(new Date());
    const [dateCurrent,setDateCurrent] = React.useState(time.getDate())
    useEffect(() => {
        const intervalId = setInterval(()=>{
            const nowDate = new Date().getDate();
            if (nowDate === dateCurrent) {
            } else {
                setDateCurrent(nowDate);
                setTime(new Date())
                setHabits(prevHabits => prevHabits.map(habit => ({...habit,isDone: false,isSkipped: false, Streak: habit.StrictMode && !habit.isDone ? 0 : habit.Streak}))
                );                
            }
    },1000);
        return () => clearInterval(intervalId)
    },[dateCurrent]);
    function showPopupModal(){
        setShowModal(true);
}

function toggleDropDownMenu(index) {
    setActiveDropDown(activeDropDown === index ? null : index);
}
function addHabit(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newHabit = formData.get("habitName").trim();
    const strictModeString = formData.get("strictMode");
    const strictMode = (strictModeString === "true")
    const habitRepeat = formData.get("habitRepeat");
    const habitFrequency = formData.get("habitFrequency");
    const habitTime = formData.get("habitTime");
    const habitDuration = formData.get("habitDuration");
    if (newHabit === "") {
        setWarning("Habit field cannot be empty!");
    } else if (habits.some(habit => habit.Name === newHabit)) {
        setWarning("This habit is already in the list!");
    } else {
        setHabits(prevHab => [...prevHab, {Name:newHabit,StrictMode:strictMode,Repeat:habitRepeat,Frequency:habitFrequency,Time: habitTime, Duration: habitDuration,isDone: false, isSkipped: false, Streak: 0, completedDays:{}}]);
        setWarning("");
        setShowModal(false);
        event.currentTarget.reset();
    }
}

console.log(habits);
useEffect(() => {
    document.addEventListener("mousedown", ClickOutside);
    function ClickOutside(event) {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setActiveDropDown(null);
        }
    }
    return () => document.removeEventListener("mousedown", ClickOutside);
}, []);

function completeHabit(index){
    setHabits((prevHabits) => prevHabits.map((habit, i) => i === index ? { ...habit, isDone:true, isSkipped:false, Streak: habit.Streak + 1, completedDays:{...habit.completedDays,[dateCurrent]: true}} : habit));
}

function uncompleteHabit(index){
    setHabits(prevHabits => prevHabits.map((habit, i) => i === index ? { ...habit, isDone:false, isSkipped:false, Streak: habit.Streak === 0 ? habit.Streak=0 : habit.Streak-1, completedDays:{...habit.completedDays,[dateCurrent]: false}} : habit));
}

function skipHabit(index){
    setHabits( prevHabits => prevHabits.map((habit,i) => i === index ? {...habit, isSkipped:true, isDone: false} : habit ))
}

function unskipHabit(index){
    setHabits( prevHabits => prevHabits.map((habit,i) => i === index ? {...habit, isSkipped:false,isDone:false} : habit ))
}

function viewProgress(index){
    setViewProgressBar(true);
    setSelectedIndex(index);
}

const habitList = habits.map((habit,index) =>
    <section key={habit.Name} className= "habit-list">
    <li className={habit.isDone ? "habit-list-done" : habit.isSkipped ? "habit-list-is-skipped" : "habit-list-not-done"}>
        {habit.Name}
    </li>
        <div>
            <button className="habit-list-button" onClick={() => toggleDropDownMenu(index)}>
                <BsThreeDotsVertical />
            </button>
            {activeDropDown === index && 
            <div ref={dropDownRef}>
            <DropDown skipHabit={skipHabit} unskipHabit={unskipHabit} completeHabit={completeHabit} uncompleteHabit={uncompleteHabit} index={index} habits={habits} viewProgress={viewProgress}/>
            </div>  
        }
        </div>
    </section>
)

return(
    <main className="habit-main">
        <div className={isOpen ? "habit-main-open" : "habit-main-close"} >
            <div>
                <div className="habit-main-top">
                    <h2>Habits</h2>
                    <button onClick={showPopupModal}className="add-habit-button"><FiPlus style={{fontSize:'19px'}}/>Add Habit</button>
                </div>
                {habitList}
            </div>
            {showModal && <Modal setShowModal={setShowModal} addHabit={addHabit} warning={warning} setWarning={setWarning} setHabits={setHabits}/>}
        </div>
        <div>
        {viewProgressBar && <Progress habits={habits} setHabits={setHabits} index={selectedIndex} dateCurrent={dateCurrent} time={time}/>}
        </div>
    </main>
) 
}