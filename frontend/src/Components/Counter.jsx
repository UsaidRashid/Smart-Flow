import React from 'react';

const Counter = ({ remainingTime }) => {

  return (
    <>
    
      {/* <div className="counter text-5xl"> */}
    
    <div class="my-1 overflow-hidden flex justify-center transform transition duration-500 hover:scale-110">
    <div class="bg-gray-700 py-7 text-gray-100 w-[7rem] h-[7rem] text-center m-2 rounded-full shadow-md">
        <p class="seconds text-5xl">{remainingTime > 0 ? `${remainingTime}` : ''}</p>
       
    </div>
</div>
      {/* </div> */}
      </>
    );
  };
  
  export default Counter;