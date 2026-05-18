import Employee from '../models/Employee.js';

export const getEmployees = async (req, res) => {
  try {
    const { department, search } = req.query;
    let query = {};
    if (department) {
      query.department = department;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;
    
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ id: employee._id, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
