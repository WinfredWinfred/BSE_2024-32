import React, {useState, useEffect} from 'react'
import "../css/Dashboard.css"
import AddToDo from './AddToDo'
import AvailableToDo from './AvailableToDo'
import { useCurrentTheme } from './ThemeContext'

const Dashboard = () => {
    const [current, setCurrent] = useState('available')
    const {isDark, setIsDark}=useCurrentTheme()
    const handlePage = (page) => {
        setCurrent(page)
    }
    const handleTheme=()=>{
        setIsDark(!isDark)
    }
    return (
        <div className='dashboard'>
            <div className='actions' style={{background:isDark ? 'black':'white'}}>
                <button onClick={handleTheme}>{isDark ? 'Light Mode':'Dark Mode'}</button>
                <button onClick={()=>handlePage('add')}>Create TODO</button>
                <button onClick={()=>handlePage('available')}>Available TODO</button>
            </div>
            {current === 'add' ? <AddToDo /> : <AvailableToDo />}
            
        </div> 
    )
}

export default Dashboard