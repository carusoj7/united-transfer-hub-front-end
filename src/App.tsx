// npm modules 
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NewPlayer from './pages/NewPlayer/NewPlayer'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as playerService from './services/playerService'

// styles
import './App.css'

// types
import { User, Player } from './types/models'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [players, setPlayers] =useState<Player[]>([])
  const navigate = useNavigate()
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  const handleAddPlayer = async (newPlayer: Player) => {
    try {
    const createdPlayer = await playerService.createPlayer(newPlayer)
    setPlayers([...players, createdPlayer])
    console.log(createdPlayer, "new player data");
    } catch (error){
    console.log(error)
    }
  } 

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute user={user}>
            <NewPlayer onAddPlayer={handleAddPlayer} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App