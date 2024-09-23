import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
// import ProfileGeo from "./ProfileGeo.jsx";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const backendBaseUrl = import.meta.env.VITE_API_URL
  const imageUrl = `${backendBaseUrl}${user?.profile?.image}`;

  console.log(user)

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    } else if (!user?.profile) {
      navigate("/createprofile");
    }
  }, [user, navigate]);

  if (!user) {
    return <h1>Please Log In or Sign Up</h1>;
  }

  return (
    <section>
      <div>
        <h2>{user?.profile?.name}</h2>
        <div>
          <div>
            <a href="/profile">
              <img
                src={imageUrl}
                style={{ borderRadius: 10 }}
                alt="profile"
              />
            </a>
            <p>{user?.profile.bio}</p>
            {/* <ProfileGeo /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
