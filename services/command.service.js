const fs = require("fs").promises;
const readline = require("readline");
const config = require("../config");

const CoursesService = require("./courses.service");
const SubjectsService = require("./subject.service");

exports.getSemesterInputValue = (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close();
            if (!ans || !Number.isInteger(+ans)) {
                ans = null;
            } else {
                // re-config semester id
                config.urls.SEMESTER_ID = +ans;

                const newOutputPath = `data/semester/${config.urls.SEMESTER_ID}`;
                // Change output of courses
                CoursesService.updateOutputCourseDir(newOutputPath);

                // Change output of subjects
                SubjectsService.updateOutputSubjectDir(newOutputPath);
            }

            resolve(ans);
        })
    );
};

exports.mkDirIfNotExist = async (path) => {
    await fs
        .mkdir(path, {
            recursive: true,
        })
        .catch((err) => {
            //decide what you want to do if this failed
            console.error(err);
        });
};
