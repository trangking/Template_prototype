import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStlyes from "../home/HomeStyles";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const Material = () => {
  const { styleModalAddproject } = useStlyes();
  const [open, setOpen] = useState(false);
  const [material, setmaterial] = useState([]);
  const [category3s, setcategory3s] = useState([]);
  const [code, setcode] = useState("");
  const token = localStorage.getItem("token");

  const feactDataMaterial = async () => {
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
      setmaterial(material);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = () => {
    setOpen(false);
    feactDataMaterial();
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
      setcategory3s(response.data.Data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    feactDataMaterial();
  }, []);

  return (
    <>
      <div className="header-home">
        <h1>แมททีเรียล</h1>
        <Button className="project-button-home-container">
          + เพิ่มแมททีเรียล
        </Button>
      </div>

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
                  <Button
                    onClick={() => {
                      handleOpen(material.Category3Id);
                    }}
                  >
                    ดูรายละเอียด
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};

export default Material;
