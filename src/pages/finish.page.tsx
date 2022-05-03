import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FinishPage = () => {
  const history = useNavigate ();
  const score = localStorage.getItem("Score");

  const handleClickGoHome = () => {
    localStorage.setItem('Score', "");
    history("/");
  }

  return (
    <Box>
        <Typography>Finish Page</Typography>  
        <Typography variant="h6" mt={5}>Your score: {score}</Typography> 

        <Box mt={5}>
          <Button onClick={handleClickGoHome} variant="outlined" fullWidth>
            Go to the Home page
          </Button>
      </Box>   
    </Box>
  );
}

export default FinishPage;
