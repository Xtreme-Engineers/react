import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Link } from 'react-router-dom';

import tempJSON from './TempJSON';

import NewQuestionForm from './NewQuestionForm';

function Quizlist() {
  const quizzes = useRef();
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  const [formButtonVisible, setFormButtonVisible] = useState(false);
  const [specificQuiz, setSpecificQuiz] = useState([]);

  const ButtonCellRenderer = () => {
    return (
      <button onClick={() => buttonClickHandler(gridRef.current.getSelectedNodes())}>Select Quiz</button>
    );
  }

  // --- COLUMN DEFINITIONS
  const columnQuizzes = [
    { field: "quizId" },
    { field: "name" },
    { field: "selectQuiz",
      cellRenderer: ButtonCellRenderer,
    }
  ]

  const columnQuestions = [
    { field: "questionId" },
    { field: "questionText" }
  ]

  const [columns, setColumns] = useState(columnQuizzes);

  // --- FETCH DATA AND ASSIGN
  useEffect( () => {
    fetchQuizzes();
  }, [])

const fetchQuizzes = () => {
  console.log('fetching...');
  console.log('data found: ' + tempJSON);
  quizzes.current = tempJSON.tempJSON;
  setRowData(tempJSON.tempJSON);
}
  
  /*
  const fetchQuizzes = () => {
    console.log('fetching data...');
    fetch('https://quizservicebackend.fly.dev/quizzes')
    .then(response => response.json())
    .then(data => assignData(data))
  }
  
  
  const assignData = (data) => {
    console.log('data fetched!');
    console.log('assigning data...');
    quizzes.current = data;
    setRowData(data);
    console.log('done!');
  }
  */
  const buttonClickHandler = (row) => {
    console.log(row[0].rowIndex);
    console.log(quizzes.current[row[0].rowIndex].questions)
    
    setRowData(quizzes.current[row[0].rowIndex].questions);
    setSpecificQuiz(quizzes.current[row[0].rowIndex])
    setColumns(columnQuestions);

    setFormButtonVisible(prevFormButtonVisible => !prevFormButtonVisible);
  }

  const goBack = () => {
    console.log("going back...");
    setRowData(quizzes.current);
    setColumns(columnQuizzes);
    setFormButtonVisible(!formButtonVisible);
  }

  const gridOptions = {
    animateRows: true,
    getRowId: params => params.data.id
  }

  return (
    <>
      {console.log(formButtonVisible)}

      {formButtonVisible && (
        <div>
          <NewQuestionForm quizData={specificQuiz} />
          <button onClick={() => goBack()}>Go back to Quiz List</button>
        </div>
      )}

      <div className="ag-theme-material" style={{ height: 600, width: '90' }}>
        <AgGridReact
            animateRows={gridOptions}
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api }
            rowSelection="single"
            columnDefs={columns}
            rowData={rowData}
            paginationPageSize={10}
            pagination={true}
            >
        </AgGridReact>
      </div>
    </>
  );
}

export default Quizlist;

/*    IF NEED TO USE LOCAL JSON TEST DATA

  useEffect( () => {
    console.log(tempJSON);
    quizzes.current = tempJSON.tempJSON;
    setRowData(tempJSON.tempJSON);
  }, [])
  
*/