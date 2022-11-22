import { useEffect, useState } from 'react'
import { ChatMessage } from "@my-chat-app/shared"
import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || "http://localhost:3001"

export default function HomePage() {

  const [chatMessage, setChatMessage] = useState<string>("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | undefined>("")
  
  const fetchMessages = async (): Promise<ChatMessage[]> => {
    const reponse = await axios.get<ChatMessage[]>("/")
    return reponse.data
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages()
      .then(setMessages)
      .catch((error) => {
        setMessages([])
        setError("Something went wrong when fetching messages...")
      })
    }, 2500)
  }, [])
  
  const createMessage = async (chatMessage: string): Promise<void> => {
    const username = localStorage.getItem("ts-webchat")
    const message: ChatMessage = {
      text: chatMessage,
      author: username,
      timeStamp: new Date()
    }
    try {
      const response = await axios.post<ChatMessage[]>("/", message)
      setMessages(response.data)
      setChatMessage("")
    } catch (error) {
      setMessages([])
      setError("Missing username or invalid message input")
    }

  }
  const output = () => {
    if (error) {
      return (<div>{error}</div>)
    } else if (messages) {
      return (<div className='grid place-items-center overflow-auto max-h-60'>
        {messages && messages.map((singleMessage, index) => {
          return (
            <div className="text-center mt-2 bg-skyBrown rounded-lg" key={index}>
              {singleMessage.author}: {singleMessage.text} <br />
              {singleMessage.timeStamp.toString().split('T')[0].substring(0, 10)} - {singleMessage.timeStamp.toString().split('T')[1].substring(0, 5)}
            </div>
          )
        })}
      </div>)
    } else {
      <div>'Something went wrong fetching messages...'</div>
    }
  }
  return (
    <div>

      {output()}
      <div className='grid place-items-center'>
      <textarea className="w-72 h-10 resize-none" placeholder="Type a message..." value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
        <button className="bg-white mt-4 h-10 border hover:bg-skyGreen hover:border-black w-72" onClick={(e) => createMessage(chatMessage)}>Send message</button>
      </div>
    </div>
  )
}
