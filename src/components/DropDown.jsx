
export default function DropDown(props){
    const habitElement = props.habits[props.index];
        return(
        <div className="drop-down-menu">
            <div className="drop-down-menu-content">
            <button onClick={() => habitElement.isDone ? props.uncompleteHabit(props.index) : props.completeHabit(props.index)} disabled={habitElement.isSkipped}>{habitElement.isDone ? "Undo" : "Done"}</button>
            {habitElement.StrictMode ? null : <button onClick ={() => {habitElement.isSkipped ? props.unskipHabit(props.index): props.skipHabit(props.index)}} disabled={habitElement.isDone}>{habitElement.isSkipped ? "Unskip" : "Skip"}</button>}            
            <button>Edit</button>
            <button onClick={() => {props.viewProgress(props.index)}}>View Progress</button>
            </div>
        </div>
    )
}