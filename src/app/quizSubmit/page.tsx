'use client';

import { Container, CssBaseline } from '@mui/material';
import QuizSubmit from '@/components/quizSubmit/QuizSubmit';

export default function QuizSubmitPage() {
    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}
        >
            <CssBaseline />
            <QuizSubmit />
        </Container>
    );
}