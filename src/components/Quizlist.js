import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Quizlist() {

  const [quizzes, setQuizzes] = React.useState([])

  useEffect( () => {
    fetchQuizzes();
  }, [])

  const fetchQuizzes = () => {
    fetch('https://quizservicebackend.herokuapp.com/quizlist')
    .then(response => response.json())
    .then(data => setQuizzes(data))
  }

  console.log(quizzes)

  const columns = [
    { field: "quizId", sortable: true, filter: true },
    { field: "name", sortable: true, filter: true },
  ]

  return (
    <>
      <div className="ag-theme-material" style={{ height: 600, width: '90' }}>
      <AgGridReact
          rowData={quizzes}
          paginationPageSize={10}
          pagination={true}
          columnDefs={columns}>
      </AgGridReact>
      </div>
    </>
  );
}

export default Quizlist;