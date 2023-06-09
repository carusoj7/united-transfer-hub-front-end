import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

// CSS
import styles from './NewPlayer.module.css'

// Types
import { Player } from '../../types/models'
import { PhotoFormData, PlayerFormData } from '../../types/forms'
import { getUserFromToken } from '../../services/tokenService'

interface NewPlayerProps {
  handleAddPlayer: (newPlayer: Player, photoData: PhotoFormData) => void
}

const NewPlayer = (props: NewPlayerProps): JSX.Element => {
  const imgInputRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<PlayerFormData>({
    id: 0,
    name: '',
    age: 0,
    position: '',
    team: '',
    transferFee: 0,
    profileId: 0,
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null,
  })

  const navigate = useNavigate()

  useEffect(() => {
    const user = getUserFromToken()
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileId: user.profile.id,
      }))
    }
  }, [])

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (photoFormat && !validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }

    setMessage(errMsg)

    if (isFileInvalid && imgInputRef.current) {
      imgInputRef.current.value = ""
      return message
    }

    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    const user = getUserFromToken()
    if (user) {
      const newPlayer: Player = {
        ...formData,
        profileId: user.profile.id,
      }
      props.handleAddPlayer(newPlayer, photoData)
      navigate('/transferhub')
    }
  }

  return (
    <section className={styles.newPlayerContainer}>
      <h1>Create Transfer Target</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label htmlFor="position">Position</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
        <label htmlFor="team">Current Team</label>
        <input
          type="text"
          id="team"
          name="team"
          value={formData.team}
          onChange={handleChange}
        />
        <label htmlFor="transferFee">Estimated Transfer Fee</label>
        <input
          type="number"
          id="transferFee"
          name="transferFee"
          value={formData.transferFee}
          onChange={handleChange}
        />
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={handleChangePhoto}
        />
        <button type="submit">Create Transfer Target</button>
      </form>
    </section>
  )
}

export default NewPlayer