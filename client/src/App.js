import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import AppState from "./context/appState"
import Login from "./components/login"
import Admin from "./components/admins/admin"
import Subject from "./components/admins/admin-subjects"
import Student from "./components/students/student"

const App = () => {
  return (
    <Router>
      <AppState>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route path="/register" component={Register} /> */}
           <Route path="/admin" component={Admin} />
          {/*<Route path="/admin-student" component={AdminStudent} />*/}
          <Route path="/admin-subject" component={Subject} />  
          <Route path="/student" component={Student} />
          {/*<Route path="/student-register" component={RegisterStudent} />
          <Route path="/student-addData" component={AddStudentData} />
          <Route path="/student-profile" component={StudentProfile} />
          <Route path="/teacher" component={Teacher} />
          <Route path="/register-teacher" component={RegisterTeacher} /> */}

        </Switch>
      </AppState>
    </Router>
  );
}

export default App;
