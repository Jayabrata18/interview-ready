import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import axios from "axios";

const Example2 = () => {
  const [rowData, setRowData] = useState<Data[]>([]);
  const [columnDefs] = useState<ColDef[]>([
    { field: "id", headerName: "ID" },
    { field: "InterviewName", headerName: "Name" },
    // { field: "age", filter: "agNumberColumnFilter" },
    {
      field: "InterviewSatuts",
      headerName: "Interview Status",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Pending", "Approved"],
      },
    },
    { field: "InterviewFeedBack", headerName: "Interview Feedback" },
    { field: "InterviewRating", headerName: "Rating" },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/interview/all/"
      );
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="ag-theme-quartz" style={{ height: 500, width: 1200 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
          />
        </div>
      </div>
      <div className="bottom-buttons" style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={fetchData}>Update</button>
        <button>Add New</button>
      </div>
    </div>
  );
};

export default Example2;
