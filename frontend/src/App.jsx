import React from 'react'
import Navbar from './Components/Navbar'
import DropImage from './Components/DropImage'
import { useState, useEffect} from 'react';
import Counter from './Components/Counter';
import axios from 'axios';

export default function App() {
  const [remainingTime , setRemainingTime ]= useState(20);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentSide, setCurrentSide] = useState('north');

  const checkCapturedImage = async () => {
    if (!imageUrls || imageUrls.length === 0) {
      return;
    }
    
    const sideIndexMap = {
      north: 0,
      east: 1,
      south: 2,
      west: 3,
    };

    const sideMap = {
      0: "north",
      1: "east",
      2: "south",
      3: "west",
    };

    const currentSideImage = imageUrls[sideIndexMap[currentSide]];
    if (currentSideImage && currentSideImage.includes('empty')) {
      const restIndexes = [{}];
      for(let i=0;i<=3;i++){
        if(sideIndexMap[currentSide]!=i) restIndexes.push({image:imageUrls[i],side:sideMap[i]});
      }
      const response = await axios.post('http://localhost:3005/processimages' , restIndexes);
      console.log(response);
      setCurrentSide(response.side);
    }
  };

  function getNextSide(currentSide) {
    switch (currentSide) {
      case 'north':
        return 'east';
      case 'east':
        return 'south';
      case 'south':
        return 'west';
      case 'west':
        return 'north';
      default:
        return 'north'; 
    }
  }

  const fetchImageUrls = async () => {
    try {
      const response = await axios.get('http://localhost:3005/getimages');
      const images = response.data.randomImages;
      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }
      setImageUrls(images);
     
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    }
  };

  useEffect(() => {
    checkCapturedImage();
  }, [imageUrls]);

  useEffect(() => {
    const intervalId = setInterval(() => {
     
      if(remainingTime>0){
        setRemainingTime(remainingTime-1);
      }else{
        const nextSide = getNextSide(currentSide);
        setCurrentSide(nextSide);
        setRemainingTime(20);
      }
    }, 1000); 
  
    return () => clearInterval(intervalId);
  }, [currentSide, remainingTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime %10===0 && remainingTime>=10 ) {
        fetchImageUrls();
        
      }
    }, 1000); 
  
    return () => clearInterval(intervalId);
  }, [currentSide, remainingTime]); 

  return (
    <>
      <Navbar/>
      <div className='absolute top-[7rem] right-[25rem]'>
                <DropImage
                  side="north"
                  image={`./public/assets/${imageUrls[0]}`}
                  
                />
                <div className='flex justify-center'>
                    {currentSide!="north"? <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />:<img src={`./public/assets/images/go.png`} alt="" className=' w-1/2 h-20 ' />}
                </div>
              { currentSide=="north" && <Counter remainingTime={remainingTime} />} 
     </div>
      <div className='absolute top-[7rem] left-[22rem]'>
              <DropImage
                side="west"
                image={`./public/assets/${imageUrls[3]}`}
                
              />

              <div className='flex justify-center'>
              {currentSide!="west"? <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />:<img src={`./public/assets/images/go.png`} alt="" className=' w-1/2 h-20 ' />}
              </div>
              {currentSide=="west" && <Counter remainingTime={remainingTime} />}
     </div>
      <div className='absolute top-[29rem] left-[22rem]'>
                <DropImage
                  side="south"
                  image={`./public/assets/${imageUrls[2]}`}
                  
                />
                <div className='flex justify-center'>
                {currentSide!="south"? <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />:<img src={`./public/assets/images/go.png`} alt="" className=' w-1/2 h-20 ' />}
              </div>
              {currentSide=="south" && <Counter remainingTime={remainingTime} />}
     </div>
      <div className='absolute top-[29rem] right-[25rem]'>
                <DropImage
                    side="east"
                    image={`./public/assets/${imageUrls[1]}`}
                    
                />
              <div className='flex justify-center'>
              {currentSide!="east"? <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />:<img src={`./public/assets/images/go.png`} alt="" className=' w-1/2 h-20 ' />}
              </div>
              {currentSide=="east" && <Counter remainingTime={remainingTime} />}
      </div>
    </>
  )
}