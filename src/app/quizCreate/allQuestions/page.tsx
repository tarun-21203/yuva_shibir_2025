'use client';

import { Container, CssBaseline } from '@mui/material';
import AllQuestions from '@/components/quizCreate/AllQuestions';

export default function AllQuestionsPage() {
    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                py: 2
            }}
        >
            <CssBaseline />
            <AllQuestions />
        </Container>
    );
}