import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import React from "react";
import ReportButton from "../../buttons/ReportButton";
import "../../styles/Report.css";
const ReportTable = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="header-report">
        <h1>รายการ</h1>
        <ReportButton className="report-button-container"></ReportButton>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>รายการ</TableCell>
              <TableCell>ปริมาณ</TableCell>
              <TableCell>หน่วย</TableCell>
              <TableCell>ค่าวัสดุ(บาท)</TableCell>
              <TableCell>ค่าแรง(บาท)</TableCell>
              <TableCell>รวมทั้งหมด(บาท)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReportTable;
