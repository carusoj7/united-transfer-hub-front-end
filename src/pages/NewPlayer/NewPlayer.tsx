import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from './NewPlayer.module.css';

// Types
import { Player, Vote } from '../../types/models';
import { PhotoFormData, PlayerFormData } from '../../types/forms';
import { getUserFromToken } from '../../services/tokenService';

interface NewPlayerProps {
  handleAddPlayer: (newPlayer: Player) => void;
}

const NewPlayer = (props: NewPlayerProps): JSX.Element => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<PlayerFormData>({
    id: 0,
    name: '',
    age: 0,
    position: '',
    team: '',
    transferFee: 0,
    profileId: 0,
  });
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserFromToken();
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileId: user.profile.id,
      }));
    }
  }, []);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;
    const file = evt.target.files[0];
    let isFileInvalid = false;
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp'];
    const photoFormat = file.name.split('.').at(-1);

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      isFileInvalid = true;
    }
    if (photoFormat && !validFormats.includes(photoFormat)) {
      isFileInvalid = true;
    }
    if (isFileInvalid && imgInputRef.current) {
      imgInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoData({ photo: file });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const user = getUserFromToken();
    if (user) {
      let photo: string | undefined;
      if (photoData.photo) {
        const reader = new FileReader();
        reader.onloadend = () => {
          photo = reader.result as string;
          const newPlayer: Player = {
            ...formData,
            profileId: user.profile.id,
            votesReceived: [] as Vote[],
            photo: photo,
          };
          props.handleAddPlayer(newPlayer);
          navigate('/transferhub');
        };
        reader.readAsDataURL(photoData.photo);
      } else {
        const newPlayer: Player = {
          ...formData,
          profileId: user.profile.id,
          votesReceived: [] as Vote[],
          photo: undefined,
        };
        props.handleAddPlayer(newPlayer);
        navigate('/transferhub');
      }
    }
  };


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
          onChange={handleChangePhoto}
          ref={imgInputRef}
        />
        <button type="submit">Create Transfer Target</button>
      </form>
    </section>
  );
};

export default NewPlayer;