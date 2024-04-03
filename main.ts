#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todos: string[] = [];
let condition: boolean = true;

async function main() {
    while(condition) {
        const choice = await inquirer.prompt({
            name: "action",
            type: "list",
            message: chalk.greenBright("What would you like to do?"),
            choices: ["Add Todo", "View Todos", "Update Todo", "Delete Todo", "Exit"]
        });

        switch (choice.action) {
            case "Add Todo":
                await addTodo();
                break;
            case "View Todos":
                viewTodos();
                break;
            case "Update Todo":
                await updateTodo();
                break;
            case "Delete Todo":
                await deleteTodo();
                break;
            case "Exit":
                condition = false;
                console.log("Exiting Todo list. Goodbye!");
                break;
        }
    }
}

async function addTodo() {
    const addtasks = await inquirer.prompt({
        name: "todo",
        type: "input",
        message: chalk.greenBright("What do you want to add to your todo?")
    });
    todos.push(addtasks.todo);
    console.log(chalk.greenBright("Todo added successfully!"));
}

function viewTodos() {
    console.log(chalk.blueBright("Current Todos:"));
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
    });
}

async function updateTodo() {
    viewTodos();
    const updateTask = await inquirer.prompt({
        name: "index",
        type: "number",
        message: chalk.greenBright("Enter the index of the todo you want to update:")
    });
    const newIndex = updateTask.index - 1;
    if (todos[newIndex]) {
        const updatedTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: chalk.greenBright("Enter the new todo:")
        });
        todos[newIndex] = updatedTodo.todo;
        console.log(chalk.greenBright("Todo updated successfully!"));
    } else {
        console.log(chalk.redBright("Invalid index!"));
    }
}

async function deleteTodo() {
    viewTodos();
    const deleteTask = await inquirer.prompt({
        name: "index",
        type: "number",
        message: chalk.greenBright("Enter the index of the todo you want to delete:")
    });
    const index = deleteTask.index - 1;
    if (todos[index]) {
        todos.splice(index, 1);
        console.log(chalk.greenBright("Todo deleted successfully!"));
    } else {
        console.log(chalk.redBright("Invalid index!"));
    }
}

main();
