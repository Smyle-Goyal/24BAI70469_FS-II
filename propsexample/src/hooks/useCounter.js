import React from 'react';
import { useState } from 'react';
function useCounter(initialValue){
    const [count, setCount] = useState(initialValue);

    const addElement = () => {
        setCount(count + 1);
    }

    const removeElement = () => {
        setCount(count - 1);
    }

    const reset = () => {
        setCount(0);
    }

        return{ count, addElement, removeElement, reset }
}

export default useCounter;