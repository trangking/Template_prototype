import React, { useContext } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { Context } from "../pages/home/Home";
import { message } from "antd";

function ProjectButton({ nameNewProject, handleClose }) {
  const user = useContext(Context);
  const token = localStorage.getItem("token");

  const addProject = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8080/user/v1/daijai/projects/create",
        {
          projectName: nameNewProject,
          createdBy: user.FirstName,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      message.success("เพิ่มโปรเจคสำเร็จ");
      handleClose();
    } catch (error) {
      console.error("There was an error creating the project:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={addProject}
    >
      <Typography variant="button">สร้างโปรเจค</Typography>
    </Button>
  );
}

export default ProjectButton;
