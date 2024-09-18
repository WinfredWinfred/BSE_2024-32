import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { domain } from './Domain'
import "../css/AvailableToDo.css"


const AvailableToDo = () => {
    const [todo, setTodo] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setrefresh] = useState(false)

    const fetchData = () => {
        const reqParams = {
            method : 'GET',
            credentials: 'omit'
        }
        fetch(`${domain}/todo`, reqParams)
        .then(res => {
            if(!res.ok){
                throw Error(res.statusText)
            }else{
                return res.json()
            }
        })
        .then(data => {
            setTodo(data)
            setLoading(false)
            setrefresh(false)
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }

    useEffect(()=>{
        fetchData()
    },[refresh])

    const handleUpdate = (item) => {
        const formData = new FormData()
        formData.append('id', item.id)
        formData.append('completed', true)
        const reqParams = {
            method : 'PUT',
            credentials: 'omit',
            body: formData
        }
        fetch(`${domain}/todo/${item.id}`, reqParams)
        .then(res => {
            if(!res.ok){
                throw Error(res.statusText)
            }else{
                return res.json()
            }
        })
        .then(data => {
            if(data){
                setrefresh(true)
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    return (
        <div className='available'>
            <h1>Available ToDo Items</h1>
            <div className='content'>
                {todo.length > 0 && todo.map(item => (
                    <div className='div' key={item.id}
                    style={{background: item.completed && 'gray'}}>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <input 
                            type='checkbox' 
                            disabled = {item.completed ? true : false}
                            checked = {item.completed ? true : false}
                            onClick={()=>handleUpdate(item)}
                            />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AvailableToDo