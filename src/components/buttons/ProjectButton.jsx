import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

function ProjectButton() {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
        >
            <Typography variant="button">สร้างโปรเจค</Typography>
        </Button>
    );
}

export default ProjectButton;