import { useState } from 'react'
import Header from "/src/Header.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Account from './Pages/Account'
import Habits from '/src/Pages/Habits.jsx'
import Setting from '/src/Pages/Setting'
import Sidebar from '/src/components/Sidebar.jsx'

function App() {
  
  const [isOpen,setIsOpen] = useState(false);
  return (
  <>
  <Header/>
  <Router>
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
      <Routes>
        <Route path="/account" element={<Account/>} />
        <Route path="/" element={<Habits isOpen={isOpen} setIsOpen={setIsOpen}/>}/>
        <Route path="/setting" element={<Setting/>} />
      </Routes>
    </Sidebar>
  </Router>
  </>
  )
}

export default App
