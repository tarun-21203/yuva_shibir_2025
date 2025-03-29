'use client';

import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ResetPassword from './ResetPassword';

export default function LoginForm() {
    const [formData, setFormData] = useState({ shibirId: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openResetModal, setOpenResetModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.shibirId) {
            newErrors.shibirId = 'Shibir ID is required';
        } else if (!/^[A-Z]{4}\d{3}$/.test(formData.shibirId)) {
            newErrors.shibirId = 'Shibir ID must be 4 letters followed by 3 numbers';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = {
                shibirId: formData.shibirId,
                password: formData.password,
            };
            console.log('Login Request:', response);
            setSuccessMessage('Successfully Logged In');
            setOpenSnackbar(true);
            setFormData({ shibirId: '', password: '' });
            setErrors({});
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
            }}
        >
            <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{ color: '#1976d2', fontWeight: 'bold' }}
            >
                Login
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Shibir ID"
                    name="shibirId"
                    value={formData.shibirId}
                    onChange={handleChange}
                    error={!!errors.shibirId}
                    helperText={errors.shibirId}
                    size="small"
                    sx={{ mb: 2 }}
                    inputProps={{ maxLength: 7 }}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    size="small"
                    sx={{ mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 2,
                        mb: 2,
                        py: 1.5,
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                >
                    Login
                </Button>

                <Button
                    fullWidth
                    variant="text"
                    onClick={() => setOpenResetModal(true)}
                    sx={{
                        textTransform: 'none',
                        color: '#1976d2'
                    }}
                >
                    Forgot Password?
                </Button>
            </Box>

            <ResetPassword
                open={openResetModal}
                handleClose={() => setOpenResetModal(false)}
                setSuccessMessage={setSuccessMessage}
                setOpenSnackbar={setOpenSnackbar}
            />

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical:'top', horizontal:'center' }}
            >
                <Alert
                    severity="success"
                    sx={{ width: '100%' }}
                    onClose={() => setOpenSnackbar(false)}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
}