'use client';

import { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, CircularProgress, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import QuizPage from './QuizPage';
import { useRouter } from 'next/navigation';

interface QuizFormProps {
    quizData: any;
}

export default function QuizForm({ quizData }: QuizFormProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleNextOrSubmit();
        }
    }, [timeLeft, isSubmitted]);

    const handleAnswer = (questionId: number, selectedOptionId: number) => {
        const newAnswers = [...answers];
        const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questionId);
        if (existingAnswerIndex >= 0) {
            newAnswers[existingAnswerIndex] = { questionId, selectedOptionId };
        } else {
            newAnswers.push({ questionId, selectedOptionId });
        }
        setAnswers(newAnswers);
    };

    const handleNextOrSubmit = () => {
        if (currentQuestionIndex < quizData.questionCount - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(60);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        const submission = {
            shibirId: "BHYK001", // This would typically come from auth context
            quizId: quizData.quizId,
            answers: answers
        };
        console.log('Quiz Submission:', submission);
        setIsSubmitted(true);
        router.push('/quizSubmit');
    };

    const handleClose = () => {
        router.push('/'); // Or wherever you want to redirect
    };

    if (isSubmitted) return null;

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, position: 'relative' }}>
            <IconButton
                onClick={handleClose}
                sx={{ position: 'absolute', top: 8, right: 8 }}
            >
                <Close />
            </IconButton>

            <Typography variant="h5" align="center" sx={{ mb: 2, color: '#1976d2' }}>
                {quizData.quizName}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <CircularProgress
                    variant="determinate"
                    value={(timeLeft / 60) * 100}
                    size={50}
                />
                <Typography sx={{ position: 'absolute', mt: 1.5 }}>
                    {timeLeft}s
                </Typography>
            </Box>

            <QuizPage
                question={quizData.questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
            />

            <Button
                fullWidth
                variant="contained"
                onClick={handleNextOrSubmit}
                sx={{ mt: 2, py: 1.5, backgroundColor: '#1976d2' }}
            >
                {currentQuestionIndex === quizData.questionCount - 1 ? 'Submit' : 'Next'}
            </Button>
        </Paper>
    );
}