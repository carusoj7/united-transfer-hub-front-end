// services
import * as tokenService from './tokenService'

//types 
import { PlayerFormData } from '../types/forms'
import { Player } from '../types/models'

const BASE_URL =  `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/players`

async function createPlayer(playerFormData: PlayerFormData): Promise<Player> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(playerFormData)
  })
  return await res.json() as Player
}

async function getAllPlayers(): Promise<Player[]> {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json() as Player[]
}

export {
  createPlayer,
  getAllPlayers
} 