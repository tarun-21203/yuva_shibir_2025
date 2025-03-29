'use client';

import { useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ViewScore from './ViewScore';
import ViewAnswer from './ViewAnswer';

export default function QuizSubmit() {
    const [showScore, setShowScore] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);

    // Sample data (would come from backend)
    const scoreData = {
        currentScore: 50,
        total: 100,
        quiz: [{ quizId: 1, quizName: "Shreeji", score: 1, total: 4 }]
    };

    const answerData = {
        quizId: 1,
        quizName: "Shreeji",
        answers: [
            { question: "What is your name?", corrrectOption: "Tarun" },
            { question: "What is the capital of France?", selectedOption: "Paris" },
            // ... other answers
        ]
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 2, color: '#1976d2' }}>
                Your response has been submitted successfully
            </Typography>

            <Button
                fullWidth
                variant="contained"
                onClick={() => setShowAnswers(true)}
                sx={{ mb: 2, py: 1.5, backgroundColor: '#1976d2' }}
            >
                View Answers
            </Button>

            <Button
                fullWidth
                variant="contained"
                onClick={() => setShowScore(true)}
                sx={{ py: 1.5, backgroundColor: '#1976d2' }}
            >
                View Score
            </Button>

            <ViewAnswer
                open={showAnswers}
                onClose={() => setShowAnswers(false)}
                data={answerData}
            />

            <ViewScore
                open={showScore}
                onClose={() => setShowScore(false)}
                data={scoreData}
            />
        </Paper>
    );
}