import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { MainContainer } from '../theme/my-theme';


const Profile = () => {
  const { blogId } = useParams();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <MainContainer maxWidth='lg'>
      <Typography variant='h1'>Hallo {currentUser?.displayName || 'Name'}</Typography>
      <p>Hier siehst du alle deine bis jetzt verfassten Rezepte:</p>
    </MainContainer>
  );
};

export default Profile;
