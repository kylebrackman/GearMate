import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import { createProfileApi } from '../../services/apis/UserApi';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const CreateProfile = () => {
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProfileData = new FormData();
    newProfileData.append('bio', bio);
    newProfileData.append('name', nickname);
    if (image) {
      newProfileData.append('image', image);
    }
    try {
      await createProfileApi(newProfileData);
      navigate('/home');
    } catch (error) {
      if (error instanceof Error) {
        const errorMessages = error.message.split(',');
        setErrors(errorMessages);
        throw error;
      } else {
        console.error('Unknown error:', error);
        throw error;
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Create your profile"
          titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
        />
        <CardContent>
          <form
            onSubmit={(e) => {
              handleSubmit(e).catch((error) => {
                console.error(error);
              });
            }}
          >
            <Box mb={2}>
              <TextField
                fullWidth
                label="Nickname"
                variant="outlined"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Bio"
                variant="outlined"
                multiline
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />
            </Box>
            <Box mb={2}>
              <Button variant="contained" component="label">
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </Button>
            </Box>
            {/* <Geo onSetLocation={handleSetLocation} /> */}
            <Box mb={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Enter
              </Button>
            </Box>
            {errors.length > 0 && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li> // Display each error as a bullet point
                  ))}
                </ul>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateProfile;
