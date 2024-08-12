import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import ResetPassword from './components/ResetPassword/ResetPassword'

function App() {

  return (
    <>
      <div className='bg-slate-100 min-h-screen'>
        <Header/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
