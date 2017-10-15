#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');

const CURR_DIR = process.cwd();

console.log('CURR_DIR', CURR_DIR);

const QUESTIONS = [
    {
        name: 'neurone-name',
        type: 'input',
        message: 'Project name : ',
        validate: input => {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    }
];

inquirer.prompt(QUESTIONS)
.then(answers => {
    const projectName = answers['neurone-name'];
    const templatePath = `${__dirname}/templates`;
    const projectPath = `${CURR_DIR}/${projectName}`;
    const files = [
        {templateFile: `${templatePath}/config.js`, targetPath: `src/config.js`},
        {templateFile: `${templatePath}/server.js`, targetPath: `server.js`},
        {templateFile: `${templatePath}/package.json`, targetPath: `package.json`},
    ];

    console.log('(projectPath', projectPath);
    console.log('(templatePath', templatePath);
    console.log(files);
    fs.mkdirSync(projectPath);
    fs.mkdirSync(`${projectPath}/src`);

    files.forEach(file => {
        const stats = fs.statSync(file.templateFile);

        if (stats.isFile()) {
            const contents = fs.readFileSync(file.templateFile, 'utf8').replace(/#NAME#/g, projectName);
            console.log(contents);

            const writePath = `${projectPath}/${file.targetPath}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        }
    });
})
.catch(e => console.error(e));