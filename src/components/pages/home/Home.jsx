import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TableHome from "./TableHome";
import Project from "../project/Project";
import Material from "../material/Material";
import ReportTable from "../report/ReportTable";
import useLoginStlyes from "./HomeStyles";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { notification } from "antd";

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("หน้าหลัก");
  const { drawerWidth, Main, AppBar, DrawerHeader } = useLoginStlyes();
  const location = useLocation();
  const token = location.state.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Axios.get("http://localhost:8084/user/v1/daijai/profile", {
          headers: {
            token: token,
          },
        });
      } catch (error) {
        navigate("/Login");
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleItemClick = (menu) => {
    setSelectedMenu(menu);
    setOpen(false);
  };
  const handbleLogout = () => {
    navigate("/Login");
    notification.success({
      message: "สำเร็จ",
      description: "ออกจากระบบสำเร็จ",
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DaiJai Company
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          DaiJai
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["หน้าหลัก", "เลือกโปรเจ็ค", "รายการ", "แมททีเรียล"].map((menu) => (
            <ListItem key={menu} onClick={() => handleItemClick(menu)}>
              <ListItemButton>
                <ListItemIcon>
                  {menu === "หน้าหลัก" && <HomeIcon />}
                  {menu === "เลือกโปรเจ็ค" && <SearchIcon />}
                  {menu === "รายการ" && <AssignmentOutlinedIcon />}
                  {menu === "แมททีเรียล" && <EngineeringIcon />}
                </ListItemIcon>
                <ListItemText primary={menu} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={() => handbleLogout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="ออกจากระบบ" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {selectedMenu === "หน้าหลัก" && <TableHome />}
        {selectedMenu === "เลือกโปรเจ็ค" && <Project />}
        {selectedMenu === "รายการ" && <ReportTable />}
        {selectedMenu === "แมททีเรียล" && <Material />}
      </Main>
    </Box>
  );
}

export default Home;
