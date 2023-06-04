//types

import { Profile, Player } from '../../types/models'

interface PlayerCardProps {
  player: Player
  profileName: string
}

const PlayerCard = (props: PlayerCardProps): JSX.Element => {
  const { player, profileName } = props

  return (
    <article>
      <h1>{player.name}
        {profileName}
      </h1>
    </article>
  )
}

export default PlayerCard