import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Axios from "axios";
import { Context } from "../home/Home";

const PageAddReport = ({ onClose }) => {
  const { token } = useContext(Context);
  const [projects, setProjects] = useState([]);
  const [selectedProjectID, setSelectedProjectID] = useState("");

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
      setProjects(response.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProject = (event) => {
    setSelectedProjectID(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <IconButton onClick={onClose}>
        <ArrowBackIcon />
      </IconButton>
      <h1>เพิ่มรายการ</h1>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="field-select-label">เลือก</InputLabel>
        <Select
          labelId="field-select-label"
          id="field-select"
          value={selectedProjectID}
          onChange={handleChangeProject}
          input={<OutlinedInput label="เลือก" />}
        >
          {projects.map((project) => (
            <MenuItem key={project.ID} value={project.ID}>
              {project.ProjectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default PageAddReport;
