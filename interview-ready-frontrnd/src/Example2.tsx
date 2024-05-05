import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import axios from "axios";

const Example2 = () => {
  const [rowData, setRowData] = useState<Data[]>([]);
  const [columnDefs] = useState<ColDef[]>([
    { field: "id" },
    { field: "name" },
    { field: "age", filter: "agNumberColumnFilter" },
    {
      field: "interviewStatus",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Pending", "Approved"],
      },
    },
    { field: "interviewFeedback" },
    { field: "rating" },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
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
  );
};

export default Example2;
