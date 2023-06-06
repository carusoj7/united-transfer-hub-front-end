import * as tokenService from './tokenService'

import { Vote } from '../types/models'

const BASE_URL =  `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/votes`

async function getVotesForPlayer(playerId: number): Promise<Vote> {
  const res = await fetch(`${BASE_URL}/${playerId}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  })
  return await res.json() as Vote
}

export {
  getVotesForPlayer
}