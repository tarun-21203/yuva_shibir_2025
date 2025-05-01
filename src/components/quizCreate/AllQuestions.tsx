'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, IconButton, Snackbar, Alert } from '@mui/material';
import { Edit, Close } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import AddQuestion from './AddQuestion';

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

export default function AllQuestions() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const quizId = parseInt(searchParams.get('quizId') || '0');
    const [quizzes, setQuizzes] = useState(initialQuizData);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState(false);

    const quiz = quizzes.find(q => q.quizId === quizId) || { quizName: 'Unknown', questions: [] };

    const handleAddQuestion = (questionData: any) => {
        console.log('AllQuestions: Adding question', questionData);
        const newQuestion = {
            ...questionData,
            questionId: quiz.questions.length + 1
        };
        const updatedQuizzes = quizzes.map(q => {
            if (q.quizId === quizId) {
                return {
                    ...q,
                    questionCount: q.questionCount + 1,
                    questions: [...q.questions, newQuestion]
                };
            }
            return q;
        });
        setQuizzes(updatedQuizzes);
        setShowAddQuestion(false);
        setOpenSnackbar(true);
        setIsEditingMode(false);
    };

    const handleEditQuestion = (questionData: any) => {
        console.log('AllQuestions: Updating question', questionData);
        const updatedQuizzes = quizzes.map(q => {
            if (q.quizId === quizId) {
                return {
                    ...q,
                    questions: q.questions.map(qn =>
                        qn.questionId === questionData.questionId ? questionData : qn
                    )
                };
            }
            return q;
        });
        setQuizzes(updatedQuizzes);
        setEditingQuestion(null);
        setOpenSnackbar(true);
        setIsEditingMode(true);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {quiz.quizName}
                </Typography>
                <IconButton onClick={() => router.push('/quizCreate')}>
                    <Close />
                </IconButton>
            </Box>

            <Button
                fullWidth
                variant="contained"
                onClick={() => {
                    console.log('AllQuestions: Opening AddQuestion for new question');
                    setShowAddQuestion(true);
                }}
                sx={{ mb: 2, py: 1.5, backgroundColor: '#1976d2', borderRadius: 2 }}
            >
                Add New Question
            </Button>

            {quiz.questions.length === 0 ? (
                <Typography align="center" sx={{ mb: 2, color: '#666' }}>
                    No questions are added
                </Typography>
            ) : (
                <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                    {quiz.questions.map((question: any) => (
                        <Paper
                            key={question.questionId}
                            elevation={2}
                            sx={{ mb: 1, p: 2, borderRadius: 2 }}
                        >
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => {
                                        console.log('AllQuestions: Opening AddQuestion for edit', question);
                                        setEditingQuestion(question);
                                    }}>
                                        <Edit />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={question.question}
                                    primaryTypographyProps={{ fontSize: '1.1rem' }}
                                />
                            </ListItem>
                        </Paper>
                    ))}
                </List>
            )}

            {(showAddQuestion || editingQuestion) && (
                <AddQuestion
                    open={showAddQuestion || !!editingQuestion}
                    onClose={() => {
                        setShowAddQuestion(false);
                        setEditingQuestion(null);
                    }}
                    quiz={quiz}
                    onAddQuestion={editingQuestion ? handleEditQuestion : handleAddQuestion}
                    initialQuestion={editingQuestion}
                    onSuccess={() => setOpenSnackbar(true)}
                />
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    onClose={() => setOpenSnackbar(false)}
                    sx={{ width: '100%' }}
                >
                    {isEditingMode ? 'Question Updated Successfully' : 'Successfully question added'}
                </Alert>
            </Snackbar>
        </Box>
    );
}