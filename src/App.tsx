// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NewPlayer from './pages/NewPlayer/NewPlayer'
import AllPlayers from './pages/TransferHub/TransferHub'
import EditPlayer from './pages/EditPlayer/EditPlayer'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as playerService from './services/playerService'
import * as profileService from './services/profileService'

// styles
import './App.css'

// types
import { User, Player, Profile } from './types/models'
import { PlayerFormData } from './types/forms'
import PlayerDetails from './pages/PlayerDetails/PlayerDetails'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [players, setPlayers] =useState<Player[]>([])
  const [profile, setProfile] =useState<Profile | null>(null)
  const [player, setPlayer] = useState<Player | null>(null)
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

  const handleUpdatePlayer = async (playerFormData: PlayerFormData) => {
    try {
      const existingPlayer = await playerService.show(playerFormData.id)
      const updatedPlayer: Player ={
        ...existingPlayer, ...playerFormData
      }
      const updatedPlayerData = await playerService.update(updatedPlayer)
      setPlayers((players) => {
        return players.map((player) => {
          if (player.id === updatedPlayerData.id) {
            return updatedPlayerData
          } else {
            return player
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect((): void => {
    const fetchPlayers = async(): Promise<void> => {
      try {
        const playerData: Player[] = await playerService.getAllPlayers()
        setPlayers(playerData)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchProfile = async(): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile()
        setProfile(profileData)
      } catch (error){
        console.log(error)
      }
    }
    user ? fetchPlayers() : setPlayers([])
    if (user) {
      fetchProfile()
    } else {
      setProfile(null)
    }
  }, [user, setProfile])



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
            <NewPlayer handleAddPlayer={handleAddPlayer} />
            </ProtectedRoute>
          }
        />
        <Route
        path="/:playerId"
        element={
          <ProtectedRoute user={user}>
            <PlayerDetails />
          </ProtectedRoute>
        }
        />
        <Route
          path="/:playerId/edit"
          element={
            <ProtectedRoute user={user}>
              <EditPlayer player={player} handleUpdatePlayer={handleUpdatePlayer} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transferhub"
          element={
            <ProtectedRoute user={user}>
              <AllPlayers 
              players={players}
              profileName={profile?.name || ''} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App