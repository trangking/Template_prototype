import React, { useContext, useEffect, useState } from "react";
import {
  Select,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Chip,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Axios from "axios";
import { Context } from "../home/Home";
import "../../styles/pageAddreport.css";
import { message, Row } from "antd";

const PageAddReport = ({ onClose }) => {
  const { token } = useContext(Context);
  const [projects, setProjects] = useState([]);
  const [selectedProjectID, setSelectedProjectID] = useState("");
  const [estimateItemType, setEstimateItemType] = useState([]);
  const [selectedEstimateItemTypeID, setSelectedEstimateItemTypeID] =
    useState(0);
  const [selectedEstimateItemID, setSelectedEstimateItemID] = useState(0);
  const [estimateItemTypeName, setEstimateItemTypeName] = useState("");
  const [estimateItemName, setEstimateItemName] = useState("");
  const [estimateCode, setEstimateCode] = useState("");
  const [estimatePrice, setEstimatePrice] = useState("");
  const [estimateItem, setEstimateItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [materialID, setMaterialID] = useState([]);
  const [material, setMaterial] = useState([]);
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

  const fetchEstimateType = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/estimate_item_type/estimateitemtypes",
        {
          headers: {
            token: token,
          },
        }
      );
      setEstimateItemType(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEstimateItem = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/estimate_item/estimateitems",
        {
          headers: {
            token: token,
          },
        }
      );
      setEstimateItem(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

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
      const material = response.data.data;
      setMaterial(material);
    } catch (err) {
      console.log(err);
    }
  };

  const createEstimateType = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8080/user/v1/daijai/estimate_item_type/create",
        {
          name: estimateItemTypeName,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status === 200) {
        message.success("สร้างประเภทเสร็จสิ้น");
        fetchEstimateType();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createEstimateItem = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8080/user/v1/daijai/estimate_item/create",
        {
          estimate_item_type_id: selectedEstimateItemTypeID,
          name: estimateItemName,
          code: estimateCode,
          price: parseInt(estimatePrice, 10),
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status === 200) {
        message.success("สร้างรายการสำเร็จ");
        fetchEstimateItem();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeEstimateType = (event) => {
    setSelectedEstimateItemTypeID(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenAddEstimate = () => {
    setOpenAddItem(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddItem(false);
  };

  const handleCloseAddItemType = () => {
    setOpen(false);
  };

  const handleChangeMaterialID = (event) => {
    const { value } = event.target;
    setMaterialID(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetchData();
    fetchEstimateType();
    fetchEstimateItem();
    fetchDataMaterial();
  }, []);

  return (
    <div>
      <IconButton onClick={onClose}>
        <ArrowBackIcon />
      </IconButton>
      <h1>เพิ่มรายการ</h1>
      <div className="AreaEstimate">
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="project-select-label">เลือกโปรเจค</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={selectedProjectID}
            onChange={(event) => {
              setSelectedProjectID(event.target.value);
            }}
            input={<OutlinedInput label="เลือกโปรเจค" />}
          >
            {projects.map((project) => (
              <MenuItem key={project.ID} value={project.ID}>
                {project.ProjectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{ marginTop: 5, marginLeft: 23, flexDirection: "row" }}
        >
          <InputLabel id="estimate-type-select-label">เลือกรายการ</InputLabel>
          <Select
            labelId="estimate-type-select-label"
            id="estimate-type-select"
            value={selectedEstimateItemID}
            onChange={(event) => {
              setSelectedEstimateItemID(event.target.value);
            }}
            input={<OutlinedInput label="เลือกรายการ" />}
            sx={{ width: 300 }}
          >
            {estimateItem.map((item) => (
              <MenuItem key={item.Id} value={item.Id} sx={{ width: 300 }}>
                {item.Name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpenAddEstimate}
            sx={{ marginLeft: 1, fontSize: 20 }}
          >
            +
          </Button>
        </FormControl>
        <FormControl
          sx={{ marginTop: 5, marginLeft: 46, flexDirection: "row" }}
        >
          <InputLabel id="material-id-label">ใส่ Material ID</InputLabel>
          <Select
            labelId="material-id-label"
            id="material-id"
            multiple
            value={materialID}
            onChange={handleChangeMaterialID}
            input={<OutlinedInput label="ใส่ Material ID" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            sx={{ width: 500 }}
          >
            {material.map((item) => (
              <MenuItem key={item.Id} value={item.Id} sx={{ width: 500 }}>
                {item.Description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"สร้างรายการ"}</DialogTitle>
        <DialogContent>
          <DialogContentText>โปรดกรอกชื่อรายการ</DialogContentText>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="new-estimate-type">ใส่ชื่อรายการ</InputLabel>
            <OutlinedInput
              id="new-estimate-type"
              label="Estimate Type Name"
              value={estimateItemTypeName}
              onChange={(e) => setEstimateItemTypeName(e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddItemType} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={createEstimateType} color="primary">
            เพิ่ม
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddItem} onClose={handleClose}>
        <DialogTitle>{"สร้างรายการ"}</DialogTitle>
        <DialogContent>
          <DialogContentText>โปรดกรอกข้อมูลต่อไปนี้</DialogContentText>
          <FormControl
            fullWidth
            margin="normal"
            sx={{
              flexDirection: "row",
            }}
          >
            <InputLabel id="estimate-type-select-label">เลือกประเภท</InputLabel>
            <Select
              labelId="estimate-type-select-label"
              id="estimate-type-select"
              value={selectedEstimateItemTypeID}
              onChange={(event) => {
                setSelectedEstimateItemTypeID(event.target.value);
              }}
              input={<OutlinedInput label="เลือกประเภท" />}
              sx={{ width: 500 }}
            >
              {estimateItemType.map((item) => (
                <MenuItem key={item.Id} value={item.Id}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{ marginLeft: 1, fontSize: 20 }}
            >
              +
            </Button>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="ใส่ชื่อรายการ"
              value={estimateItemName}
              onChange={(e) => setEstimateItemName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="ใส่โค้ด"
              value={estimateCode}
              onChange={(e) => setEstimateCode(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="ใส่ราคา"
              value={estimatePrice}
              onChange={(e) => setEstimatePrice(e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={createEstimateItem} color="primary">
            เพิ่ม
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PageAddReport;
