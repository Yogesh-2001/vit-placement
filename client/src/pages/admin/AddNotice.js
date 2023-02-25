import { Button, Typography } from "@material-ui/core";
import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { message } from "antd";
const AddNotice = () => {
  const editor = useRef(null);
  const [state, setState] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    await axios
      .post("/api/v1/admin/add-notice", { notice: state })
      .then((res) => {
        message.success(res.data.message);
        setState("");
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
      });
  };

  return (
    <>
      <section className="col-md-8 mx-auto">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" className="text-center my-4">
            Add placement notice
          </Typography>
          <JoditEditor
            config={{ height: 400 }}
            ref={editor}
            value={state}
            tabIndex={1}
            onBlur={(newContent) => setState(newContent)}
          />
          <Button
            variant="contained"
            color="primary"
            className="my-3 me-3"
            type="submit"
          >
            Add Notice
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="my-3"
            onClick={() => setState(" ")}
          >
            Clear
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddNotice;
