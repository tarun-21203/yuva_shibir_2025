'use client';

import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Snackbar, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';

interface AddQuestionProps {
    open: boolean;
    onClose: () => void;
    quiz: any;
    onAddQuestion: (quizId: number) => void;
}

export default function AddQuestion({ open, onClose, quiz, onAddQuestion }: AddQuestionProps) {
    const [formData, setFormData] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.question || !formData.option1 || !formData.option2 ||
            !formData.option3 || !formData.option4) return;

        const questionData = {
            quizId: quiz.quizId,
            question: formData.question,
            option1: formData.option1,
            option2: formData.option2,
            option3: formData.option3,
            option4: formData.option4,
            correctOption: formData.option1
        };
        console.log('New Question Data:', questionData);
        onAddQuestion(quiz.quizId);
        setOpenSnackbar(true);
        setFormData({ question: '', option1: '', option2: '', option3: '', option4: '' });
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
                        Add Question to {quiz.quizName}
                    </Typography>

                    <TextField
                        fullWidth
                        label="Question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Option 1 (Correct)"
                        name="option1"
                        value={formData.option1}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderColor: 'green' } }}
                        helperText="Correct Option"
                    />

                    <TextField
                        fullWidth
                        label="Option 2"
                        name="option2"
                        value={formData.option2}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderColor: 'red' } }}
                    />

                    <TextField
                        fullWidth
                        label="Option 3"
                        name="option3"
                        value={formData.option3}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderColor: 'red' } }}
                    />

                    <TextField
                        fullWidth
                        label="Option 4"
                        name="option4"
                        value={formData.option4}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderColor: 'red' } }}
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
                onClose={() => {
                    setOpenSnackbar(false);
                    onClose(); // Close the modal after snackbar hides
                }}
                anchorOrigin={{ vertical:'top', horizontal:'center' }}
            >
                <Alert
                    severity="success"
                    onClose={() => {
                        setOpenSnackbar(false);
                        onClose();
                    }}
                >
                    Successfully question added
                </Alert>
            </Snackbar>
        </>
    );
}