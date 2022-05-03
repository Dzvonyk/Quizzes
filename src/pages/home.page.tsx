import { Box, Grid, Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate  } from "react-router-dom";
import { Link } from 'react-router-dom';
import SelectField from '../components/selectField';
import useAxios from '../hooks/useAxios';

const  HomePage = () => { 
  const { response, error, loading } = useAxios( "/api_category.php" );
  const history = useNavigate ();
  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        ERROR!
      </Typography>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(response)
    history("/play");
  };



  return (
    <Box>
      <Typography>Home Page</Typography>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Link to="/play">Play Page</Link>
        </Grid>
        <Grid item xs={8}>
          <Link to="/finish">Finish Page</Link>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <SelectField options={response.trivia_categories} label="Category" />         
        <SelectField options={difficultyOptions} label="Difficulty" />
        <SelectField options={typeOptions} label="Type" />
        <Box mt={3} width="100%">
          <Button fullWidth variant="contained" type="submit">
            Start quiz
          </Button>
        </Box>
        </form>
    </Box>
    
  );
}

export default HomePage;
