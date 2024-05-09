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
const Project = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>โปรเจ็ค</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>วันที่สร้าง</TableCell>
              <TableCell>อัปเดตล่าสุด</TableCell>
              <TableCell>เจ้าของงาน</TableCell>
              <TableCell>รายระเอียด</TableCell>
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

export default Project;
