import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


export default function Questions(){
  
    const [questions, setQuestions] = React.useState([])
    const [id, setId] = React.useState('')

    useEffect( () => {
        fetchQuestions();
      }, [])

    function handleChange(event) {
        setId(event.target.value)
    }

    function handleClick() {
        fetchQuestions();
    }

    const fetchQuestions = () => {
        fetch('https://quizservicebackend.herokuapp.com/quizlist')
        .then(response => response.json())
        .then(data => setQuestions(data[id].questions))
    }

    const columns = [
        { field: "questionId", sortable: true, filter: true },
        { field: "questionText", sortable: true, filter: true },
      ]

    return(
        <>
           <input 
           value={id}   
           name="quizId"
           placeholder='Type quizId here' 
           onChange={handleChange} />
            <button onClick={handleClick}>Show questions</button>
            <div className="ag-theme-material" style={{ height: 600, width: '90' }}>
                <AgGridReact
                    rowData={questions}
                    paginationPageSize={10}
                    pagination={true}
                    columnDefs={columns}>
                </AgGridReact>
            </div>
        </>
    );
}