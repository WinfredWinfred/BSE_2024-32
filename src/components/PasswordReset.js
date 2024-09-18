import React, {useState, useEffect} from 'react'
import { domain } from './Domain'
import "../css/Login.css"

const PasswordReset = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')

    const handlePasswordReset = (event) => {
        event.preventDefault()
        const formData = new FormData()
        if(username === ''){
            setError(`username is required`)
            return
        }
        formData.append('username', username)
        setError('')
        setLoading(true)
        //create post request using the fetch api
        const reqParams = {
            method : 'POST',
            credentials: 'omit',
            body : formData
        }
        fetch(`${domain}/accounts/password-reset`, reqParams)
        .then(res => {
            if(!res.ok){
                throw Error(res.statusText)
            }else{
                return res.json()
            }
        })
        .then(data => {
            console.log(data)
            setLoading(false)
            setError(data['msg'])
            setUsername('')
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
            setUsername('')
        })
    }
    return (
        <div className='login'>
            <form onSubmit={handlePasswordReset}>
                <h1>Forgot Password</h1>
                {error !== '' && <p>{error}</p>}
                <label>username</label>
                <input type='text' 
                    placeholder='username' value={username} name='username'
                    onChange={(e)=>setUsername(e.target.value)} />
                <button>{loading ? 'Requesting' : 'Request Password Reset'}</button>
            </form> 
        </div>
    )
}

export default PasswordReset