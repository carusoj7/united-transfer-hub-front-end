//npm modules
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

//services
import * as playerService from '../../services/playerService'

//components
import PlayerCard from "../../components/PlayerCard/PlayerCard";
//css
import styles from './PlayerDetails.module.css'

//types
import { Player } from "../../types/models";

const PlayerDetails = () => {
  const { playerId } = useParams<{ playerId: string }>()
  const [player, setPlayer] = useState<Player | null>(null);



useEffect(() => {
  const fetchPlayer = async () => {
    const parsedPlayerId = parseInt(playerId as string)
    const playerData = await playerService.show(parsedPlayerId)
    setPlayer(playerData)
  }
  fetchPlayer()
}, [playerId]);

return (
  <div>
    <h1>This is the Player Details Page</h1>
    <div>
      {player && (
        <>
        <h2>{player.name}</h2>
        <button>
          <Link to={`/${player.id}/edit`} state={player}>
            Edit
          </Link>
        </button>
        </>
      )}
    </div>
  </div>
)
}
export default PlayerDetails
