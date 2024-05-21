import { Button } from "@mui/material"

const entryQuiz = ({quiz}) => {
  return (
    <div className="entryQuiz-container">
        {quiz.title}
    <Button onClick={()=>{alert('click')}}  >start quiz</Button>
    </div>
  )
}

export default entryQuiz