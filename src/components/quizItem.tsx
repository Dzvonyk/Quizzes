import { useState } from 'react'
import { Box, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

const QuizItem = (props: { name?: any; count?: any; object?: any }) => {
  const { name, count, object } = props  
  const history = useNavigate ();
  const category = localStorage.getItem("Category");
  const difficulty = localStorage.getItem("Difficulty");
  const type = localStorage.getItem("Type");
  let  URL = `/api.php?amount=10`
  if (category) {
   URL = URL.concat(`&category=${category}`);
  }
  if (difficulty) {
    URL = URL.concat(`&difficulty=${difficulty}`);
  }
  if (type) {
    URL = URL.concat(`&type=${type}`);
  }
  
  const { response, loading } = useAxios(URL);
  
  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }
  console.log(response.results)

  const handleClickGoQuiz = () => {
    // localStorage.setItem('Category', `${response.results[0].category}`);    
    history("/play");
  }

  return (
    <Paper
    sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid 
        container 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
     >
        <Grid item>
          {/* <Typography>Name: {}</Typography> */}
          <Typography>{response.results[0].category}</Typography>
        </Grid>
        <Grid item>
          <Typography>Number of questions: {response.results.length}</Typography>  
        </Grid>
        <Grid item>
          <Button
            onClick={handleClickGoQuiz}
            variant="outlined"
          >
            Button
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default QuizItem
