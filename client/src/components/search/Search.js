import { MdSearch } from "react-icons/md";
import "./search.css"
import {useSearchParams} from 'react-router-dom'
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';


const Search = ({placeholder}) => {
  const [searchParams,setSearchParams] = useSearchParams()
  const q = searchParams.get("q")
  return (
    // <div className='search-container'>
    //     <MdSearch />
        // <input type='text'
        // placeholder={placeholder}
        // defaultValue = {q}
        // onChange ={(e)=>setSearchParams({q:e.target.value})}
        // className='search-input' />
            <Input
          size="md"
          placeholder="Search quiz by name"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
                  onChange ={(e)=>setSearchParams({q:e.target.value})}

          
        />
    // </div>
  )
}

export default Search