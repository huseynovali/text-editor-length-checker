import { useState } from 'react'
import './App.css'
import TextEditor from './TextEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
      <TextEditor />
  )
}

export default App
