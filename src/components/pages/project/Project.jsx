import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Context } from "../home/Home";
import TableCellButton from "../../buttons/TableCellButton";
import { Button } from "antd";
const Project = () => {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState([]);
  const { token } = useContext(Context);
  useEffect(() => {
    fetchData();
  }, []);

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

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split(" ")[0].split("-");
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <h1>เลือกโปรเจ็ค</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ลำดับ</TableCell>
              <TableCell align="center">โปรเจ็ค</TableCell>
              <TableCell align="center">รวมวัสดุ</TableCell>
              <TableCell align="center">รวมค่าแรง</TableCell>
              <TableCell align="center">รวมทั้งหมด</TableCell>
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
                <TableCell align="center">
                  <Button>เพิ่มเติม</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Project;
