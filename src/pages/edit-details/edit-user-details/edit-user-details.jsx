import EditDetailsPage from "../index.jsx";
import {
  Box,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../redux/action.js";

const tealTextField = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    "& fieldset": {
      borderColor: "rgba(20, 184, 166, 0.35)",
    },
    "&:hover fieldset": {
      borderColor: "var(--primary-color, #14b8a6)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color, #14b8a6)",
      borderWidth: 1.5,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--primary-color, #14b8a6)",
  },
};

const EditUserDetails = ({ styles, setOpenSnackBar }) => {
  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const [user_email, setUserEmail] = useState(user?.user_email);
  const [name, setName] = useState(user?.name);
  const [github, setGithub] = useState(user?.social_links?.github_url);
  const [linkedin, setLinkedin] = useState(user?.social_links?.linkedin_url);
  const [blog, setBlog] = useState(user?.social_links?.blog_url);
  const [twitter, setTwitter] = useState(user?.social_links?.twitter_url);
  const [stackOverFlow, setStackoverflow] = useState(
    user?.social_links?.stackoverflow_url,
  );
  const [about, setAbout] = useState(user?.about);
  const [profile_url, setProfileUrl] = useState(user?.profile_url);
  const [leetcode, setLeetcode] = useState(user?.social_links?.leetcode_url);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      user_email,
      name,
      about,
      profile_url,
      social_links: {
        github_url: github,
        linkedin_url: linkedin,
        blog_url: blog,
        twitter_url: twitter,
        stackoverflow_url: stackOverFlow,
        leetcode_url: leetcode,
      },
    };
    dispatch(updateUser(updatedUser, user.id));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (validTypes.includes(file.type)) {
        setProfileUrl(file);
      } else {
        setOpenSnackBar(true, "Invalid Image");
      }
    }
  };

  const getImageUrl = () => {
    if (typeof profile_url === "string") return profile_url;
    if (!profile_url) return null;
    return URL.createObjectURL(profile_url);
  };

  return (
    <div className={styles.editUserContainer}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Edit Profile</h2>
        <p className={styles.pageSubtitle}>
          Update your personal details, social links, and profile picture
        </p>
      </div>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          maxWidth: "100%",
          p: { xs: 2, sm: 3, md: 4 },
          background: "#fff",
          border: "1px solid rgba(20, 184, 166, 0.15)",
          boxShadow: "0 4px 14px rgba(20, 184, 166, 0.08)",
        }}
      >
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={4}>
              {/* Profile Section */}
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={2}
                >
                  <Avatar
                    src={getImageUrl()}
                    alt="Profile"
                    sx={{
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      border: "4px solid var(--primary-color, #14b8a6)",
                      boxShadow: "0 8px 20px rgba(20, 184, 166, 0.18)",
                    }}
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      borderColor: "var(--primary-color, #14b8a6)",
                      color: "var(--primary-color, #14b8a6)",
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: "var(--primary-color-dark, #0f766e)",
                        backgroundColor: "rgba(20, 184, 166, 0.06)",
                      },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept=".jpeg, .jpg, .png, .webp"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </Box>
              </Grid>

              {/* Form Section */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={user_email}
                      disabled
                      sx={tealTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={tealTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Github"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      sx={tealTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="LinkedIn"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      sx={tealTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Blog"
                      value={blog}
                      onChange={(e) => setBlog(e.target.value)}
                      sx={tealTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Twitter"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      sx={tealTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="StackOverflow"
                      value={stackOverFlow}
                      onChange={(e) => setStackoverflow(e.target.value)}
                      sx={tealTextField}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="leetCode"
                      value={leetcode}
                      onChange={(e) => setLeetcode(e.target.value)}
                      sx={tealTextField}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* About Section */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  multiline
                  rows={4}
                  sx={tealTextField}
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    px: 5,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(20, 184, 166, 0.25)",
                    "&:hover": {
                      backgroundColor: "var(--primary-color-dark, #0f766e)",
                      boxShadow: "0 6px 16px rgba(20, 184, 166, 0.32)",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDetailsPage(EditUserDetails);
