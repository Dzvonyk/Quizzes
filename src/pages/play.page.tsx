import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const clineLocalStorage = (score?: number) => {
  localStorage.setItem('Category', "");
  localStorage.setItem('Difficulty', "");
  localStorage.setItem('Type', "");
  {score? localStorage.setItem('Score', `${score}`): localStorage.setItem('Score', "")}
  
}

const PlayPage = () =>  {
  const history = useNavigate ();
  const category = localStorage.getItem("Category");
  const difficulty = localStorage.getItem("Difficulty");
  const type = localStorage.getItem("Type");
  let  apiURL = `/api.php?amount=10`
  if (category) {
    apiURL = apiURL.concat(`&category=${category}`);
  }
  if (difficulty) {
    apiURL = apiURL.concat(`&difficulty=${difficulty}`);
  }
  if (type) {
    apiURL = apiURL.concat(`&type=${type}`);
  }
  const [score, setScore] = useState(0)
  const { response, loading } = useAxios(apiURL);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomNumber(question.incorrect_answers.length + 1),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e:any) => {
    const question = response.results[questionIndex];

    if (e.target.textContent === question.correct_answer) {
      setScore(score + 1);
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {    
      clineLocalStorage(score);
      history("/finish");
    }
  };
  const handleClickGoHome = () => {
    clineLocalStorage();
    history("/");
  }
  
  return (
    <Box>
      <Typography>Play Page</Typography>
      <Box>
        <Typography variant="h4">Questions {questionIndex + 1}</Typography>
        <Typography mt={5}>
          {console.log(response.results)}
          {response.results[questionIndex].question}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {options.map((data, id) => (
            <Grid item xs={6} mt={2} key={id}>
              <Button onClick={handleClickAnswer} variant="contained" fullWidth>
                {data}
              </Button>
            </Grid>
          ))}       
        </Grid>
        
      <Box mt={5}>
        Score: {score} / {response.results.length}
      </Box>
      <Box mt={5}>
        <Button onClick={handleClickGoHome} variant="outlined" color="error" fullWidth>
          Cancel a quiz and go to the Home page
        </Button>
      </Box>
      
    </Box>

    </Box>
  );
}

export default PlayPage;
