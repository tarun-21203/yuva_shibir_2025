'use client';

import { Box, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';

interface QuizPageProps {
    question: any;
    onAnswer: (questionId: number, selectedOptionId: number) => void;
}

export default function QuizPage({ question, onAnswer }: QuizPageProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onAnswer(question.questionId, parseInt(event.target.value));
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {question.question}
            </Typography>

            <RadioGroup onChange={handleChange}>
                {question.options.map((option: any, index: number) => (
                    <FormControlLabel
                        key={option[`option${index + 1}Id`]}
                        value={option[`option${index + 1}Id`]}
                        control={<Radio />}
                        label={option[`option${index + 1}`]}
                        sx={{ mb: 1 }}
                    />
                ))}
            </RadioGroup>
        </Box>
    );
}