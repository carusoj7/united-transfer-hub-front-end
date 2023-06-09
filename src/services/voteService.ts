// services
import * as tokenService from './tokenService';

// types

import { Vote, VoteStatus } from '../types/models';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/votes`;

async function fetchVotes(playerId: number): Promise< VoteStatus > {
  const res = await fetch(`${BASE_URL}/${playerId}/votes`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  });

  const data = await res.json();
  console.log('Votes response:', data);

  return data as VoteStatus;
}

async function upvotePlayer(playerId: number): Promise<Vote> {
  const res = await fetch(`${BASE_URL}/${playerId}/upvote`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  });
  return await res.json() as Vote
}

async function downvotePlayer(playerId: number): Promise<Vote> {
  const res = await fetch(`${BASE_URL}/${playerId}/downvote`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  });
  return await res.json() as Vote
}

export {
  fetchVotes,
  upvotePlayer,
  downvotePlayer
}