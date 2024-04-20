import { useState } from 'react';

export const Counter = () => {
	const [counter, setCounter] = useState(0);
	return (
		<button className='counter-btn' onClick={() => setCounter(prev => prev + 1)}>Clicked {counter} times</button>
	)
}
