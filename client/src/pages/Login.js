import { message, Form } from "antd";
import { TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/features/alertSlice";
import { setUser, setToken } from "../redux/features/authSlice";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { email, password } = values;
    dispatch(setLoading(true));
    await axios
      .post("/api/v1/auth/login", values)
      .then((res) => {
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            token: res.data.token,
            user: res.data.user,
          })
        );
        message.success(res.data.message);
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.token));
        navigate("/dashboard");
        dispatch(setLoading(false));
      })
      .catch((err) => {
        message.error("error occured", err.message);
        dispatch(setLoading(true));
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      style={{
        maxWidth: "360px",
        margin: "150px auto",
        boxShadow: "1px 2px 10px aqua",
        padding: "20px 10px",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h4>Login</h4>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <TextField
          type={"email"}
          label="Email"
          placeholder="enter valid email"
          variant="standard"
          className="col-12 my-3"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <TextField
          type={"password"}
          label="Password"
          placeholder="enter password"
          variant="standard"
          className="col-12 my-3"
        />
      </Form.Item>

      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
