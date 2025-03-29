'use client';

import { Container, CssBaseline } from '@mui/material';
import LoginForm from '@/components/login/LoginForm';

export default function LoginPage() {
    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}
        >
            <CssBaseline />
            <LoginForm />
        </Container>
    );
}