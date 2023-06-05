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

async function show(playerId: number): Promise<Player> {
    const res = await fetch(`${BASE_URL}/${playerId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json() as Player
}

async function update(playerFormData: PlayerFormData): Promise<Player> {
  const res = await fetch(`${BASE_URL}/${playerFormData.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerFormData)
  })
  return await res.json() as Player
}

async function deletePlayer(playerId: number): Promise<void> {
  await fetch(`${BASE_URL}/${playerId}`), {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  }
}

export {
  createPlayer,
  getAllPlayers,
  show,
  update,
  deletePlayer
} 