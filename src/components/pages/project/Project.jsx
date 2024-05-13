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
              <TableCell>ลำดับ</TableCell>
              <TableCell>โปรเจ็ค</TableCell>
              <TableCell>รวมวัสดุ</TableCell>
              <TableCell>รวมค่าแรง</TableCell>
              <TableCell>รวมทั้งหมด</TableCell>
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
