import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import ButtonTableCell from "../../Button/ButtonTableCell";
  import ProjectButton from "../../Button/ProjectButton";
  import React from "react";
  const TableHome = () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <ProjectButton
          className="project-button-container"
          onClick={() => setOpen(!open)}
        >
          เพิ่มโปรเจค
        </ProjectButton>
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
                <ButtonTableCell>เพิ่มเติม</ButtonTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  
  export default TableHome;
  