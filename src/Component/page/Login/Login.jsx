import React, { useState } from "react";
import Axios from "axios";
import "../../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8084/v1/daijai/login",
        {
          username: username,
          password: password,
        }
      );
      const newToken = response.data.token;
      const messageResponse = response.data.message;

      if (messageResponse === "Login Success") {
        message.success("เข้าสู้ระบบสำเร็จ");
        navigate("/home", { state: { token: newToken } });
      } else if (messageResponse === "Login Failed") {
        message.error("รหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      if (error.response) {
        message.error("ไม่พบผู้ใช้งานในระบบ");
      }
    }
  };

  return (
    <>
      <div className="body">
        <div className="wrapper">
          <h1>ยินดีต้อนรับ</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="ชื่อผู้ใช้งาน"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              จดจำการลงชื่อใช้งานของฉัน
            </label>
          </div>
          <button type="submit" className="btn" onClick={handleLogin}>
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
