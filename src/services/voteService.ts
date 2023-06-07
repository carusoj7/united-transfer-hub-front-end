import * as tokenService from './tokenService'

import { Vote } from '../types/models'

const BASE_URL =  `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/votes`

async function fetchVotes(playerId: number): Promise<Vote> {
  const res = await fetch(`${BASE_URL}/${playerId}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  })
  return await res.json() as Vote
}

async function upvotePlayer(playerId: number, profileId: number): Promise<void> {
  const vote: Vote = {
    playerId,
    profileId,
    upvotes: 1, 
    downvotes: 0
  }
  const res = await fetch(`${BASE_URL}/${playerId}/upvote`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote),
  })
  return await res.json()
}

async function downvotePlayer(playerId: number, profileId: number): Promise<void> {
  const vote: Vote = {
    playerId,
    profileId,
    upvotes: 0,
    downvotes: 1,
  }
  const res = await fetch(`${BASE_URL}/${playerId}/downvote`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote),
  })
  return await res.json()
}

export {
  fetchVotes,
  upvotePlayer,
  downvotePlayer,
  
}