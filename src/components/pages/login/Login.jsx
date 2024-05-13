import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const defaultTheme = createTheme();

export default function Test() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await Axios.post(
        "http://localhost:8084/v1/daijai/login",
        {
          username: data.get("email"),
          password: data.get("password"),
        }
      );
      const newToken = response.data.token;
      const messageResponse = response.data.message;

      if (messageResponse === "Login Success") {
        notification.success({
          message: "สำเร็จ",
          description: "เข้าสู่ระบบสำเร็จ",
        });
        navigate("/home", { state: { token: newToken } });
      } else if (messageResponse === "login Failed") {
        notification.error({
          message: "เกิดข้อผิดพลาด",
          description: "รหัสผ่านไม่ถูกต้อง",
        });
      }
    } catch (error) {
      if (error.response) {
        notification.error({
          message: "เกิดข้อผิดพลาด",
          description: "ไม่พบผู้ใช้งานในระบบ",
        });
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main", width: 100, height: 100 }}
          >
            <img
              src="images.jpg"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Avatar>

          <Typography component="h1" variant="h5">
            เข้าสู่ระบบ
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="อีเมล"
              name="email"
              autoComplete="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="พาสเวิร์ด"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="จำจดการเข้าสู้ระบบของฉัน"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ลงชื่อเข้าใช่ระบบ
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"ยังไม่มีบัญชี? สมัครบัญชี"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
