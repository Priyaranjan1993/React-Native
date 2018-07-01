let _singleton = Symbol();
const ASSIGNMENT_WIDGET_API_URL = 'http://192.168.0.102:8080/api/lesson/LESSON_ID/assignment';
const EXAM_WIDGET_API_URL = 'http://192.168.0.102:8080/api/lesson/LESSON_ID/exam';
const ESSAY_WIDGET_API_URL = 'http://192.168.0.102:8080/api/exam/EXAM_ID/essay';
const TRUE_FALSE_WIDGET_API_URL = 'http://192.168.0.102:8080/api/exam/EXAM_ID/truefalse';

class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }

/*    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function (response) {
                return response.json();
            });
    }*/

    createAssignmentWidget(assignment,lessonId) {
        return fetch(ASSIGNMENT_WIDGET_API_URL.replace('LESSON_ID', lessonId), {
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    createExam(lessonId) {
        return fetch(EXAM_WIDGET_API_URL.replace('LESSON_ID', lessonId), {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    createEssayWidget(essay,examId) {
        return fetch(ESSAY_WIDGET_API_URL.replace('EXAM_ID', examId), {
            body: JSON.stringify(essay),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    createTrueFalseWidget(trueFalse,examId)
    {
        return fetch(TRUE_FALSE_WIDGET_API_URL.replace('EXAM_ID', examId), {
            body: JSON.stringify(trueFalse),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }


}

export default WidgetService;