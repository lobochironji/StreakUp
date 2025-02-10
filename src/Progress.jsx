import Calendar from "./Calendar"

export default function Progress(props){
    return(
        <section className="progress-bar-container">
            <div className="progress-bar">
                <h1>Habit : {props.habits[props.index].Name}</h1>
                <h2>Streak : {props.habits[props.index].Streak}</h2>
            </div>
            <Calendar dateCurrent={props.dateCurrent} habits={props.habits} index={props.index} setHabits={props.setHabits} time={props.time}/>
        </section>
    )
}