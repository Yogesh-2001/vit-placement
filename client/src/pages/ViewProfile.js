import { LinearProgress } from "@material-ui/core";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
// import { blue } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { UserContext } from "../context/LoginContext";
// import { db } from "../firebase";
import { useParams } from "react-router-dom";
const ViewProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  // const { loggedInUser, allUsersDetails } = useContext(UserContext);
  const [myprofile, setMyProfile] = useState();
  useEffect(() => {
    const getuserdetails = async () => {
      await axios
        .get(`/api/v1/user/get-profile-details/${params.id}`)
        .then((res) => {
          setMyProfile(res.data[0]);
        });
    };

    getuserdetails();
  }, []);
  console.log(myprofile);
  return (
    <>
      {myprofile ? (
        <section className="d-flex flex-wrap">
          <aside className="col-md-5 col-5 mx-auto d-flex flex-column align-items-center justify-content-center">
            <img
              src={myprofile?.photourl}
              className="col-md-6 mb-3"
              style={{ maxWidth: "400px", maxHeight: "350px" }}
            />
            <Typography variant="h4" color="secondary">
              {myprofile?.name}
            </Typography>
          </aside>

          <aside className="col-md-7 col-11 mx-auto">
            <Box sx={{ mt: 5 }}>
              <Typography variant="h5">Personal Information</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={5}>
                  <Typography variant="body1">Name</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile && myprofile?.name}
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  <Typography variant="body1">Date of Birth</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {new Date(myprofile?.dob).toDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Address</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.address}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5">Contact Information</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={5}>
                  <Typography variant="body1">Email Address</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.email}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Phone Number</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.phone}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5">Educational Information</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={5}>
                  <Typography variant="body1">Branch</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.branch}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Division</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile?.engineering_division}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Roll Number</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.rollno}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Engg. Aggeregate</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile?.engineeringAggrpercent}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Diploma Percentage</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile.diploma ? myprofile.diploma + " %" : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">HSC Percentage</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile.class12th ? myprofile.class12th + " %" : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">SSC</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile.class10th ? myprofile.class10th + " %" : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Live KT</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.liveKt}</Typography>
                </Grid>
              </Grid>
            </Box>

            {myprofile && (
              <Link to={`/student/update-profile/${myprofile?.userId}`}>
                <Button sx={{ mt: 5 }} variant="contained">
                  Edit Profile
                </Button>
              </Link>
            )}
          </aside>
        </section>
      ) : (
        <LinearProgress color="secondary" />
      )}
    </>
  );
};

export default ViewProfile;
