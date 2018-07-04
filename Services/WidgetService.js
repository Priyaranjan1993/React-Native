let _singleton = Symbol();
const ASSIGNMENT_WIDGET_API_URL = 'http://192.168.43.82:8080/api/lesson/LESSON_ID/assignment';
const EXAM_WIDGET_API_URL = 'http://192.168.43.82:8080/api/lesson/LESSON_ID/exam';
const UPDATE_EXAM_WIDGET_API_URL = 'http://192.168.43.82:8080/api/lesson/exam/WIDGET_ID';
const ESSAY_WIDGET_API_URL = 'http://192.168.43.82:8080/api/exam/EXAM_ID/essay';
const UPDATE_ESSAY_WIDGET_API_URL = 'http://192.168.43.82:8080/api/exam/essay/ESSAY_ID';
const TRUE_FALSE_WIDGET_API_URL = 'http://192.168.43.82:8080/api/exam/EXAM_ID/truefalse';
const MULTIPLE_CHOICE_WIDGET_API_URL = 'http://192.168.43.82:8080/api/exam/EXAM_ID/choice';
const FILL_IN_THE_BLANKS_WIDGET_API_URL = 'http://192.168.43.82:8080/api/exam/EXAM_ID/choice';
const FETCH_WIDGET_API_URL = 'http://192.168.43.82:8080/api/lesson/LESSON_ID/widget';
const FETCH_WIDGET_TYPE_API_URL = 'http://192.168.43.82:8080/api/lesson/LESSON_ID/widgetType/WIDGET_ID';
const DELETE_EXAM = 'http://192.168.43.82:8080/api/exam';
const DELETE_ESSAY = 'http://192.168.43.82:8080/api/essay';


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

    fetchWidgetType(lessonId, widgetId) {
        return fetch(FETCH_WIDGET_TYPE_API_URL.replace('LESSON_ID', lessonId, 'WIDGET_ID', widgetId), {
            headers: {
                'Content-Type': 'text/plain'
            },
            method: 'GET'
        }).then(function (response) {
            return response;
        })
    }

    createAssignmentWidget(assignment, lessonId) {
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

    createExam(lessonId, examInfo) {
        return fetch(EXAM_WIDGET_API_URL.replace('LESSON_ID', lessonId), {
            body: JSON.stringify(examInfo),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    updateExam(examInfo,widgetId) {
        return fetch(UPDATE_EXAM_WIDGET_API_URL.replace('WIDGET_ID',widgetId), {
            body: JSON.stringify(examInfo),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }
    deleteExam(widgetId)
    {
        return fetch(DELETE_EXAM + '/' + widgetId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }


    createEssayWidget(essay, examId) {
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

    updateEssayWidget(essay,essayId) {
        return fetch(UPDATE_ESSAY_WIDGET_API_URL.replace('ESSAY_ID',essayId), {
            body: JSON.stringify(essay),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteEssayWidget(widgetId)
    {
        return fetch(DELETE_ESSAY + '/' + widgetId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }

    createTrueFalseWidget(trueFalse, examId) {
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

    createMulipleChoiceWidget(multipleChoice, examId) {
        return fetch(MULTIPLE_CHOICE_WIDGET_API_URL.replace('EXAM_ID', examId), {
            body: JSON.stringify(multipleChoice),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    createFillInTheBlanksWidget(fillIntheBlanks, examId) {
        return fetch(FILL_IN_THE_BLANKS_WIDGET_API_URL.replace('EXAM_ID', examId), {
            body: JSON.stringify(fillIntheBlanks),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    fetchResults(lessonId) {
        return fetch(FETCH_WIDGET_API_URL.replace('LESSON_ID', lessonId), {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(function (response) {
            return response.json();
        })
    }


}

export default WidgetService;