'use client';

import { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface ResetPasswordProps {
    open: boolean;
    handleClose: () => void;
    setSuccessMessage: (message: string) => void;
    setOpenSnackbar: (open: boolean) => void;
}

export default function ResetPassword({
    open,
    handleClose,
    setSuccessMessage,
    setOpenSnackbar
}: ResetPasswordProps) {
    const [formData, setFormData] = useState({
        shibirId: '',
        phoneNo: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.shibirId) newErrors.shibirId = 'Shibir ID is required';
        else if (!/^[A-Z]{4}\d{3}$/.test(formData.shibirId))
            newErrors.shibirId = 'Shibir ID must be 4 letters followed by 3 numbers';

        if (!formData.phoneNo) newErrors.phoneNo = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phoneNo))
            newErrors.phoneNo = 'Phone number must be 10 digits';

        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.confirmPassword)
            newErrors.confirmPassword = 'Confirm password is required';
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = {
                shibirId: formData.shibirId,
                phoneNo: formData.phoneNo,
                Password: formData.password,
            };
            console.log('Reset Password Request:', response);

            setSuccessMessage('Password Reset Successfully');
            setOpenSnackbar(true);
            setFormData({
                shibirId: '',
                phoneNo: '',
                password: '',
                confirmPassword: '',
            });
            handleClose();
        } catch (error) {
            console.error('Reset password failed:', error);
        }
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    sx={{ color: '#1976d2', fontWeight: 'bold' }}
                >
                    Reset Password
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
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
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Phone Number"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        error={!!errors.phoneNo}
                        helperText={errors.phoneNo}
                        size="small"
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        size="small"
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

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                            mt: 3,
                            py: 1.5,
                            backgroundColor: '#1976d2',
                            '&:hover': { backgroundColor: '#1565c0' }
                        }}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}