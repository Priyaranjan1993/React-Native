let _singleton = Symbol();
const ASSIGNMENT_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/lesson/LESSON_ID/assignment';
const EXAM_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/lesson/LESSON_ID/exam';
const UPDATE_EXAM_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/lesson/exam/WIDGET_ID';
const UPDATE_ASSIGNMENT_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/lesson/assignment/WIDGET_ID';
const ESSAY_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/exam/EXAM_ID/essay';
const UPDATE_ESSAY_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/exam/essay/ESSAY_ID';
const UPDATE_MCQ_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/exam/choice/MCQ_ID';
const UPDATE_TRUE_FALSE_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/exam/trueFalse/TRUE_FALSE_ID';
const UPDATE_FILL_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/exam/fillInTheBlanks/FILL_ID';
const TRUE_FALSE_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/exam/EXAM_ID/truefalse';
const MULTIPLE_CHOICE_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/exam/EXAM_ID/choice';
const FILL_IN_THE_BLANKS_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/exam/EXAM_ID/blanks';
const FETCH_WIDGET_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/lesson/LESSON_ID/widget';
const FETCH_WIDGET_TYPE_API_URL = 'https://peaceful-inlet-41065.herokuapp.com/api/lesson/LESSON_ID/widgetType/WIDGET_ID';
const DELETE_EXAM = 'https://peaceful-inlet-41065.herokuapp.com/api/exam';
const DELETE_ASSIGNMENT = 'https://peaceful-inlet-41065.herokuapp.com/api/assignment';
const DELETE_ESSAY = 'https://peaceful-inlet-41065.herokuapp.com/api/essay';
const DELETE_MCQ = 'https://peaceful-inlet-41065.herokuapp.com/api/choice';
const DELETE_TRUE_FALSE = 'https://peaceful-inlet-41065.herokuapp.com/api/trueFalse';
const DELETE_FILL = 'https://peaceful-inlet-41065.herokuapp.com/api/fillInTheBlanks';


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

    updateAssignment(assignmentInfo,widgetId) {
        return fetch(UPDATE_ASSIGNMENT_WIDGET_API_URL.replace('WIDGET_ID',widgetId), {
            body: JSON.stringify(assignmentInfo),
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

    deleteAssignment(widgetId)
    {
        return fetch(DELETE_ASSIGNMENT + '/' + widgetId,
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

    updateTrueFalse(trueFalse,trueFalseId) {
        return fetch(UPDATE_TRUE_FALSE_WIDGET_API_URL.replace('TRUE_FALSE_ID',trueFalseId), {
            body: JSON.stringify(trueFalse),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteTrueFalseWidget(widgetId)
    {
        return fetch(DELETE_TRUE_FALSE + '/' + widgetId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
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

    updateMCQ(mcq,mcqId) {
        return fetch(UPDATE_MCQ_WIDGET_API_URL.replace('MCQ_ID',mcqId), {
            body: JSON.stringify(mcq),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteMCQWidget(widgetId)
    {
        return fetch(DELETE_MCQ + '/' + widgetId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
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

    updateFillInTheBlanksWidget(fill,fillId) {
        return fetch(UPDATE_FILL_WIDGET_API_URL.replace('FILL_ID',fillId), {
            body: JSON.stringify(fill),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteFillWidget(widgetId)
    {
        return fetch(DELETE_FILL + '/' + widgetId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
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