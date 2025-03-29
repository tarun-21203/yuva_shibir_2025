'use client';

import { Modal, Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Close } from '@mui/icons-material';

interface ViewAnswerProps {
    open: boolean;
    onClose: () => void;
    data: any;
}

export default function ViewAnswer({ open, onClose, data }: ViewAnswerProps) {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 400,
        maxHeight: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
        overflowY: 'auto'
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <Close />
                </IconButton>

                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                    {data.quizName} - Answers
                </Typography>

                <List>
                    {data.answers.map((answer: any, index: number) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={answer.question}
                                secondary={`Correct Answer: ${answer.corrrectOption || answer.selectedOption}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
}