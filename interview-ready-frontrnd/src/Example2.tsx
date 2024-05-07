import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import axios from "axios";
import "./Button.css";


const Dashboard = () => {

  const button = (params: any) => {

    const deleteEntry = async () => {
      const deleteData = params.node.data;
      params.api.applyTransaction({ remove: [deleteData] });
      try {
        const response = await axios.delete(
          "http://localhost:3000/api/v1/interview/delete/" + deleteData.id,
          deleteData
        );
        console.log("Interview Deleted successfully:", response.data);
      } catch (error) {
        console.error("Error adding Deleting Interview:", error);
      }
    };
    return (
      <button className="btn" onClick={deleteEntry}>
        Delete
      </button>
    );
  };

  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs] = useState<ColDef[]>([
    // { field: "id", headerName: "ID" },
    { field: "InterviewName", headerName: "Name", editable: true },
    {
      field: "InterviewSatuts",
      headerName: "Interview Status",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Pending", "Approved"],
      },
    },
    {
      field: "InterviewFeedBack",
      headerName: "Interview Feedback",
      editable: true,
    },
    { field: "InterviewRating", headerName: "Rating", editable: true },
    {
      headerName: "Action",
      cellRenderer: button,
      editable: false,
      colId: "action",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    InterviewSatuts: "Pending",
    InterviewRating: 0,
    InterviewFeedBack: "",
    InterviewName: "",
  });

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    openModal();
  };

  const handleSave = async () => {
    // Save new entry to backend and update rowData state
    // newEntry.InterviewRating = parseInt(newEntry.InterviewRating);

    // console.log(newEntry);
    // rowData.push(newEntry);

    setRowData([...rowData]);
    const requestBody = { ...newEntry, userId: 2 };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/interview/create",
        requestBody
      );
      console.log("New entry added successfully:", response.data);
    } catch (error) {
      console.error("Error adding new entry:", error);
    }
    closeModal();
  };
  const handlechange = async (params: any) => {
    // console.log(params);
    // console.log(params.data);
    const { createdAt, updatedAt, ...value } = params.data;
    // const value = params.data;
    // console.log(`fgdtgh`, value);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/interview/update/" + value.id,
        value
      );
      console.log("New entry added successfully:", response.data);
    } catch (error) {
      console.error("Error adding new entry:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "InterviewRating" ? parseInt(value, 10) : value;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: parsedValue,
    }));
  };

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="ag-theme-quartz" style={{ height: 500, width: 1000, marginTop: 65 }}>
          <AgGridReact
            onCellValueChanged={handlechange}
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
      <div
        className="bottom-buttons"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button onClick={handleAddNew}>Add New</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input
              type="text"
              name="InterviewName"
              value={newEntry.InterviewName}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <select
              name="InterviewSatuts"
              value={newEntry.InterviewSatuts}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
            <input
              type="text"
              name="InterviewFeedBack"
              value={newEntry.InterviewFeedBack}
              onChange={handleInputChange}
              placeholder="Interview Feedback"
            />
            <input
              type="number"
              name="InterviewRating"
              value={newEntry.InterviewRating}
              onChange={handleInputChange}
              placeholder="Rating"
              defaultValue={0}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
