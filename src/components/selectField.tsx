import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const  SelectField = (props: { label: any; options: any; }) => {
    const { label, options } = props;
    // const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const handleChange = (e:any) => {
      setValue(e.target.value)
      if(label === "Category"){
        localStorage.setItem('Category', e.target.value);
      }
      if(label === "Difficulty"){
        localStorage.setItem('Difficulty', e.target.value);
      }
      if(label === "Type"){
        localStorage.setItem('Type', e.target.value);
      }

    }

    return ( 
    <Box mt={3} width="100%">
      <FormControl size="small" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options.map(({ id, name }:any) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    );
  }
  
  export default SelectField;
