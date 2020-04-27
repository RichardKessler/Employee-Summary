const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let dataEntry = true;
// Here we create an additon array to store our team info
const teamMembers = [];

// Main code to import user details and export

const getEmployeeType = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "EmployeeType",
            message: "Please select the employee Type",
            choices: ["Intern", "Engineer", "Manager", "Done"]
        }
    ])
}

const createTeam = () => {
    console.log ("CreatingTeam");
}

const createManager = () => {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your direct office number?",
    },
    ]).then((userInput) => {
        const manager = new Manager(userInput.name, userInput.id, userInput.email, userInput.officeNumber)
        teamMembers.push(manager)
    })
};

async function createIntern() {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "school",
        message: "What school are you attending?"
    }]).then((userInput) => {
        const intern = new Intern(userInput.name, userInput.id, userInput.email, userInput.school)
        teamMembers.push(intern)
    });
}

async function createEngineer() {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "gitHub",
        message: "What is your GitHub UserName?"
    }]).then((userInput) => {
        const engineer = new Engineer(userInput.name, userInput.id, userInput.email, userInput.gitHub)
        teamMembers.push(engineer)
    })
}

const writeFile = () => {
    console.log ("Writing File");
    console.log (OUTPUT_DIR);
    console.log (outputPath);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

async function selectUserType(data) {
    switch (data.EmployeeType) {
        case ("Intern"):
            console.log("Intern Selected");
            await createIntern();
            break;
        case ("Engineer"):
            console.log("Engineer Selected");
            await createEngineer();
            break;
        case ("Manager"):
            console.log("Manager Selected");
            await createManager();
            break;
        case ("Done"):
            console.log("Done creating users, building page");
            dataEntry = false;
            writeFile();
            break;
        default:
            console.log("You get an F");
            dataEntry = false;
    }
}

async function init() {
    // We're going to loop this until the user selects done or an error occurs
    while (dataEntry) {
        console.log (dataEntry);
        const employeeType = await getEmployeeType();
        await selectUserType(employeeType);
    }
}

// All variables and functions are created, now start the app.
init();