//npm modules
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//css
import styles from './EditPlayer.module.css'

//services
//services
import { getUserFromToken } from "../../services/tokenService";

//types
import { Player } from "../../types/models";
import { PlayerFormData } from "../../types/forms";


interface UpdatePlayerProps {
  player: Player | null
  setPlayer: (player: Player | null) => void
  handleUpdatePlayer: (editPlayer:PlayerFormData) => Promise<void>
}

const EditPlayer = (props: UpdatePlayerProps) => {
  const { state } = useLocation()
  const [formData, setFormData] = useState<PlayerFormData>(state as PlayerFormData)
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = getUserFromToken()
    if (!user || (formData && user.profile.id !== formData.profileId)) {
      navigate('/transferhub')
    } else {
      setFormData(formData)
    }
  }, [formData, navigate])



  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }


const handleSubmit = async (evt: FormEvent) => {
  evt.preventDefault()
  const user = getUserFromToken()
  if (user && formData) {
    const editedPlayer: Player = {
      ...formData,
      profileId: user.profile.id, 
    }
    await props.handleUpdatePlayer(editedPlayer)
    props.setPlayer(editedPlayer)
    navigate(`/${editedPlayer.id}`)
  }
}

  return (
    <section className={styles.newPlayerContainer}>
    <h1> Edit Transfer Target </h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange= {handleChange}
      />
      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange= {handleChange}
      />
      <label htmlFor="position">Position</label>
      <input
        type="text"
        id="position"
        name="position"
        value={formData.position}
        onChange= {handleChange}
      />
      <label htmlFor="team">Current Team</label>
      <input
        type="text"
        id="team"
        name="team"
        value={formData.team}
        onChange= {handleChange}
      />
      <label htmlFor="transferFee">Estimated Transfer Fee</label>
      <input
        type="number"
        id="transferFee"
        name="transferFee"
        value={formData.transferFee}
        onChange= {handleChange}
      />
      <label htmlFor="photo">Photo</label>
      <input
        type="file"
        id="photo"
        name="photo"
      />
      <button type="submit">Save</button>
    </form>
    </section>
  )
}

export default EditPlayer