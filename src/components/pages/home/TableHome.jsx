import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableCellButton from "../../buttons/TableCellButton";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../../styles/Home.css";
import Axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ProjectButton from "../../buttons/ProjectButton";
import useStlyes from "./HomeStyles";
import "../../styles/ModalAddproject.css";

const TableHome = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState([]);
  const handleOpen = () => setOpen(true);

  const [nameNewProject, setnameNewProject] = useState("");
  const { styleModalAddproject } = useStlyes();

  useEffect(() => {
    fetchData();
  }, [token]);
  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/projects",
        {
          headers: {
            token: token,
          },
        }
      );
      setProject(response.data.project);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
    fetchData();
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split(" ")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  const handleNameChange = (event) => {
    setnameNewProject(event.target.value);
  };

  return (
    <>
      <div className="header-home">
        <h1>โปรเจ็ค</h1>
        <Button className="project-button-home-container" onClick={handleOpen}>
          + เพิ่มโปรเจ็ค
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">โปรเจ็ค</TableCell>
              <TableCell align="center">สถานะ</TableCell>
              <TableCell align="center">วันที่สร้าง</TableCell>
              <TableCell align="center">อัปเดตล่าสุด</TableCell>
              <TableCell align="center">เจ้าของงาน</TableCell>
              <TableCell align="center">รายระเอียด</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {project.map((project) => (
              <TableRow key={project.ID}>
                <TableCell align="center">{project.ProjectName}</TableCell>
                <TableCell align="center">{project.Status}</TableCell>
                <TableCell align="center">
                  {formatDate(project.CreatedAt)}
                </TableCell>
                <TableCell align="center">{project.UpdatedAt}</TableCell>
                <TableCell align="center">{project.CreatedBy}</TableCell>
                <TableCellButton align="center">เพิ่มเติม</TableCellButton>
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
              เพิ่มโปรเจค
            </Typography>
            <TextField
              label={"ชื่อโปรเจ็ค"}
              id="margin-normal"
              margin="normal"
              onChange={handleNameChange}
              value={nameNewProject}
            />
            <ProjectButton
              nameNewProject={nameNewProject}
              handleClose={handleClose}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TableHome;
