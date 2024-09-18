import React,{useState, useContext, createContext} from 'react'


const CurrentTheme=createContext()
export const useCurrentTheme=()=>{
    const context=useContext(CurrentTheme)
    if (!context){
        return new Error("Wrap your app around CurrentThemeProvider")
    }else{
        return context
    }
}
export const ThemeContextProvider = ({children}) => {
    const [isDark,setIsDark]=useState(false)
    const data={
        isDark, setIsDark
    }
  return (
    <CurrentTheme.Provider value={data}>{children}</CurrentTheme.Provider>
  )
}