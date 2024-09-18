import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { domain } from './Domain'
import "../css/Login.css"

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const data = {
        username: "",
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

    const handleLogin = (event) => {
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
        fetch(`${domain}/accounts/login`, reqParams)
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
            if(data['token']){
                navigate('/dashboard')
            }
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }
    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                {error !== '' && <p>{error}</p>}
                <label>username</label>
                <input type='text' 
                    placeholder='username' name='username'
                    onChange={handleInputChange} />
                <label>password</label>
                <input type='password' 
                    placeholder='password' name='password'
                    onChange={handleInputChange} />
                <div className='div2'>
                    <Link to={'/register'}>create account</Link>
                    <Link to={'/password-reset'}>forgot password ?</Link>
                </div>
                <button>{loading ? 'Logging in' : 'Login'}</button>
            </form> 
        </div>
    )
}

export default Login