// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js');


class Manager extends Employee {
    constructor  (_name, _id, _email, _office) {
        super (_name, _id, _email);
        this.officeNumber = _office;
        this.role = 'Manager';
    }

    getOfficeNumber() {
        return (this.officeNumber);
    }

    getRole() {
        return (this.role);
    }
}

module.exports = Manager;
