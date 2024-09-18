import{useStete, useEffect} from "react";

const useFetch =(url)=>{
    const[data,setDate]= useState([])
    const[loading, setloading] =useState(false)
    const[error, setError] =useState(null)
    const[reefresh, setRefresh]= useState([false])
    useEffect(()=>{

    },[url])
}