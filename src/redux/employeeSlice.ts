

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: number;
  name: string;
  salary: number;
}

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Omit<Employee, "id">>) => {
      const newEmployee: Employee = {
        id: state.employees.length > 0 ? Math.max(...state.employees.map(emp => emp.id)) + 1 : 1, // Ensure unique IDs
        ...action.payload,
      };
      state.employees.push(newEmployee);
    },
    updateSalary: (state, action: PayloadAction<{ id: number; salary: number }>) => {
      const employee = state.employees.find(emp => emp.id === action.payload.id);
      if (employee) {
        employee.salary = action.payload.salary;
      }
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
  },
});

export const { addEmployee, updateSalary, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
