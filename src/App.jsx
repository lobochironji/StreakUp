import { useState } from 'react'
import Header from "C:/Programming/React/habit-tracker-app/src/Header.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import PageTwo from '/src/Pages/pageTwo.jsx'
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
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Habits isOpen={isOpen} setIsOpen={setIsOpen}/>} />
        <Route path="/pagetwo" element={<PageTwo/>} />
        <Route path="/setting" element={<Setting/>} />
      </Routes>
    </Sidebar>
  </Router>
  </>
  )
}

export default App
