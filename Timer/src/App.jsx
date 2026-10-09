import { useEffect, useState } from 'react'
import './App.css'

function formatTime(time) {
  const hours = String(Math.floor(time / 3600000)).padStart(2, '0')
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0')
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0')
  const milliseconds = String(time % 1000).padStart(3, '0')

  return `${hours}:${minutes}:${seconds}.${milliseconds}`
}

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (!isRunning) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setElapsedTime((previousTime) => previousTime + 10)
    }, 10)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning((previousState) => !previousState)
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsedTime(0)
  }

  return (
    <main className="stopwatch-app">
      <section className="stopwatch-card">
        <p className="eyebrow">React Stopwatch</p>
        <h1 className="display">{formatTime(elapsedTime)}</h1>

        <div className="controls">
          <button className="primary" onClick={handleStartStop}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button className="secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
