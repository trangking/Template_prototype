import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "antd";
import Axios from "axios";
import { Context } from "../home/Home";
import "../../styles/Report.css";

const ReportTable = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const { token } = useContext(Context);
  const [report, setReport] = useState([]);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        // "http://localhost:8080/user/v1/daijai/estimate_item_material/estimate_item_materials",
        {
          headers: {
            token: token,
          },
        }
      );
      setReport(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="header-report">
        <h1>รายการ</h1>
        <Button onClick={onAdd}>+ สร้างรายการ</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ลำดับ</TableCell>
              <TableCell align="center">รายการ</TableCell>
              <TableCell align="center">ปริมาณ</TableCell>
              <TableCell align="center">หน่วย</TableCell>
              <TableCell align="center">ค่าวัสดุ(บาท)</TableCell>
              <TableCell align="center">ค่าแรง(บาท)</TableCell>
              <TableCell align="center">รวมทั้งหมด(บาท)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((reportItem, index) => (
              <TableRow key={reportItem.Id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {reportItem.EstimateItem.Name}
                </TableCell>
                <TableCell align="center">{reportItem.Quantity}</TableCell>
                <TableCell align="center">{reportItem.MaterialUnit}</TableCell>
                <TableCell align="center">
                  {reportItem.MaterialAmount}
                </TableCell>
                <TableCell align="center">{reportItem.LaborCost}</TableCell>
                <TableCell align="center">{reportItem.TotalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReportTable;
