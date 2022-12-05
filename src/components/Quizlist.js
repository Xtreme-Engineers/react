import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Link } from 'react-router-dom';

function Quizlist() {
  const quizzes = useRef();
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  const ButtonCellRenderer = () => {
    return (
      /*    MIGHT BE USEFUL IF NEED TO NAVIGATE TO SEPARATE ANSWER PAGE
      <Link to={{ pathname: "/questions", state: { selectedId }}}>
        <button onClick={() => setSelectedId(gridRef.current.getSelectedNodes())}>Select Quiz</button>
      </Link>
      */
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
    fetch('https://quizservicebackend.fly.dev/quizzes')
    .then(response => response.json())
    .then(data => assignData(data))
  }

  const assignData = (data) => {
    quizzes.current = data;
    setRowData(data);
  }

  const buttonClickHandler = (row) => {
    console.log(row[0].rowIndex);
    console.log(quizzes.current[row[0].rowIndex].questions)
    
    setRowData(quizzes.current[row[0].rowIndex].questions);
    
    setColumns(columnQuestions);
  }

  const gridOptions = {
    animateRows: true,
    getRowId: params => params.data.id
  }

  return (
    <>
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