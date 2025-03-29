'use client';

import { Modal, Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Close } from '@mui/icons-material';

interface ViewScoreProps {
    open: boolean;
    onClose: () => void;
    data: any;
}

export default function ViewScore({ open, onClose, data }: ViewScoreProps) {
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
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <Close />
                </IconButton>

                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                    Quiz Score
                </Typography>

                <Typography sx={{ mb: 1 }}>
                    Overall Score: {data.currentScore}/{data.total}
                </Typography>

                <List>
                    {data.quiz.map((q: any) => (
                        <ListItem key={q.quizId}>
                            <ListItemText
                                primary={q.quizName}
                                secondary={`Score: ${q.score}/${q.total}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
}