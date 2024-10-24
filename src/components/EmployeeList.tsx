import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateSalary, deleteEmployee } from "../redux/employeeSlice";
import './EmployeeList.css'; // Link to your list styles

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employee.employees);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState<number | null>(null);
  const [newSalary, setNewSalary] = useState<number>(0);

  const handleEdit = (id: number, currentSalary: number) => {
    setEditId(id);
    setNewSalary(currentSalary);
  };

  const handleSave = (id: number) => {
    if (newSalary < 0) {
      alert("Salary must be a positive number.");
      return;
    }
    dispatch(updateSalary({ id, salary: newSalary }));
    setEditId(null);
    setNewSalary(0);
  };

  const handleCancel = () => {
    setEditId(null);
    setNewSalary(0);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <ul className="employee-list">
      {employees.map((employee) => (
        <li key={employee.id}>
          {employee.name} - 
          {editId === employee.id ? (
            <>
              <input
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(Number(e.target.value))}
              />
              <button onClick={() => handleSave(employee.id)}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <span> Salary: ${employee.salary}</span>
              <button onClick={() => handleEdit(employee.id, employee.salary)}>Edit</button>
              <button onClick={() => handleDelete(employee.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
