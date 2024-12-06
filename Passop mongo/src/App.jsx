import './App.css'
import Manager from './Components/Manager'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
    <div className="overflow-y-scroll no-scrollbar absolute inset-0 -z-10 h-screen w-full items-center px-5 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Navbar/>
      <div className='
      h-[85vh]'>
      <Manager/>
      </div>
    </div>
    </>
  )
}

export default App
