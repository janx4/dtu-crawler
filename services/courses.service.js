const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");

const config = require("../config");

let OUPUT_DIR = `data/semester/${config.urls.SEMESTER_ID}`;
exports.updateOutputCourseDir = (newPath) => {
    OUPUT_DIR = newPath;
};

const getHtmlAllCourses = async () => {
    let html = "empty";
    try {
        const response = await axios.get(config.urls.URL_ALL_COURSES);
        html = response.data;
    } catch (error) {
        console.log(error);
    }
    return html;
};

exports.getAllCourses = async () => {
    const html = await getHtmlAllCourses();

    const $ = cheerio.load(html);
    const outputArray = [];

    $("select")
        .find("option")
        .each((i, el) => {
            if (i == 0) return;
            const courseAlias = el.attribs.value;

            outputArray.push({
                id: i,
                courseAlias,
            });
        });
    return outputArray;
};

exports.saveAllCourseToJSON = async (data) => {
    await fs.writeFile(
        path.join(
            __dirname,
            `../${OUPUT_DIR}/${config.fileName.ALL_COURSES_FILE_NAME}`
        ),
        JSON.stringify(data),
        (err) => {
            if (err) {
                throw err;
            } else {
                console.log(
                    "Write all courses data to json file successfully!"
                );
            }
        }
    );
};

exports.readCoursesFromJsonFile = async (filename) => {
    const data = await fs.readFile(
        path.join(__dirname, `../${OUPUT_DIR}/${filename}`)
    );
    return JSON.parse(data);
};
