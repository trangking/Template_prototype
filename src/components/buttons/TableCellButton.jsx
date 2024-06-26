import React from 'react';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';


const TableCellButton = ({ children, ...props }) => {
    return (
        <TableCell {...props}>
            <Button variant="contained" color="primary">
                {children}
            </Button>
        </TableCell>
    );
};

export default TableCellButton;