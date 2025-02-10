import Center from '/src/assets/Center.png'
import Ring from'/src/assets/Ring.png'
function Header(){
    return(
    <header>
        <div className="logo">
            <img className="ring" src={Center}/>
            <img className="center" src={Ring}/>
        </div>
        <h1>StreakUp</h1>
    </header>
    )
}
export default Header