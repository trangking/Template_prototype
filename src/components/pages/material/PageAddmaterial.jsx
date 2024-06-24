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
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/pageAddmaterial.css";
import Axios from "axios";
import { Context } from "../home/Home";
import OutlinedInput from "@mui/material/OutlinedInput";

const PageAddmaterial = ({ onClose }) => {
  const [materialField, setmaterialField] = useState([]);
  const [selectedCategory3, setSelectedCategory3] = useState([]);
  const [isAddingField, setIsAddingField] = useState(false);
  const [isAddingField1, setIsAddingField1] = useState(false);
  const [category3, setCategory3] = useState([]);
  const [selectedField1, setselectedField1] = useState([]);
  const { token } = useContext(Context);

  useEffect(() => {
    fetchFieldMaterial();
    fetchCategory3();
  }, []);

  const fetchFieldMaterial = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/material_fields/material_fields",
        {
          headers: {
            token: token,
          },
        }
      );
      setmaterialField(response.data.data);
      console.log(response.data.data);
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

  const handleCategory3Change = (e) => {
    setSelectedCategory3(e.target.value);
  };
  const handleAddField = () => {
    setIsAddingField(true);
  };
  const onchangeField = async (value) => {
    const response = await Axios.get(
      `http://localhost:8080/user/v1/daijai/material_field_details/${value}`,
      {
        headers: {
          token: token,
        },
      }
    );
    setselectedField1([response.data.data]);
    setIsAddingField1(true);
    console.log(value);
  };

  return (
    <>
      <IconButton onClick={onClose}>
        <ArrowBackIcon />
      </IconButton>
      <h1>เพิ่มแมททีเรียล</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Category 3</TableCell>
              <TableCell align="center">
                <FormControl sx={{ m: 1, minWidth: 280 }} size="small">
                  {isAddingField ? (
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      onChange={(e) => onchangeField(e.target.value)}
                    >
                      {materialField.map((field) => (
                        <MenuItem key={field.Id} value={field.Id}>
                          {field.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Button
                      className="project-button-home-container"
                      onClick={handleAddField}
                    >
                      + เพิ่มฟิวน์
                    </Button>
                  )}
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label">เลือก</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedCategory3}
                    onChange={handleCategory3Change}
                    input={<OutlinedInput label="Name" />}
                  >
                    {category3.map((category) => (
                      <MenuItem key={category.Id} value={category.Id}>
                        {category.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="center">
                {isAddingField1 ? (
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedField1[0]?.Id} // Access the first element of the array
                    onChange={(e) =>
                      setselectedField1([{ Id: e.target.value }])
                    } // Set selectedField1 as an array with a single object
                  >
                    {selectedField1.map((field) => (
                      <MenuItem key={field.Id} value={field.Id}>
                        {field.Name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PageAddmaterial;
