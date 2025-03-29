'use client';

import { Container, CssBaseline } from '@mui/material';
import QuizForm from '@/components/quiz/QuizForm';

// Sample quiz data (in real app, this would come from backend)
const quizData = {
    quizId: 1,
    quizName: "Shreeji",
    questionCount: 5,
    questions: [
        {
            "questionId": 1,
            "question": "What is your name?",
            "options": [
                { "option1Id": 11, "option1": "Tarun" },
                { "option2Id": 12, "option2": "Maharshi" },
                { "option3Id": 13, "option3": "Monank" },
                { "option4Id": 14, "option4": "Saurabh" }
            ],
            "correctOptionId": "11"
        },
        {
            "questionId": 2,
            "question": "What is the capital of France?",
            "options": [
                { "option1Id": 21, "option1": "London" },
                { "option2Id": 22, "option2": "Paris" },
                { "option3Id": 23, "option3": "Rome" },
                { "option4Id": 24, "option4": "Berlin" }
            ],
            "correctOptionId": "22"
        },
        {
            "questionId": 3,
            "question": "Which planet is known as the Red Planet?",
            "options": [
                { "option1Id": 31, "option1": "Venus" },
                { "option2Id": 32, "option2": "Mars" },
                { "option3Id": 33, "option3": "Jupiter" },
                { "option4Id": 34, "option4": "Saturn" }
            ],
            "correctOptionId": "32"
        },
        {
            "questionId": 4,
            "question": "Who wrote 'Hamlet'?",
            "options": [
                { "option1Id": 41, "option1": "William Shakespeare" },
                { "option2Id": 42, "option2": "Jane Austen" },
                { "option3Id": 43, "option3": "Mark Twain" },
                { "option4Id": 44, "option4": "Charles Dickens" }
            ],
            "correctOptionId": "41"
        },
        {
            "questionId": 5,
            "question": "What is the chemical symbol for water?",
            "options": [
                { "option1Id": 51, "option1": "O2" },
                { "option2Id": 52, "option2": "H2O" },
                { "option3Id": 53, "option3": "CO2" },
                { "option4Id": 54, "option4": "CH4" }
            ],
            "correctOptionId": "52"
        }
    ]
};

export default function QuizPage() {
    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                py: 2
            }}
        >
            <CssBaseline />
            <QuizForm quizData={quizData} />
        </Container>
    );
}