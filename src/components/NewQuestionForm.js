import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const styleText = {
    position: 'absolute',
    left: '50%',
    textAlign: 'center',
    border: '2px dotted blue',
    backgroundColor: 'lightblue',
  };

  // IF WE WANT TO STYLE THE BUTTON
  const showButtonStyle = {
    // NOT DONE
  }

const NewQuestionForm = ({ quizData }) => {
    const [open, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [textVisible, setTextVisible] = useState(false);


    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setQuestionText(inputText); // possibly useless
        handleClose();

        let updatedQuiz = quizData;
        
        // this assumes questionId is auto_incremented on server-side!!!
        
        updatedQuiz.questions.push({"questionText": inputText})

        setTextVisible(prevTextVisible => !prevTextVisible);
        postNewQuestion(updatedQuiz);
    }

    // post new question to existing quiz
    const postNewQuestion = (updatedQuiz) => {
        fetch(`https://quizservicebackend.fly.dev/quizzes/${quizData.quizId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuiz)
        })
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
    }

    return (
        <div>
            { textVisible && (
                <p style={styleText}>New Question posted: {questionText}</p>
                )
            }
            <button style={showButtonStyle} onClick={handleOpen}>Add new question</button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <label>Enter new question:
                            <input 
                                open={open}
                                type='text'
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                        </label>
                        <button type='submit'>Submit</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default NewQuestionForm;