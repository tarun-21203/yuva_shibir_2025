'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import CreateNewQuiz from './CreateNewQuiz';
import { useRouter } from 'next/navigation';

const initialQuizData = [
    {
        quizId: 1,
        quizName: "Shreeji",
        helpingName: "Day-1 Bharuch",
        questionCount: 2,
        questions: [
            {
                questionId: 1,
                question: "What is the capital of France?",
                option1: "Paris",
                option2: "London",
                option3: "Berlin",
                option4: "Madrid",
                correctOption: "Paris"
            },
            {
                questionId: 2,
                question: "What is 2 + 2?",
                option1: "4",
                option2: "3",
                option3: "5",
                option4: "6",
                correctOption: "4"
            }
        ]
    },
    {
        quizId: 2,
        quizName: "Gunatit",
        helpingName: "Day-2 Gondal",
        questionCount: 0,
        questions: []
    }
];

export default function QuizCreate() {
    const [quizzes, setQuizzes] = useState(initialQuizData);
    const [showCreateNew, setShowCreateNew] = useState(false);
    const router = useRouter();

    const handleAddQuiz = (newQuiz: { quizName: string; helpingName: string }) => {
        const newQuizData = { ...newQuiz, quizId: quizzes.length + 1, questionCount: 0, questions: [] };
        setQuizzes([...quizzes, newQuizData]);
        setShowCreateNew(false);
    };

    const handleQuizClick = (quiz: any) => {
        // Navigate to AllQuestions with quizId
        router.push(`/quizCreate/allQuestions?quizId=${quiz.quizId}`);
    };

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1 }}>
            <Typography
                variant="h5"
                align="center"
                sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}
            >
                Quiz Creator
            </Typography>

            {quizzes.length === 0 ? (
                <Typography align="center" sx={{ mb: 2, color: '#666' }}>
                    No quiz to display
                </Typography>
            ) : (
                <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                    {quizzes.map((quiz) => (
                        <Paper
                            key={quiz.quizId}
                            elevation={2}
                            sx={{ mb: 1, p: 2, cursor: 'pointer', borderRadius: 2 }}
                            onClick={() => handleQuizClick(quiz)}
                        >
                            <ListItem>
                                <ListItemText
                                    primary={`${quiz.quizName} (${quiz.helpingName})`}
                                    primaryTypographyProps={{ fontSize: '1.1rem' }}
                                />
                                <ListItemSecondaryAction>
                                    <Typography sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        {quiz.questionCount} Qs
                                    </Typography>
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
                sx={{ mt: 2, py: 1.5, backgroundColor: '#1976d2', borderRadius: 2 }}
            >
                Add New Quiz
            </Button>

            <CreateNewQuiz
                open={showCreateNew}
                onClose={() => setShowCreateNew(false)}
                onAdd={handleAddQuiz}
            />
        </Box>
    );
}