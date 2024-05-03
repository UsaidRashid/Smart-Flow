import React from 'react';

const Counter = ({ remainingTime }) => {

    return (
      <div className="counter text-5xl">
        {remainingTime > 0 ? `${remainingTime} sec` : ''} 
      </div>
    );
  };
  
  export default Counter;