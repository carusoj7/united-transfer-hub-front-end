// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

//css 
import styles from './NavBar.module.css'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav className={styles.nav}>
      {user ?
        <ul>
          <li>Welcome, {user.name}</li>
          <li><NavLink to="/transferhub">Transfer Hub</NavLink></li>
          <li><NavLink to="/new"> Add Transfer Target</NavLink></li>
          <li><NavLink to="/profiles">Profiles</NavLink></li>
          <li><NavLink to="/myprofile">My Profile</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
        </ul>
      :
        <ul>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
