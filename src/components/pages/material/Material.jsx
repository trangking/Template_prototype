import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Box, Typography, Modal } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import Axios from "axios";
import { Context } from "../home/Home";
import useStlyes from "../home/HomeStyles";
import "../../styles/Table.css";
import AddIcon from "@mui/icons-material/Add";
import { message } from "antd";
const Material = ({ onAdd }) => {
  const { styleModalAddproject } = useStlyes();
  const { token } = useContext(Context);
  const [tabIndex, setTabIndex] = useState(0);
  const [material, setMaterial] = useState([]);
  const [category3s, setCategory3s] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [open, setOpen] = useState(false);
  const [openaddCategory, setopenaddCategory] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const [CategoryCode, setCategoryCode] = useState("");

  const fetchDataMaterial = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/material/materials",
        {
          headers: {
            token: token,
          },
        }
      );
      const material = response.data.data || "";
      setMaterial(material);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory3 = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/category_3s/category_3s",
        {
          headers: {
            token: token,
          },
        }
      );
      const Category3 = response.data.data;
      setCategory3(Category3);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setopenaddCategory(false);
    fetchDataMaterial();
    fetchCategory3();
  };

  const handleOpen = async (materialID) => {
    setOpen(true);
    try {
      const response = await Axios.get(
        `http://localhost:8080/user/v1/daijai/category_3s/${materialID}`,
        {
          headers: {
            token: token,
          },
        }
      );
      setCategory3s(response.data.Data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataMaterial();
    fetchCategory3();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleAddMaterialClick = () => {
    onAdd(category3);
  };
  const handleAddCategory = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8080/user/v1/daijai/category_3s/create",
        {
          name: CategoryName,
          code: CategoryCode,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      handleClose();
      console.log(response.data);
      message.success("สร้างเสร็จสิ้น");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="header-home">
        <h1>แมททีเรียล</h1>
        <Button
          className="project-button-home-container"
          onClick={handleAddMaterialClick}
        >
          + เพิ่มแมททีเรียล
        </Button>
      </div>

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Material" />
        <Tab label="Category#3" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {tabIndex === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">CODE</TableCell>
                  <TableCell align="center">Descripition</TableCell>
                  <TableCell align="center">Category#3</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {material.map((material) => (
                  <TableRow key={material.Id}>
                    <TableCell align="center">{material.Id}</TableCell>
                    <TableCell align="center">{material.Code}</TableCell>
                    <TableCell align="center">{material.Description}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleOpen(material.Category3Id)}>
                        ดูรายละเอียด
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModalAddproject}>
            <div className="AreaModal">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Category in Matrial
              </Typography>
              <TextField
                label="ชื่อโปรเจ็ค"
                id="margin-normal"
                margin="normal"
                value={category3s?.Name || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="โค้ด"
                id="margin-normal"
                margin="normal"
                value={category3s?.Code || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Box>
        </Modal>

        {tabIndex === 1 && (
          <>
            <div className="AreaTable">
              <Button
                onClick={() => {
                  setopenaddCategory(true);
                }}
              >
                + Category
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">CODE</TableCell>
                      <TableCell align="center">Descripition</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {category3.map((material) => (
                      <TableRow key={material.Id}>
                        <TableCell align="center">{material.Id}</TableCell>
                        <TableCell align="center">{material.Name}</TableCell>
                        <TableCell align="center">{material.Code}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Modal open={openaddCategory} onClose={handleClose}>
              <Box sx={styleModalAddproject}>
                <div className="AreaModal">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Add Category
                  </Typography>
                  <TextField
                    label="ชื่อหมวดหมู่"
                    id="margin-normal"
                    margin="normal"
                    value={CategoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <TextField
                    label="โค้ดหมวดหมู่"
                    id="margin-normal"
                    margin="normal"
                    value={CategoryCode}
                    onChange={(e) => setCategoryCode(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddCategory}
                  >
                    <Typography variant="button">สร้างหมวดหมู่</Typography>
                  </Button>
                </div>
              </Box>
            </Modal>
          </>
        )}
      </Box>
    </>
  );
};

export default Material;
