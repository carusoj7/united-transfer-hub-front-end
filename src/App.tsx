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
import TransferHub from './pages/TransferHub/TransferHub'
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
import { PhotoFormData, PlayerFormData } from './types/forms'


function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [players, setPlayers] = useState<Player[] | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
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


  const fetchPlayers = async (): Promise<void> => {
    try {
      const playerData: Player[] = await playerService.getAllPlayers()
      setPlayers(playerData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile()
        setProfile(profileData)
      } catch (error) {
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

  const handleAddPlayer = async (newPlayer: Player, photoData: PhotoFormData) => {
    try {
      const createdPlayer = await playerService.createPlayer(newPlayer, photoData)
      if (players)
        setPlayers([createdPlayer, ...players])
      else
        setPlayers([createdPlayer])
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdatePlayer = async (playerFormData: PlayerFormData) => {
    try {
      const updatedPlayerData = await playerService.update(playerFormData)
      setPlayers((players) => {
        return players == null ? [updatedPlayerData] : players.map((player) => {
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
  const handleDeletePlayer = async (playerId: number): Promise<void> => {
    try {
      await playerService.deletePlayer(playerId)
      if (players)
        setPlayers(players.filter(p => p.id !== playerId))
      navigate('/transferhub')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = async (searchTerm: string): Promise<void> => {
    try {
      if (searchTerm) {
        const playerData: Player[] = await playerService.search(searchTerm)
        setPlayers(playerData)
      } else {
        fetchPlayers()
      }
    } catch (error) {
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
              <NewPlayer handleAddPlayer={handleAddPlayer} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:playerId/edit"
          element={
            <ProtectedRoute user={user}>
              <EditPlayer player={player} setPlayer={setPlayer}
                handleUpdatePlayer={handleUpdatePlayer} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transferhub"
          element={
            <ProtectedRoute user={user}>
              <TransferHub
                players={players}
                handleSearch={handleSearch}
                profileName={profile?.name || ''}
                user={user}
                handleDeletePlayer={handleDeletePlayer}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App