import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { domain } from './Domain'

const Register = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const data = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: ""
    }
    const [loginData, setLoginData] = useState(data)

    const handleInputChange = (event) => {
        const {name, value } = event.target
        setLoginData({
            ...loginData,
            [name] : value}
        )
    }

    const handleRegister = (event) => {
        event.preventDefault()
        const formData = new FormData()
        for(let key in loginData){
            if(loginData[key] === ''){
                setError(`${key} is required`)
                setTimeout(()=>setError(''),3000)
                return
            }else{
                formData.append(key, loginData[key])
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
        fetch(`${domain}/accounts/users`, reqParams)
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
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }
    return (
        <div className='login'>
            <form onSubmit={handleRegister}>
                <h1>Login</h1>
                {error !== '' && <p>{error}</p>}
                <div className='div1'>
                    <div>
                        <label>firstname</label>
                        <input type='text' 
                            placeholder='firstname' name='first_name'
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>lastname</label>
                        <input type='text' 
                            placeholder='last_name' name='last_name'
                            onChange={handleInputChange} />
                    </div>
                </div>
                
                <label>username</label>
                <input type='text' 
                    placeholder='username' name='username'
                    onChange={handleInputChange} />
                <label>email</label>
                <input type='email' 
                    placeholder='email' name='email'
                    onChange={handleInputChange} />
                <label>password</label>
                <input type='password' 
                    placeholder='password' name='password'
                    onChange={handleInputChange} />
                <div className='div2'>
                    <Link to={'/register'}>create account</Link>
                    <Link to={'/password-reset'}>forgot password ?</Link>
                </div>
                <button>{loading ? 'Registering ...' : 'Register'}</button>
            </form>
        </div>
    )
}

export default Register