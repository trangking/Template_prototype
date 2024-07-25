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
import { message } from "antd";

const PageAddmaterial = ({ onClose }) => {
  const [category3, setCategory3] = useState(0);
  const [category3s, setCategory3s] = useState([]);
  const { token } = useContext(Context);
  const [fields, setFields] = useState([]);
  const [isShowField1, setIsShowField1] = useState(false);
  const [isShowField2, setIsShowField2] = useState(false);
  const [isShowField3, setIsShowField3] = useState(false);
  const [isShowField4, setIsShowField4] = useState(false);
  const [isShowField5, setIsShowField5] = useState(false);
  const [isShowField6, setIsShowField6] = useState(false);
  const [isShowFieldSelect2, setIsShowFieldSelect2] = useState(false);
  const [isShowFieldSelect3, setIsShowFieldSelect3] = useState(false);
  const [isShowFieldSelect4, setIsShowFieldSelect4] = useState(false);
  const [isShowFieldSelect5, setIsShowFieldSelect5] = useState(false);
  const [isShowFieldSelect6, setIsShowFieldSelect6] = useState(false);
  const [selectedFieldId1, setSelectedFieldId1] = useState(0);
  const [selectedFieldId2, setSelectedFieldId2] = useState(0);
  const [selectedFieldId3, setSelectedFieldId3] = useState(0);
  const [selectedFieldId4, setSelectedFieldId4] = useState(0);
  const [selectedFieldId5, setSelectedFieldId5] = useState(0);
  const [selectedFieldId6, setSelectedFieldId6] = useState(0);
  const [isShowSelectButton1, setIsShowSelectButton1] = useState(false);
  const [isShowSelectButton2, setIsShowSelectButton2] = useState(false);
  const [isShowSelectButton3, setIsShowSelectButton3] = useState(false);
  const [isShowSelectButton4, setIsShowSelectButton4] = useState(false);
  const [isShowSelectButton5, setIsShowSelectButton5] = useState(false);
  const [isShowSelectButton6, setIsShowSelectButton6] = useState(false);
  const [isShowSelect1, setIsShowSelect1] = useState(false);
  const [isShowSelect2, setIsShowSelect2] = useState(false);
  const [isShowSelect3, setIsShowSelect3] = useState(false);
  const [isShowSelect4, setIsShowSelect4] = useState(false);
  const [isShowSelect5, setIsShowSelect5] = useState(false);
  const [isShowSelect6, setIsShowSelect6] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [selectData1, setSelectData1] = useState([]);
  const [selectData2, setSelectData2] = useState([]);
  const [selectData3, setSelectData3] = useState([]);
  const [selectData4, setSelectData4] = useState([]);
  const [selectData5, setSelectData5] = useState([]);
  const [selectData6, setSelectData6] = useState([]);
  const [dataId1, setDataId1] = useState(0);
  const [dataId2, setDataId2] = useState(0);
  const [dataId3, setDataId3] = useState(0);
  const [dataId4, setDataId4] = useState(0);
  const [dataId5, setDataId5] = useState(0);
  const [dataId6, setDataId6] = useState(0);
  const [showButtonCreate, setShowButtonCreate] = useState(false);

  useEffect(() => {
    fetchCategory3();
    fetchDataMateiralDetails();
  }, []);

  const handleChangeCategory3 = (event) => {
    setCategory3(event.target.value);
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
      setCategory3s(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchField = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/material_fields/material_fields",
        {
          headers: {
            token: token,
          },
        }
      );
      setFields(response.data.data || []);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  const fetchDataMateiralDetails = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/material_field_details",
        {
          headers: {
            token: token,
          },
        }
      );
      setSelectData(response.data.data);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  const onChangeFields1 = (event) => {
    setIsShowSelectButton1(true);
    const newSelectedFieldId1 = event.target.value;
    setSelectedFieldId1(newSelectedFieldId1);
    const filterdata = selectData.filter(
      (item) => item.MaterialFieldId === newSelectedFieldId1
    );
    setSelectData1(filterdata);
  };

  const onChangeFields2 = (event) => {
    setIsShowSelectButton2(true);
    const newSelectedFieldId2 = event.target.value;
    setSelectedFieldId2(newSelectedFieldId2);
    const filterdata = selectData.filter(
      (item) => item.MaterialFieldId === newSelectedFieldId2
    );
    setSelectData2(filterdata);
  };

  const onChangeFields3 = (event) => {
    setIsShowSelectButton3(true);
    const newSelectedFieldId3 = event.target.value;
    setSelectedFieldId3(newSelectedFieldId3);
    const filterdata = selectData.filter(
      (item) => item.MaterialFieldId === newSelectedFieldId3
    );
    setSelectData3(filterdata);
  };
  const onChangeFields4 = (event) => {
    setIsShowSelectButton4(true);
    const newSelectedFieldId4 = event.target.value;
    setSelectedFieldId4(newSelectedFieldId4);
    const filterdata = selectData.filter(
      (item) => item.MaterialFieldId === newSelectedFieldId4
    );
    setSelectData4(filterdata);
  };
  const onChangeFields5 = (event) => {
    setIsShowSelectButton5(true);
    const newSelectedFieldId5 = event.target.value;
    setSelectedFieldId5(newSelectedFieldId5);
    const filterdata = selectData.filter(
      (item) => item.MaterialFieldId === newSelectedFieldId5
    );
    setSelectData5(filterdata);
  };
  const onChangeFields6 = (event) => {
    setIsShowSelectButton6(true);
    const newSelectedFieldId6 = event.target.value;
    setSelectedFieldId6(newSelectedFieldId6);
    const filterdata = selectData.filter(
      (item) => item.MaterialFieldId === newSelectedFieldId6
    );
    setSelectData6(filterdata);
  };

  const onChangeDataSelect1 = (event) => {
    setDataId1(event.target.value);
    setIsShowField2(true);
  };
  const onChangeDataSelect2 = (event) => {
    setDataId2(event.target.value);
    setIsShowField3(true);
  };
  const onChangeDataSelect3 = (event) => {
    setDataId3(event.target.value);
    setIsShowField4(true);
  };
  const onChangeDataSelect4 = (event) => {
    setDataId4(event.target.value);
    setIsShowField5(true);
  };
  const onChangeDataSelect5 = (event) => {
    setDataId5(event.target.value);
    setIsShowField6(true);
  };
  const onChangeDataSelect6 = (event) => {
    setDataId6(event.target.value);
    setShowButtonCreate(true);
  };

  const toggleField = () => {
    setIsShowField1((prev) => !prev);
    if (!isShowField1) {
      fetchField();
    }
  };

  const CreateMaterial = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8080/user/v1/daijai/material/create",
        {
          category3Id: category3,
          code: [dataId1, dataId2, dataId3, dataId4, dataId5, dataId6],
        },
        {
          headers: {
            token: token,
          },
        }
      );
      message.success("สร้างสำเร็จ");
      onClose();
    } catch (error) {
      console.log();
    }
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
              <TableCell align="center">category3</TableCell>
              <TableCell align="center">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="category3-select-label">เลือก</InputLabel>
                  <Select
                    labelId="category3-select-label"
                    id="category3-select"
                    value={category3}
                    onChange={handleChangeCategory3}
                    input={<OutlinedInput label="Name" />}
                  >
                    {category3s.map((category3) => (
                      <MenuItem key={category3.Id} value={category3.Id}>
                        {category3.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                {isShowField1 ? (
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="field-select-label">เลือก</InputLabel>
                    <Select
                      labelId="field-select-label"
                      id="field-select"
                      value={selectedFieldId1}
                      onChange={onChangeFields1}
                      input={<OutlinedInput label="Name" />}
                    >
                      {fields.map((field) => (
                        <MenuItem key={field.Id} value={field.Id}>
                          {field.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Button onClick={toggleField}>+ เพิ่มฟิวล์</Button>
                )}
              </TableCell>
              <TableCell align="center">
                {isShowSelectButton1 &&
                  (isShowSelect1 ? (
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="field-select-label">เลือก</InputLabel>
                      <Select
                        labelId="field-select-label"
                        id="field-select"
                        value={dataId1}
                        onChange={onChangeDataSelect1}
                        input={<OutlinedInput label="Name" />}
                      >
                        {selectData1.map((item) => (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Button onClick={() => setIsShowSelect1(true)}>
                      + เพิ่มฟิวล์
                    </Button>
                  ))}
              </TableCell>
            </TableRow>
          </TableBody>
          {isShowField2 && (
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  {isShowFieldSelect2 ? (
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="field-select-label">เลือก</InputLabel>
                      <Select
                        labelId="field-select-label"
                        id="field-select"
                        value={selectedFieldId2}
                        onChange={onChangeFields2}
                        input={<OutlinedInput label="Name" />}
                      >
                        {fields.map((item) => (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Button onClick={() => setIsShowFieldSelect2(true)}>
                      + เพิ่มฟิวล์
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  {isShowSelectButton2 &&
                    (isShowSelect2 ? (
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="field-select-label">เลือก</InputLabel>
                        <Select
                          labelId="field-select-label"
                          id="field-select"
                          value={dataId2}
                          onChange={onChangeDataSelect2}
                          input={<OutlinedInput label="Name" />}
                        >
                          {selectData2.map((item) => (
                            <MenuItem key={item.Id} value={item.Id}>
                              {item.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Button onClick={() => setIsShowSelect2(true)}>
                        + เพิ่มฟิวล์
                      </Button>
                    ))}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {isShowField3 && (
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  {isShowFieldSelect3 ? (
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="field-select-label">เลือก</InputLabel>
                      <Select
                        labelId="field-select-label"
                        id="field-select"
                        value={selectedFieldId3}
                        onChange={onChangeFields3}
                        input={<OutlinedInput label="Name" />}
                      >
                        {fields.map((item) => (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Button
                      align="center"
                      onClick={() => setIsShowFieldSelect3(true)}
                    >
                      + เพิ่มฟิวล์
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  {isShowSelectButton3 &&
                    (isShowSelect3 ? (
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="field-select-label">เลือก</InputLabel>
                        <Select
                          labelId="field-select-label"
                          id="field-select"
                          value={dataId3}
                          onChange={onChangeDataSelect3}
                          input={<OutlinedInput label="Name" />}
                        >
                          {selectData3.map((item) => (
                            <MenuItem key={item.Id} value={item.Id}>
                              {item.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Button onClick={() => setIsShowSelect3(true)}>
                        + เพิ่มฟิวล์
                      </Button>
                    ))}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {isShowField4 && (
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  {isShowFieldSelect4 ? (
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="field-select-label">เลือก</InputLabel>
                      <Select
                        labelId="field-select-label"
                        id="field-select"
                        value={selectedFieldId4}
                        onChange={onChangeFields4}
                        input={<OutlinedInput label="Name" />}
                      >
                        {fields.map((item) => (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Button
                      align="center"
                      onClick={() => setIsShowFieldSelect4(true)}
                    >
                      + เพิ่มฟิวล์
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  {isShowSelectButton4 &&
                    (isShowSelect4 ? (
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="field-select-label">เลือก</InputLabel>
                        <Select
                          labelId="field-select-label"
                          id="field-select"
                          value={dataId4}
                          onChange={onChangeDataSelect4}
                          input={<OutlinedInput label="Name" />}
                        >
                          {selectData4.map((item) => (
                            <MenuItem key={item.Id} value={item.Id}>
                              {item.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Button onClick={() => setIsShowSelect4(true)}>
                        + เพิ่มฟิวล์
                      </Button>
                    ))}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {isShowField5 && (
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  {isShowFieldSelect5 ? (
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="field-select-label">เลือก</InputLabel>
                      <Select
                        labelId="field-select-label"
                        id="field-select"
                        value={selectedFieldId5}
                        onChange={onChangeFields5}
                        input={<OutlinedInput label="Name" />}
                      >
                        {fields.map((item) => (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Button
                      align="center"
                      onClick={() => setIsShowFieldSelect5(true)}
                    >
                      + เพิ่มฟิวล์
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  {isShowSelectButton5 &&
                    (isShowSelect5 ? (
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="field-select-label">เลือก</InputLabel>
                        <Select
                          labelId="field-select-label"
                          id="field-select"
                          value={dataId5}
                          onChange={onChangeDataSelect5}
                          input={<OutlinedInput label="Name" />}
                        >
                          {selectData5.map((item) => (
                            <MenuItem key={item.Id} value={item.Id}>
                              {item.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Button onClick={() => setIsShowSelect5(true)}>
                        + เพิ่มฟิวล์
                      </Button>
                    ))}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {isShowField6 && (
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  {isShowFieldSelect6 ? (
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="field-select-label">เลือก</InputLabel>
                      <Select
                        labelId="field-select-label"
                        id="field-select"
                        value={selectedFieldId6}
                        onChange={onChangeFields6}
                        input={<OutlinedInput label="Name" />}
                      >
                        {fields.map((item) => (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Button
                      align="center"
                      onClick={() => setIsShowFieldSelect6(true)}
                    >
                      + เพิ่มฟิวล์
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  {isShowSelectButton6 &&
                    (isShowSelect6 ? (
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="field-select-label">เลือก</InputLabel>
                        <Select
                          labelId="field-select-label"
                          id="field-select"
                          value={dataId6}
                          onChange={onChangeDataSelect6}
                          input={<OutlinedInput label="Name" />}
                        >
                          {selectData6.map((item) => (
                            <MenuItem key={item.Id} value={item.Id}>
                              {item.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Button onClick={() => setIsShowSelect6(true)}>
                        + เพิ่มฟิวล์
                      </Button>
                    ))}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {showButtonCreate && (
        <div className="Footer">
          <Button
            variant="contained"
            onClick={CreateMaterial}
            className="ButtonMA"
          >
            สร้างแมทีเรียล
          </Button>
        </div>
      )}
    </>
  );
};

export default PageAddmaterial;
