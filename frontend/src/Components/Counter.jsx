import React, { useContext } from 'react';

const Counter = ({ remainingTime }) => {

    return (
      <div className="counter">
        {remainingTime > 0 ? `${remainingTime} sec` : ''} 
      </div>
    );
  };
  
  export default Counter;