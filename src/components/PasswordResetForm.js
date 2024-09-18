import React, {useState, useEffect} from 'react'
import { domain } from './Domain'
import "../css/Login.css"
import { useParams } from 'react-router-dom'

const PasswordResetForm = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { link } = useParams()
    const data = {
        code: "",
        password: "",
    }
    const [resetData, setResetData] = useState(data)

    const handleInputChange = (event) => {
        const {name, value } = event.target
        setResetData({
            ...resetData,
            [name] : value}
        )
    }

    const handleReset = (event) => {
        event.preventDefault()
        const formData = new FormData()
        for(let key in resetData){
            if(resetData[key] === ''){
                setError(`${key} is required`)
                setTimeout(()=>setError(''),3000)
                return
            }else{
                formData.append(key, resetData[key])
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
        fetch(`${domain}/accounts/password-reset-done/${link}`, reqParams)
        .then(res => {
            if(!res.ok){
                throw Error(res.statusText)
            }else{
                return res.json()
            }
        })
        .then(data => {
            console.log(data)
            setError(data['msg'])
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
            setError("Please make sure you submit correct information")
            setLoading(false)
        })
    }
    return (
        <div className='login'>
            <form onSubmit={handleReset}>
                <h1>Password Reset Form</h1>
                {error !== '' && <p>{error}</p>}
                
                <label>code</label>
                <input type='text' 
                    placeholder='code received in mail' name='code'
                    onChange={handleInputChange} />
                <label>password</label>
                <input type='password' 
                    placeholder='new password' name='password'
                    onChange={handleInputChange} />
                <button>{loading ? 'Resetting ...' : 'Reset'}</button>
            </form>
        </div>
    )
}

export default PasswordResetForm