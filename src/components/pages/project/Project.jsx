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
import { Button } from "antd";

const Project = () => {
  const [project, setProject] = useState([]);
  const { token, handleOpenReportTable, setEstimateItem } = useContext(Context);

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
      console.log(response.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split(" ")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  const handleButtonClick = (projectId) => {
    setEstimateItem(projectId);
    handleOpenReportTable();
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
              <TableCell align="center">เจ้าของงาน</TableCell>
              <TableCell align="center">วันที่สร้าง</TableCell>
              <TableCell align="center">รวมค่าแรง</TableCell>
              <TableCell align="center">รวมทั้งหมด</TableCell>
              <TableCell align="center">รายระเอียด</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {project.map((project, index) => (
              <TableRow key={project.Id || index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{project.ProjectName}</TableCell>
                <TableCell align="center">{project.Status}</TableCell>
                <TableCell align="center">{project.CreatedBy}</TableCell>
                <TableCell align="center">
                  {formatDate(project.CreatedAt)}
                </TableCell>
                <TableCell align="center">{project.UpdatedAt}</TableCell>
                <TableCell align="center">{project.Id}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleButtonClick(project.Id)}>
                    เพิ่มเติม
                  </Button>
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
