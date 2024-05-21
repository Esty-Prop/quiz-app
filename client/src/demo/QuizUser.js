import * as React from 'react';
import "./Quiz_User.css"
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
                  you're willing to spend on clicks and conversions, which networks
                  and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`,
    },
];

const QuizUser = () => {

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    return (
        <div>
        {/* <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                
                <Typography>{steps[activeStep].label}</Typography>
            </Paper>
            <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
                {steps[activeStep].description}
            </Box>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                    
                }
                // backButton={
                //     <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                //         {theme.direction === 'rtl' ? (
                //             <KeyboardArrowRight />
                //         ) : (
                //             <KeyboardArrowLeft />
                //         )}
                //         Back
                //     </Button>
                // }
            />
        </Box> */}
        <QuizApp/>
        </div>
    );
}

export default QuizUser;

const QuizApp = () => {
    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            correctAnswer: 'Paris'
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
            correctAnswer: 'Mars'
        },
        // Add more questions here
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showCorrect, setShowCorrect] = useState(false);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const checkAnswer = () => {
        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
            setShowCorrect(true);
        }
        setSelectedOption('');
        // Move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowCorrect(false);
    };

    return (
        
        <div className="quiz-container">
            {currentQuestionIndex < questions.length ? (
                <div className="question-container">
                    <h2 className="question-number">Question {currentQuestionIndex + 1}</h2>
                    <h3 className="question-text">{questions[currentQuestionIndex].question}</h3>
                    <ul className="options-list">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <li key={index} className="option-item">
                                <label className={selectedOption === option ? "option-label focused" : "option-label"}>
                                    <input
                                        type="radio"
                                        name="option"
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={() => handleOptionSelect(option)}
                                        disabled={showCorrect}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                    {!showCorrect && (
                        <button className="check-btn" onClick={checkAnswer}>Check Answer and Next</button>
                    )}
                    {showCorrect && (
                        <p className="correct-answer">Correct Answer!</p>
                    )}
                </div>
            ) : (
                <div className="quiz-completed">
                    <h2>Quiz Completed!</h2>
                    <p className="final-score">Your Score: {score} out of {questions.length}</p>
                </div>
            )}
        </div>
    );
};

// export default QuizApp;
