'use client';

import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Snackbar, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';

interface CreateNewQuizProps {
    open: boolean;
    onClose: () => void;
    onAdd: (quiz: { quizName: string; helpingName: string }) => void;
}

export default function CreateNewQuiz({ open, onClose, onAdd }: CreateNewQuizProps) {
    const [formData, setFormData] = useState({ quizName: '', helpingName: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.quizName || !formData.helpingName) return;

        const newQuiz = {
            quizName: formData.quizName,
            helpingName: formData.helpingName
        };
        console.log('New Quiz Data:', newQuiz);
        onAdd(newQuiz);
        setOpenSnackbar(true);
        setFormData({ quizName: '', helpingName: '' });
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={modalStyle}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <Close />
                    </IconButton>

                    <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                        Create New Quiz
                    </Typography>

                    <TextField
                        fullWidth
                        label="Quiz Name"
                        name="quizName"
                        value={formData.quizName}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Helping Name"
                        name="helpingName"
                        value={formData.helpingName}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2 }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ py: 1.5, backgroundColor: '#1976d2' }}
                    >
                        Add
                    </Button>
                </Box>
            </Modal>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
                    New quiz created successfully
                </Alert>
            </Snackbar>
        </>
    );
}