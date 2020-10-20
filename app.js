const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];
const ids = [];

function teamBuilder() {
    function createManager() {
       inquirer.prompt([
          {
            type: "input",
            name: "managerName",
            message: "Welcome! Enter manager's name?",
          },
          {
            type: "input",
            name: "managerId",
            message: "Enter manager's id?",
          },
          {
            type: "input",
            name: "managerEmail",
            message: "Enter manager's email?",
            
          },
          {
            type: "input",
            name: "managerOfficeNumber",
            message: "Enter manager's office number?",
          }
        ]).then(responses => {
          const manager = new Manager(responses.managerName, responses.managerId, responses.managerEmail, responses.managerOfficeNumber);
          team.push(manager);
          ids.push(responses.managerId);
          createTeam();
        });
      }
    
      function createTeam() {
    
        inquirer.prompt([
          {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add a team-mate??",
            choices: [
              "Engineer",
              "Intern",
              "Please god no more"
            ]
          }
        ]).then(nextEmployee => {
          switch(nextEmployee.addEmployee) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
          }
        });
      }
    
      function addEngineer() {
        inquirer.prompt([
          {
            type: "input",
            name: "engineerName",
            message: "Enter engineer's name?",
         },
          {
            type: "input",
            name: "engineerId",
            message: "Enter engineer's id?",
          },
          {
            type: "input",
            name: "engineerEmail",
            message: "Enter engineer's email?",
          },
          {
            type: "input",
            name: "engineerGithub",
            message: "Enter engineer's GitHub username?",
          }
        ]).then(responses => {
          const engineer = new Engineer(responses.engineerName, responses.engineerId, responses.engineerEmail, responses.engineerGithub);
          team.push(engineer);
          ids.push(responses.engineerId);
          createTeam();
        });
      }
    
      function addIntern() {
        inquirer.prompt([
          {
            type: "input",
            name: "internName",
            message: "Enter intern's name?",
           },
          {
            type: "input",
            name: "internId",
            message: "Enter intern's id?",
            },
          {
            type: "input",
            name: "internEmail",
            message: "Enter intern's email?",
          },
          {
            type: "input",
            name: "internSchool",
            message: "Enter intern's school?",
          }
        ]).then(responses => {
          const intern = new Intern(responses.internName, responses.internId, responses.internEmail, responses.internSchool);
          team.push(intern);
          ids.push(responses.internId);
          createTeam();
        });
      }
    
      function buildTeam() {
       
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(team), "utf-8");
      }
    
      createManager();
}
teamBuilder()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
