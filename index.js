const CoursesService = require("./services/courses.service");
const SubjectsService = require("./services/subject.service");
const CommandService = require("./services/command.service");
const config = require("./config");

(async function () {
    const semesterValue = await CommandService.getSemesterInputValue(
        "Type the semester id: "
    );

    console.log(config.urls.SEMESTER_ID)

    // Make directories if not exist
    await CommandService.mkDirIfNotExist(
        `./data/semester/${semesterValue || config.urls.SEMESTER_ID}/subjects`
    );

    /**
     * Get all courses from this semester and save it into the JSON file
     * By default, that file name is "all-courses.json"
     */
    const coursesData = await CoursesService.getAllCourses();
    await CoursesService.saveAllCourseToJSON(coursesData);

    // Log all courses in the console
    console.log("===== ALL COURSES FROM THIS SEMESTER =====");
    console.log(coursesData);

    /**
     * Read all courses from the JSON file and loop through it
     * in order to get all subject of each specific course.
     */
    const courses = await CoursesService.readCoursesFromJsonFile(
        config.fileName.ALL_COURSES_FILE_NAME
    );

    /**
     * An "subjects" array for saving data temporarily to log it in the console
     * Numbering for each subject by increase the index
     */
    let subjects = [];
    let indexSubject = 0;
    console.log("================================");

    /**
     * Loop all course
     * Warn: don't use forEach, cause it doesn't support async perfectly.
     */
    for (const course of courses) {
        indexSubject++;

        // Get all subjects from this course
        const { courseAlias, subjectsArray } =
            await SubjectsService.getAllSubjects(course.courseAlias);

        // Save subjects data into JSON file
        await SubjectsService.saveSubjectDataToJSON(
            courseAlias,
            subjectsArray,
            indexSubject
        );

        // Reading the newly created file and push data into subjects array
        const subject = await SubjectsService.readSubjectFromJsonFile(
            `${course.courseAlias}.json`
        );
        subjects.push(...subject);
    }

    // Indexing for subjects array and log it in the console
    subjects = subjects.map((subject, index) => {
        return {
            id: index + 1,
            ...subject,
        };
    });
    // console.log(subjects);

    // Save all subjects into the JSON file
    // By default, this file name is "all-subjects.json"
    await SubjectsService.saveAllSubjectsDataToJSON(subjects)
        .then(() => {
            // Sweet! All done! :)
            console.log("Done! ~~");
        })
        .catch((err) => {
            // Log error
            console.log(error);
        });
})();
