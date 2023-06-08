// services
import * as tokenService from './tokenService';

// types

import { Vote, Player } from '../types/models';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/votes`;

async function fetchVotes(playerId: number): Promise<{ upvotes: number, downvotes: number }> {
  const res = await fetch(`${BASE_URL}/${playerId}/votes`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  });

  const data = await res.json();
  console.log('Votes response:', data);

  return data as { upvotes: number, downvotes: number };
  console.log(playerId, "find this");
}

async function upvotePlayer(playerId: number): Promise<void> {
  await fetch(`${BASE_URL}/${playerId}/upvote`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  });
}

async function downvotePlayer(playerId: number): Promise<void> {
  await fetch(`${BASE_URL}/${playerId}/downvote`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  });
}

export {
  fetchVotes,
  upvotePlayer,
  downvotePlayer
}