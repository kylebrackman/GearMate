import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { createProfileApi } from "../../services/UserApi";
// type Position = {
//   lat: number;
//   lng: number;
// };

const CreateProfile = () => {
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  // const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 });

  // const handleSetLocation = (newPosition: Position) => {
  //   setPosition(newPosition);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProfileData = new FormData();

    newProfileData.append("bio", bio);
    newProfileData.append("name", nickname);
    // newProfileData.append("lat", position.lat.toString());
    // newProfileData.append("lng", position.lng.toString());

    if (image) {
      newProfileData.append("image", image);
    }

    createProfileApi(newProfileData);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Create your profile"
          titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
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
              <Button type="submit" fullWidth variant="contained" color="primary">
                Enter
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateProfile;
