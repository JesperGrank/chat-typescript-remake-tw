import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {

  const navigate = useNavigate()

  const [userName, setUserName] = useState<string>("")
  const [error, setError] = useState<string>()

  const createUser = (username: string) => {
      console.log(username)
      if(!username || username == "" || !username.trim()){
      localStorage.removeItem("ts-webchat")
      setError("You need to have a username to enter chat")
    } else{
      localStorage.setItem("ts-webchat", username)
      navigate("/chat")
    }
  }

  return (
    <div>
      {/* Fortsätt här nedan med flex för att flytta input och knapp till mitten av skärmen och liggandes under varandra */}
      {/* <div className='flex justify-center items-center border border-black w-1/2 m-auto mt-'> */}
      <div className='grid items-center justify-center m-80 text-center'>
      <label>{error ? error : "Select a username to enter chat"} </label>
      <input className=" focus:z-10 sm:text-sm h-10 border w-72" placeholder="Username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
      <button className="bg-white mt-4 h-10 border hover:bg-skyGreen hover:border-black w-72" onClick={(e) => createUser(userName)}>Enter chat</button>
      </div>
        
    </div>
  )
}
