import { useState } from 'react'
import './App.css'
import useCounter from './hooks/useCounter'

function App() {
  const students = [
    { name: 'Bob the Builder', age: 20, grade: 'A' },
    { name: 'Fix it Felix', age: 22, grade: 'B' },
    { name: 'Dora the Explorer', age: 21, grade: 'A' }
  ];

  const { count, addElement, removeElement, reset } = useCounter(10);

  return (
    <div>
      <h1>Students List</h1>
      <h2>Counter: {count}</h2>
      <button onClick={addElement}>Add</button>
      <button onClick={removeElement}>Remove</button>
      <button onClick={reset}>Reset</button>
      {students.map((student, index) => (
        <div key={index}>
          <h4>{student.name}</h4>
          <p>Age: {student.age}</p>
          <p>Grade: {student.grade}</p>
        </div>
      ))}
    </div>
  )
}

export default App
