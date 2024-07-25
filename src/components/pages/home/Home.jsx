import React, { useEffect, useState, createContext } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  AssignmentOutlined as AssignmentOutlinedIcon,
  Engineering as EngineeringIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { notification } from "antd";
import useStyles from "./HomeStyles";
import TableHome from "./TableHome";
import Project from "../project/Project";
import Material from "../material/Material";
import ReportTable from "../report/ReportTable";
import PageAddmaterial from "../material/PageAddmaterial";
import PageAddReport from "../report/PageAddReport";

export const Context = createContext();

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("หน้าหลัก");
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showAddEstimate, setShowAddEstimate] = useState(false);
  const [showReportTable, setShowReportTable] = useState(false);
  const { drawerWidth, Main, AppBar, DrawerHeader } = useStyles();
  const location = useLocation();
  const token = location.state.token;
  const [user, setUser] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [estimateitem, setEstimateItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:8084/user/v1/daijai/profile",
          {
            headers: {
              token: token,
            },
          }
        );
        setUser(response.data.user);
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
    if (!showAddMaterial && !showAddEstimate && !showReportTable) {
      setSelectedMenu(menu);
      setOpen(false);
    }
  };

  const handleLogout = () => {
    navigate("/Login");
    notification.success({
      message: "สำเร็จ",
      description: "ออกจากระบบสำเร็จ",
    });
  };

  const handleOpenAddMaterial = () => {
    setShowAddMaterial(true);
  };

  const handleCloseAddMaterial = () => {
    setShowAddMaterial(false);
  };
  const handleOpenAddEstimate = () => {
    setShowAddEstimate(true);
    setShowReportTable(false); // Ensure ReportTable is not shown
  };
  const handleCloseAddEstimate = () => {
    setShowAddEstimate(false);
  };

  const handleOpenReportTable = () => {
    setShowReportTable(true);
    setShowAddEstimate(false); // Ensure AddEstimate is not shown
  };

  const handleCloseReportTable = () => {
    setShowReportTable(false);
  };

  return (
    <Context.Provider
      value={{
        user,
        token,
        category3,
        setCategory3,
        estimateitem,
        setEstimateItem,
        handleOpenReportTable,
        handleOpenAddEstimate,
      }}
    >
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
            {["หน้าหลัก", "เลือกโปรเจ็ค", "รายการ", "แมททีเรียล"].map(
              (menu) => (
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
              )
            )}
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={handleLogout}>
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
          {showAddMaterial && (
            <PageAddmaterial onClose={handleCloseAddMaterial} />
          )}
          {showAddEstimate && (
            <PageAddReport onClose={handleCloseAddEstimate} />
          )}
          {showReportTable && <ReportTable onAdd={handleOpenAddEstimate} />}
          {!showAddMaterial && !showAddEstimate && !showReportTable && (
            <>
              {selectedMenu === "หน้าหลัก" && <TableHome />}
              {selectedMenu === "เลือกโปรเจ็ค" && <Project />}
              {selectedMenu === "รายการ" && (
                <ReportTable onAdd={handleOpenAddEstimate} />
              )}
              {selectedMenu === "แมททีเรียล" && (
                <Material onAdd={handleOpenAddMaterial} />
              )}
            </>
          )}
        </Main>
      </Box>
    </Context.Provider>
  );
}

export default Home;
