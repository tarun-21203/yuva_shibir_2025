'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import CreateNewQuiz from './CreateNewQuiz';
import AddQuestion from './AddQuestion';

// Sample data (would come from backend)
const initialQuizData = [
    { quizId: 1, quizName: "Shreeji", helpingName: "Day-1 Bharuch", questionCount: 4 },
    { quizId: 2, quizName: "Gunatit", helpingName: "Day-2 Gondal", questionCount: 7 },
    { quizId: 3, quizName: "Pragji", helpingName: "Day-3 Gondal", questionCount: 0 }
];

export default function QuizCreate() {
    const [quizzes, setQuizzes] = useState(initialQuizData);
    const [showCreateNew, setShowCreateNew] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

    const handleAddQuiz = (newQuiz: { quizName: string; helpingName: string }) => {
        // Simulate backend call
        const newQuizData = { ...newQuiz, quizId: quizzes.length + 1, questionCount: 0 };
        setQuizzes([...quizzes, newQuizData]);
        setShowCreateNew(false);
    };

    const handleAddQuestion = (quizId: number) => {
        // Simulate fetching updated data after adding question
        const updatedQuizzes = quizzes.map(q =>
            q.quizId === quizId ? { ...q, questionCount: q.questionCount + 1 } : q
        );
        setQuizzes(updatedQuizzes);
        setSelectedQuiz(null);
    };

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Typography
                variant="h5"
                align="center"
                sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}
            >
                Quiz Creator
            </Typography>

            {quizzes.length === 0 ? (
                <Typography align="center" sx={{ mb: 2 }}>
                    No quiz to display
                </Typography>
            ) : (
                <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                    {quizzes.map((quiz) => (
                        <Paper
                            key={quiz.quizId}
                            elevation={2}
                            sx={{ mb: 1, p: 2, cursor: 'pointer' }}
                            onClick={() => setSelectedQuiz(quiz)}
                        >
                            <ListItem>
                                <ListItemText
                                    primary={`${quiz.quizName} (${quiz.helpingName})`}
                                />
                                <ListItemSecondaryAction>
                                    <Typography>{quiz.questionCount} Qs</Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Paper>
                    ))}
                </List>
            )}

            <Button
                fullWidth
                variant="contained"
                onClick={() => setShowCreateNew(true)}
                sx={{ mt: 2, py: 1.5, backgroundColor: '#1976d2' }}
            >
                Add New Quiz
            </Button>

            <CreateNewQuiz
                open={showCreateNew}
                onClose={() => setShowCreateNew(false)}
                onAdd={handleAddQuiz}
            />

            {selectedQuiz && (
                <AddQuestion
                    open={!!selectedQuiz}
                    onClose={() => setSelectedQuiz(null)}
                    quiz={selectedQuiz}
                    onAddQuestion={handleAddQuestion}
                />
            )}
        </Box>
    );
}