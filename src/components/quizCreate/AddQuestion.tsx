'use client';

import { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface AddQuestionProps {
    open: boolean;
    onClose: () => void;
    quiz: any;
    onAddQuestion: (questionData: any) => void;
    initialQuestion?: any;
    onSuccess?: () => void; // New callback for success
}

export default function AddQuestion({ open, onClose, quiz, onAddQuestion, initialQuestion, onSuccess }: AddQuestionProps) {
    const [formData, setFormData] = useState({
        questionId: initialQuestion?.questionId || undefined,
        question: initialQuestion?.question || '',
        option1: initialQuestion?.option1 || '',
        option2: initialQuestion?.option2 || '',
        option3: initialQuestion?.option3 || '',
        option4: initialQuestion?.option4 || '',
        correctOption: initialQuestion?.correctOption || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditing = !!initialQuestion;

    useEffect(() => {
        console.log('AddQuestion: initialQuestion changed', initialQuestion);
        if (initialQuestion) {
            setFormData({
                questionId: initialQuestion.questionId,
                question: initialQuestion.question,
                option1: initialQuestion.option1,
                option2: initialQuestion.option2,
                option3: initialQuestion.option3,
                option4: initialQuestion.option4,
                correctOption: initialQuestion.correctOption
            });
        } else {
            setFormData({
                questionId: undefined,
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                correctOption: ''
            });
        }
    }, [initialQuestion]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.question || !formData.option1 || !formData.option2 ||
            !formData.option3 || !formData.option4) {
            console.log('AddQuestion: Validation failed', formData);
            return;
        }

        const questionData = {
            quizId: quiz.quizId,
            questionId: formData.questionId,
            question: formData.question,
            option1: formData.option1,
            option2: formData.option2,
            option3: formData.option3,
            option4: formData.option4,
            correctOption: formData.option1
        };
        console.log(isEditing ? 'AddQuestion: Updating question' : 'AddQuestion: Adding question', questionData);
        setIsSubmitting(true);
        onAddQuestion(questionData);
        if (onSuccess) onSuccess(); // Trigger parent Snackbar
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
        }, 1000); // Delay close to allow Snackbar in parent
    };

    const handleModalClose = () => {
        console.log('AddQuestion: Close button clicked, isSubmitting:', isSubmitting);
        if (!isSubmitting) {
            onClose();
        }
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
        <Modal open={open} onClose={handleModalClose}>
            <Box sx={modalStyle}>
                <IconButton
                    onClick={handleModalClose}
                    disabled={isSubmitting}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <Close />
                </IconButton>

                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                    {isEditing ? `Edit Question for ${quiz.quizName}` : `Add Question to ${quiz.quizName}`}
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
                    disabled={isSubmitting}
                    sx={{ py: 1.5, backgroundColor: '#1976d2' }}
                >
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </Box>
        </Modal>
    );
}