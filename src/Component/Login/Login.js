import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <div className="wrapper">
          <h1>ยินดีต้อนรับ</h1>
          <div className="input-box">
            <input type="text" placeholder="ชื่อผู้ใข้งาน" required />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="รหัสผ่าน"
              minLength={8}
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
          <button
            type="submit"
            className="btn"
            onClick={() => {
              navigate("/Home");
            }}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
