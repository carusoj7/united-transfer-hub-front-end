// services
import * as tokenService from './tokenService'

// Types
import { PlayerFormData, PhotoFormData } from '../types/forms'
import { Player } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/players`;

async function createPlayer(playerFormData: PlayerFormData, photoData: PhotoFormData): Promise<Player> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(playerFormData)
  })
  let data = await res.json() as Player

  if (photoData.photo) {
    data = await addPlayerPhoto(data.id, photoData)

  }
  return data
}

async function addPlayerPhoto(playerId: number, photoData: PhotoFormData): Promise<Player> {
  if (!photoData.photo) throw new Error("No photo found.")

  const photoFormData = new FormData()
  photoFormData.append('photo', photoData.photo)

  const user = tokenService.getUserFromToken()
  if (!user) throw new Error("No user.")

  const res = await fetch(`${BASE_URL}/${playerId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
    body: photoFormData
  })
  return await res.json() as Player
}

async function getAllPlayers(): Promise<Player[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json() as Player[]
}

async function search(searchTerm: string): Promise<Player[]> {
  const res = await fetch(`${BASE_URL}/search/${searchTerm}`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json() as Player[]
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
  await fetch(`${BASE_URL}/${playerId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
}

async function fetchVotes(playerId: number): Promise<{ upvotes: number, downvotes: number }> {
  const res = await fetch(`${BASE_URL}/${playerId}/votes`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  })
  const data = await res.json()
  return data as { upvotes: number, downvotes: number }

}

async function upvotePlayer(playerId: number): Promise<void> {
  await fetch(`${BASE_URL}/${playerId}/upvote`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
}

async function downvotePlayer(playerId: number): Promise<void> {
  await fetch(`${BASE_URL}/${playerId}/downvote`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
}

export {
  createPlayer,
  getAllPlayers,
  update,
  deletePlayer,
  fetchVotes,
  upvotePlayer,
  downvotePlayer,
  addPlayerPhoto,
  search
}