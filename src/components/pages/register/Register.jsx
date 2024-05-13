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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [isIncompletepassword, setIsIncompletepassword] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const handleBlur = (event) => {
    setIsIncompletepassword(event.target.value.length < 8);
  };

  const handleFormSubmit = async (data) => {
    try {
      const response = await Axios.post(
        "http://localhost:8084/v1/daijai/register",
        {
          firstname: data.get("firstName"),
          lastname: data.get("lastName"),
          email: data.get("email"),
          password: data.get("password"),
          role: "user",
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const incompleteFields = {
      firstName: data.get("firstName") === "",
      lastName: data.get("lastName") === "",
      email: data.get("email") === "",
      password: data.get("password") === "" || data.get("password").length < 8,
    };

    setIsIncomplete(incompleteFields);

    if (Object.values(incompleteFields).some((field) => field)) {
      notification.error({
        message: "เกิดข้อผิดพลาด",
        description: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    try {
      await handleFormSubmit(data);
      navigate("/Login");
      notification.success({
        message: "สำเร็จ",
        description: "สมัครบัญชีสำเร็จ",
      });
    } catch (error) {
      if (error.response) {
        notification.error({
          message: "เกิดข้อผิดพลาด",
          description: "ชื่ออีเมลใช้งานซ้ำ",
        });
      }
      console.log(error);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ลงทะเบียน
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={isIncomplete.firstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ชื่อ"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={isIncomplete.lastName}
                  required
                  fullWidth
                  id="lastName"
                  label="นามสกุล"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isIncomplete.email}
                  required
                  fullWidth
                  id="email"
                  label="อีเมล"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isIncomplete.password}
                  required
                  fullWidth
                  name="password"
                  label="รหัสผ่าน"
                  type="password"
                  id="password"
                  onBlur={handleBlur}
                  autoComplete="new-password"
                />
                {isIncompletepassword && (
                  <FormHelperText error>
                    ต้องกรอกให้ครบ 8 ตัวอักษร
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="คุณต้องการรับข่าวสารทางอีเมล"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ส่งข้อมูล
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
