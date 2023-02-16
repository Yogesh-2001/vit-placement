import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
const Home = () => {
  //    const { comments, loggedInUser } = useContext(UserContext);
  const [question, setQuestion] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/api/v1/add-query", {
        question,
        user: user,
      })
      .then((res) => {
        message.success(res.data.message);
        setQuestion("");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    //  await addDoc(collection(db, `forum`), {
    //    question,
    //    timeStamp: serverTimestamp(),
    //    user: loggedInUser,
    //  })
    //    .then((response) => {
    //      toast.success("Comment added successfully");
    //    })
    //    .catch((error) => {
    //      console.log(error);
    //    });
  };
  return (
    <>
      <main className="col-11 mx-auto d-flex flex-wrap justify-content-between py-4">
        <form onSubmit={handleSubmit} className="col-lg-5 col-11 mx-auto ">
          <h4>Add Topic Of Discussion</h4>
          <TextField
            className="col-12 my-3"
            type="text"
            label="Enter Message"
            multiline
            minRows={4}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Add Comment
          </Button>
        </form>
        {/* {comments ? (
           <section className="col-lg-6 col-12 mx-auto my-3 py-3">
             <Comments comments={comments} />
           </section>
         ) : (
           <LinearProgress color="secondary" />
         )} */}
      </main>
    </>
  );
};

export default Home;