import { Route, Routes } from "react-router-dom";
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
    </Routes>
  )
}

export default App
