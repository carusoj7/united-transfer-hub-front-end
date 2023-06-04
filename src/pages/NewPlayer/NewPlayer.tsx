import { ChangeEvent, FormEvent } from "react";

// npm modules 
import { useState } from "react";

//types
import { Player } from "../../types/models";
import { PlayerFormData } from "../../types/forms";

// css
import styles from './NewPlayer.module.css'

interface NewPlayerProps {
  onAddPlayer: (newPlayer: Player) => void
}

const NewPlayer = (props: NewPlayerProps) => {
  const [formData, setFormData] = useState<PlayerFormData>({
    name: '',
    age: 0,
    position: '',
    team: '',
    transferFee: 0,
    photo: ''
  })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    console.log(formData, "form data !!!!!!!!!")

    
  }
  

  return (
    
  <section className={styles.newPlayerContainer}>
    <h1> Create Transfer Target </h1>
    <form>
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
    </form>
    </section>
  )
}

export default NewPlayer

