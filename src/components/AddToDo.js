import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { domain } from './Domain'
import "../css/AddToDo.css"

const AddToDo = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const data = {
        name: "",
        description: ""
    }
    const [todoData, setTodoData] = useState(data)

    const handleInputChange = (event) => {
        const {name, value } = event.target
        setTodoData({
            ...todoData,
            [name] : value}
        )
    }

    const handleToDo = (event) => {
        event.preventDefault()
        const formData = new FormData()
        for(let key in todoData){
            if(todoData[key] === ''){
                setError(`${key} is required`)
                setTimeout(()=>setError(''),3000)
                return
            }else{
                formData.append(key, todoData[key])
            }
        }
        setError('')
        setLoading(true)
        //create post request using the fetch api
        const reqParams = {
            method : 'POST',
            credentials: 'omit',
            body : formData
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
            console.log(data)
            setError(`${data['name']} added successfully`)
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }
    return (
        <div className='todo'>
            <form onSubmit={handleToDo}>
                <h1>Add ToDo Item</h1>
                {error !== '' && <p>{error}</p>}

                <label>Name</label>
                <input type='text' 
                    placeholder='name' 
                    name='name'
                    value={todoData.name}
                    onChange={handleInputChange} />
                <label>Description</label>
                <textarea 
                    rows={5}
                    placeholder='description ...' 
                    name='description'
                    value={todoData.description}
                    onChange={handleInputChange}></textarea>
                <button>{loading ? 'Adding Item ...' : 'Add Item'}</button>
            </form>
        </div>
    )
}

export default AddToDo