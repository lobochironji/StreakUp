import Center from '/src/assets/center.png'
import Ring from'/src/assets/ring.png'
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