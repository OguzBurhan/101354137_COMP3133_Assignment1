const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Employee = require('./models/Employee');

const resolvers = {
  Query: {
    // Login resolver
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid credentials');
      }
      // Implement JWT token creation here
      return user;
    },

    // Get all employees resolver
    async getAllEmployees() {
      return await Employee.find({});
    },

    // Search employee by ID resolver
    async searchEmployeeById(_, { _id }) {
      return await Employee.findById(_id);
    },
  },

  Mutation: {
    // Signup resolver
    async signup(_, { username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      return await newUser.save();
    },

    // Add new employee resolver
    async addNewEmployee(_, { first_name, last_name, email, gender, salary }) {
      const newEmployee = new Employee({ first_name, last_name, email, gender, salary });
      return await newEmployee.save();
    },

    // Update employee by ID resolver
    async updateEmployeeById(_, { _id, first_name, last_name, email, gender, salary }) {
      return await Employee.findByIdAndUpdate(_id, { first_name, last_name, email, gender, salary }, { new: true });
    },

    // Delete employee by ID resolver
    async deleteEmployeeById(_, { _id }) {
      await Employee.findByIdAndDelete(_id);
      return "Employee deleted successfully";
    },
  },
};

module.exports = { resolvers };
