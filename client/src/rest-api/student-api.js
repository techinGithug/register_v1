const StudentApi = {
    "rootUrl":"http://localhost:3001",

    student: function() {
        return this.rootUrl+`/student`
    },

    addStudent: function() {
        return this.rootUrl+`/student`
    },

    register: function() {
        return this.rootUrl+`/student/register`
    },

    getRegistration: function() {
        return this.rootUrl+`/student/register`
    }

}

export default StudentApi