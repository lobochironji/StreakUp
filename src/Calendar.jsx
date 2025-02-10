import { useState, useEffect } from "react";
export default function Calendar({dateCurrent,habits,index,time}){
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const dayTitle = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const year = time.getFullYear();
    const month = time.getMonth();
    const currentMonthName = monthNames[month];
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const habitCompletedDays = habits[index].completedDays;
    const days=[];
    const [currentMonth,setcurrentMonth] = useState(time.getMonth());
    useEffect(() => {
        const intervalId = setInterval(()=>{
            const nowMonth = new Date().getMonth();
            console.log(currentMonth);
            if (nowMonth === currentMonth) {
                console.log("sameMonth");
            } else {
                setcurrentMonth(nowMonth);
                setHabits(prevHabits => prevHabits.map(habit => ({...habit,completedDays: {}}))
                );                
            }
    },1000);
        return () => clearInterval(intervalId)
    },[currentMonth]);

    for (let i = 0; i < firstDayIndex; i++){
    days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++){
        days.push(i);
    }
    
    return (
        <div>
            <h2 style={{textAlign:'center'}}>
                {currentMonthName} {year}
            </h2>
            <div className="calendar-grid">
                {dayTitle.map((day) => (
                    <div key={day} className="calendar-cell-header">
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div key={day !== null ? `${day}-${month}-${year}` : index} className="calendar-cell" style={{backgroundColor: day && habitCompletedDays[day] ? "rgb(54,98,204)" : "rgb(50,50,50)"}}>
                        {day || ""}
                    </div>
                ))}
            </div>
        </div>
    );
}

