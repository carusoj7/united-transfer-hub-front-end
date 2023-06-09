// css
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>Welcome {user ? user.name : ''}</h1>
      <iframe width="900" height="450" src="https://www.youtube.com/embed/nEsJjN98QbY" title="YouTube video player" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture web-share"></iframe>
    </main>
  )
}

export default Landing
