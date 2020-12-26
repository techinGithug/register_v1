import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import AppState from "./context/appState"
import Login from "./components/login"
import Admin from "./components/admins/admin"
import AdminSubject from "./components/admins/admin-subjects"
import AdminStudent from "./components/admins/admin-students"
import AdminTeacher from "./components/admins/admin-teachers"
import AdminRegistration from "./components/admins/admin-registration"
import Student from "./components/students/student"
import StudentSignUp from "./components/students/student-signup"
import StudentRegister from "./components/students/student-register"
import Teacher from "./components/teachers/teacher"
import TeacherStudent from "./components/teachers/teacher-registrations"
import TeacherSubject from "./components/teachers/teacher-subjects"

const App = () => {
  return (
    <Router>
      <AppState>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin-teacher" component={AdminTeacher} />
          <Route path="/admin-student" component={AdminStudent} />
          <Route path="/admin-subject" component={AdminSubject} />  
          <Route path="/admin-registration" component={AdminRegistration} />
          <Route path="/student" component={Student} />
          <Route path="/student-signup" component={StudentSignUp} />
          <Route path="/student-register" component={StudentRegister} />
          <Route path="/teacher" component={Teacher} />
          <Route path="/teacher-registration" component={TeacherStudent} />
          <Route path="/teacher-subject" component={TeacherSubject} />
        </Switch>
      </AppState>
    </Router>
  );
}

export default App;
