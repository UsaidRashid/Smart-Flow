import React from 'react'
import Navbar from './Components/Navbar'
import DropImage from './Components/DropImage'
import { useState, useEffect} from 'react';
import Counter from './Components/Counter';
import axios from 'axios';

export default function App() {
  const [remainingTime , setRemainingTime ]= useState(60);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentSide, setCurrentSide] = useState('north');
  const [isPaused , setisPaused] = useState(false);
  const [stackedside , setStackedSide] = useState(null);

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
      setisPaused(true);
      setStackedSide(getNextSide(currentSide));
      const restIndexes = [];
      for(let i=0;i<=3;i++){
        if(sideIndexMap[currentSide]!=i) restIndexes.push({image:imageUrls[i],side:sideMap[i]});
      }
      const response = await axios.post('http://localhost:3005/processimages' , restIndexes);
      setCurrentSide(response.data.resultSide);
      setisPaused(false);
    }
  };

  

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
     
      if(!isPaused && remainingTime>0){
        setRemainingTime(remainingTime-1);
      }else if(remainingTime===0){
        if(stackedside!=null){
          setCurrentSide(stackedside);
          setStackedSide(null);
        }
        else setCurrentSide(getNextSide(currentSide));
        setRemainingTime(60);
      }
    }, 1000); 
  
    return () => clearInterval(intervalId);
  }, [currentSide, remainingTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime %10===0 && remainingTime>10) {
        if(remainingTime==60 || stackedside==null) fetchImageUrls();
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
                {console.log(imageUrls)}
                <div className='flex justify-center'>
                    {currentSide!="north"? <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />:<img src={`./public/assets/images/go.png`} alt="" className=' w-1/2 h-20 ' />}
                </div>
              
     </div>
      <div className='absolute top-[7rem] left-[22rem]'>
              <DropImage
                side="west"
                image={`./public/assets/${imageUrls[3]}`}
              />

              <div className='flex justify-center'>
              {currentSide!="west"? <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />:<img src={`./public/assets/images/go.png`} alt="" className=' w-1/2 h-20 ' />}
              </div>
              
     </div>
     <div className='absolute top-[20rem] left-[48rem]  '>
          <Counter remainingTime={remainingTime}></Counter>
     </div>
      <div className='absolute top-[29rem] left-[22rem]'>
                <DropImage
                  side="south"
                  image={`./public/assets/${imageUrls[2]}`}
                  
                />
                <div className='flex justify-center'>
                {currentSide!="south"? <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />:<img src={`./public/assets/images/go.png`} alt="" className=' w-1/2 h-20 ' />}
              </div>
              
     </div>
      <div className='absolute top-[29rem] right-[25rem]'>
                <DropImage
                    side="east"
                    image={`./public/assets/${imageUrls[1]}`}
                    
                />
              <div className='flex justify-center'>
              {currentSide!="east"? <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />:<img src={`./public/assets/images/go.png`} alt="" className=' w-1/2 h-20 ' />}
              </div>
 
      </div>
    </>
  )
}