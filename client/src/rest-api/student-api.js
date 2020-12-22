const StudentApi = {
    "rootUrl":"http://localhost:3001",

    student: function() {
        return this.rootUrl+`/student`
    },
}

export default StudentApi