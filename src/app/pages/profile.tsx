import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/store';


const Profile = () => {
  const { blogId } = useParams();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <Container maxWidth="lg">
      <Typography variant='h3'>Hallo {currentUser?.displayName || 'Name'}</Typography>
      <p>Hier siehst du alle deine bis jetzt verfassten Rezepte:</p>
    </Container>
  );
};

export default Profile;
