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

const Material = ({ onAdd }) => {
  const { styleModalAddproject } = useStlyes();
  const { token } = useContext(Context);
  const [tabIndex, setTabIndex] = useState(0);
  const [material, setMaterial] = useState([]);
  const [category3s, setCategory3s] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [open, setOpen] = useState(false);

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
    fetchDataMaterial();
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
        )}
      </Box>
    </>
  );
};

export default Material;
