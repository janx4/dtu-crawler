const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");

const config = require("../config");

let OUPUT_DIR = `data/semester/${config.urls.SEMESTER_ID}`;
exports.updateOutputSubjectDir = (newPath) => {
    OUPUT_DIR = newPath;
};

const getHtmlByCourseAlias = async (courseAlias = "ACC") => {
    let html = "";
    try {
        const response = await axios.get(
            config.urls.getSubjectUrl(courseAlias, config.urls.SEMESTER_ID)
        );
        html = response.data;
    } catch (error) {}

    return html;
};

exports.getAllSubjects = async (courseAlias) => {
    console.log(chalk.yellow.bold(`Start crawling course: ${courseAlias}`));

    const html = await getHtmlByCourseAlias(courseAlias);
    const $ = cheerio.load(html);

    let subjectsArray = [];

    $("tbody")
        .find("tr.lop")
        .each((_, el) => {
            const subject = {};
            $(el)
                .find("a.hit:first-child")
                .each((index, anchorTag) => {
                    let content = $(anchorTag).text().trim();

                    if (index === 0) {
                        content = content.replace(/ |-/g, "");
                        subject.subjectAlias = content;
                    } else {
                        subject.subjectName = content;
                    }
                });

            subjectsArray.push(subject);
        });

    return { courseAlias, subjectsArray };
};

exports.saveSubjectDataToJSON = async (alias, data, index) => {
    await fs.writeFile(
        path.join(__dirname, `../${OUPUT_DIR}/subjects/${alias}.json`),
        JSON.stringify(data)
    );

    console.log(
        chalk.bgGreen.black.bold(
            `${index}. Save all subjects of ${alias} course into `
        ) +
            chalk.bgGreen.white.bold(`${OUPUT_DIR}/subjects/${alias}.json`) +
            chalk.bgGreen.black.bold(" successfully!")
    );

    console.log("================================");
};

exports.readSubjectFromJsonFile = async (filename) => {
    const data = await fs.readFile(
        path.join(__dirname, `../${OUPUT_DIR}/subjects/${filename}`)
    );
    return JSON.parse(data);
};

exports.saveAllSubjectsDataToJSON = async (data) => {
    await fs.writeFile(
        path.join(
            __dirname,
            `../${OUPUT_DIR}/${config.fileName.ALL_SUBJECTS_FILE_NAME}`
        ),
        JSON.stringify(data)
    );
};
