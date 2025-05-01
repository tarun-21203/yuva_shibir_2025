'use client';

import { Container, CssBaseline } from '@mui/material';
import QuizCreate from '@/components/quizCreate/QuizCreate';

export default function QuizCreatePage() {
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
            <QuizCreate />
        </Container>
    );
}