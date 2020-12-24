const TeacherApi = {
    "rootUrl":"http://localhost:3001",

    teacher: function() {
        return this.rootUrl+`/teacher`
    },

    subjects: function() {
        return this.rootUrl+`/teacher/subjects`
    },

    students: function() {
        return this.rootUrl+`/teacher/students`
    },

    score: function() {
        return this.rootUrl+`/teacher/score`
    }

    // getRegistration: function() {
    //     return this.rootUrl+`/student/register`
    // }

}

export default TeacherApi