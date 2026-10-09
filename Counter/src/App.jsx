import { useState } from 'react';

function App() {

  const [counter, setCounter] = useState(10);

  const addButton = () => {
    setCounter(counter + 1);
  };

  const subtractButton = () => {
    setCounter(counter - 1);
  };

  return (
    <>
      <h1>Welcome to Counter React Application</h1>

      <button onClick={addButton}>Add  1 to {counter}</button>
      <br />

      <p>{counter}</p>
      <br />

      <button onClick={subtractButton}>Subtract 1 from {counter}</button>
    </>
  )
}

export default App
