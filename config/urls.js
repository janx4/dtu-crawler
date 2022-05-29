let SEMESTER_ID = 77;
const URL_ALL_COURSES = `http://courses.duytan.edu.vn/Modules/academicprogram/ajax/LoadCourses.aspx?t=1646885465830`;

function getSubjectUrl(courseAlias = 'ACC', semesterId) {
	const url = `http://courses.duytan.edu.vn/Modules/academicprogram/CourseResultSearch.aspx?discipline=${courseAlias}&keyword1=&hocky=${semesterId}&t=1646885465830`;
	return url;
}

module.exports = { SEMESTER_ID, URL_ALL_COURSES, getSubjectUrl };
