import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import TableCellButton from "../../buttons/TableCellButton";
  import ProjectButton from "../../buttons/ProjectButton";
  import React from "react";
  import "../../styles/Home.css"

  const TableHome = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <div className="header-home">
                <h1>โปรเจค</h1>
                <ProjectButton
                    className="project-button-home-container"
                    onClick={() => setOpen(!open)}
                >
                    เพิ่มโปรเจค
                </ProjectButton>
            </div>
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
                            <TableCellButton>เพิ่มเติม</TableCellButton>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
  };

export default TableHome;
  