## Crawling Courses and Subjects of Duy Tan University

---

### This project will help you to crawl `all subjects`, `all courses` and `all classes` of `each specific subject`.

---

> Notice: The ouput **_data_** will be saved into data folder when you run the start command

> Dont worry about the data folder is exist or not, that will be create automatically. :)

---

## How to play:

> Easy! You can run the following commands and enjoy the results :))

### 1. Make sure you have installed all the dependencies of this project by running `npm install`.

### 2. Run `npm start` and type the semester id you want to crawl from it.

### 3. Wait and check the ***data*** folder.

### 4. Enjoy it!

---

## Some configuration for you:

> Now let's check the config folder of this project structure:

-   In the `fileName.js`, we can config the **_JSON_** file name of all courses, all subjects of DTU

```js
exports.ALL_COURSES_FILE_NAME = 'allCourses.json';

exports.ALL_SUBJECTS_FILE_NAME = 'allSubjects.json';
```

-   In the `urls.js`, we have some config about URL we are gonna request to fetch data. Importantly, `SEMESTER_ID` is the id of the semester of `DTU`.

- By default, the `SEMESTER_ID` is 77 (equals **`the summer semester in 2022`**).

```js
let SEMESTER_ID = 77;
const URL_ALL_COURSES = `http://courses.duytan.edu.vn/Modules/academicprogram/ajax/LoadCourses.aspx?t=1646885465830`;

function getSubjectUrl(courseAlias = 'ACC', semesterId) {
	const url = `http://courses.duytan.edu.vn/Modules/academicprogram/CourseResultSearch.aspx?discipline=${courseAlias}&keyword1=&hocky=${semesterId}&t=1646885465830`;
	return url;
}

module.exports = { SEMESTER_ID, URL_ALL_COURSES, getSubjectUrl };
```

# Okay that's all, thanks! :)
