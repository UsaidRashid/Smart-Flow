const {spawn} = require("child_process");
const path = require('path'); 

async function callAI(imagePath) {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(__dirname, '../AI/AI.py');
      const pythonProcess = spawn('python', [scriptPath, imagePath]);
  
      let outputData = '';
  
      pythonProcess.stderr.on('data', (err) => {
        const errString = err.toString();
        if (!errString.includes('Using cache found in') &&
            !errString.includes('YOLOv5') &&
            !errString.includes('Fusing layers...') &&
            !errString.includes('YOLOv5l summary:') &&
            !errString.includes('Adding AutoShape...')) {
            console.error('Error from Python script:', errString);
            reject(new Error('Error running Python script'));
        }
      });
  
      pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
              const jsonData = JSON.parse(outputData);
              
              const vehicleCount = jsonData.vehicle_count;
              
              resolve(vehicleCount);
            } catch (error) {
              console.error('Error parsing vehicle count:', error);
              reject(new Error('Invalid vehicle count received from Python script'));
            }
          } else {
            console.warn('Python script exited with code:', code);
            reject(new Error('Python script error'));  
          }
      });
    });
  }

module.exports.processimages = async (req , res) =>{
    try {
        const imagePaths = req.body.images;

        if(imagePaths.length<3){
            res.status(500).json({message:'Insufficient number of images'});    
        }

        const results=[];

        for (const imagePath of imagePaths) {
            try {
                const vehicleCount = await callAI(imagePath);
                results.push(vehicleCount);
              } catch (error) {
                console.error('Error processing image:', imagePath, error);
              }
        }

        const highestCount = Math.max(...results);

        res.status(200).json({message:"Images processed successfully", highestCount});

    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error processing images'});
    }
}