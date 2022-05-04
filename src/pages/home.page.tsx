import { Box, Grid, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import QuizItem from '../components/quizItem';
import SelectField from '../components/selectField';
import useAxios from '../hooks/useAxios';

const  HomePage = () => { 
  const [apiURL, setApiURL] = useState('/api_category.php');
  //const  apiURL = `/api_category.php`
  const { response, error, loading } = useAxios( apiURL );
  const history = useNavigate ();
  let list:number[] = []
  const [listQuizzes, setListQuizzes] = useState(list);
  const [quizIndex, setQuizIndex] = useState(0);

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

  const showQuizzesList = () =>{
    // const category = localStorage.getItem("Category");
    // const difficulty = localStorage.getItem("Difficulty");
    // const type = localStorage.getItem("Type");
    // let  URL = `/api.php?amount=10`
    // if (category) {
    //  URL = URL.concat(`&category=${category}`);
    // }
    // if (difficulty) {
    //   URL = URL.concat(`&difficulty=${difficulty}`);
    // }
    // if (type) {
    //   URL = URL.concat(`&type=${type}`);
    // }
    // setApiURL(URL);
    // // let item = [response.results]
    // // setListQuizzes(item)
    // // if(quizIndex !== 10){
    // //   showQuizzesList()
    // //   setQuizIndex(quizIndex + 1)
    // //   console.log(quizIndex)
    // // }
    // setApiURL('/api_category.php');

    let list = [1,2,3,4,5,6,7,8,9,10];
    setListQuizzes(list)
  };


  return (
    <Box>
      <Typography>Home Page</Typography>
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
      <Box mt={3} width="100%">
        <Button fullWidth onClick={showQuizzesList} variant="outlined" >
          Show List
        </Button>
      </Box>
      <Box>
        {listQuizzes.map((data, id)=>(
          <Box mt={3} key={id}>
            <QuizItem />
          </Box>
        ))}
      </Box>
    </Box>    
  );
}

export default HomePage;
