import { useState, useEffect, useRef} from 'react'
import { UserContext } from './assets/UserContext'
import { useUser } from './assets/useUser'
import './App.css'

const user = {
  name: "Karan Mehta",
  email: "karan@gmail.com",
  program: "Web Development"
};


function navbar(user, totalEnrolled) {
  return (
    <header className="navbar">
      <div>
        <h1>----------------------------------------------------</h1>
        <h1>SKILLNEST - ONLINE LEARNING PLATFORM</h1>
        <h1>----------------------------------------------------</h1>
        <p className="Welcome">Welcome to SkillNest, {user.name}</p>
        <p className="Program">Program: {user.program}</p>
        <p className="Enrollment">Enrolled: {totalEnrolled} courses</p>
      </div>
    </header>
  )
}

function dashboard({user, onEnroll }) {
  return (
    <section className="dashboard">
      <CourseCatalog user={user} onEnroll={onEnroll} />
    </section>
  )
}

function CourseCatalog({user, onEnroll }) {
  return <CourseList user={user} onEnroll={onEnroll} />
}

function CourseList({ user, onEnroll }) {
  const courses = [
    { title: 'React Basics', price: '₹999' },
    { title: 'Node.js Essentials', price: '₹1199' },
    { title: 'UI/UX Design', price: '₹799' },
  ]

  return (
    <div className="course-list-container">
      <h3>Course Catalog</h3>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.title} className="course-card">
            <div>
              <div className="course-title">{course.title}</div>
              <div className="course-price">{course.price}</div>
            </div>
            <button className="enroll-button" onClick={onEnroll}>Enroll</button>
          </div>
        ))}
      </div>
      <StudentProfile user={user} />
    </div>
  )
}

function StudentProfile({ user: userFromProp }) {
  const contextUser = useUser()
  const student = userFromProp ?? contextUser

  return (
    <div className="profile-box">
      <h3>Student Details</h3>
      <p>-----------------------------</p>
      <div className="profile-row">Name: {student.name}</div>
      <div className="profile-row">Email: {student.email}</div>
      <div className="profile-row">Program: {student.program}</div>
    </div>
  )
}


function App() {
  const [totalEnrolled, setTotalEnrolled] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    console.log(`Total courses enrolled: ${totalEnrolled}`);
  }, [totalEnrolled]);

  const handleEnroll = () => {
    setTotalEnrolled(totalEnrolled + 1);
  }

  return (
    <>
      <UserContext.Provider value={user}>
        <div className="app">
          {navbar(user, totalEnrolled)}
          {dashboard({ user, onEnroll: handleEnroll })}
        </div>
      </UserContext.Provider>
    </>
  )
}

export default App
