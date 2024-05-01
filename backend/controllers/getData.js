const {spawn} = require("child_process");
const path = require('path'); 

async function callAI(imagePath) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../AI/AI.py');
        const pythonProcess = spawn('python', [scriptPath, imagePath]);

        let outputData = '';

        pythonProcess.stdout.on('data', (data) => {
            outputData += data.toString();
            console.log(outputData);
        });

        pythonProcess.stderr.on('data', (err) => {
            console.error('Error from Python script:', err.toString());
            reject(new Error('Error calling Python script'));
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const vehicleCountData = JSON.parse(outputData);
                    const vehicleCount = vehicleCountData.vehicle_count;
                    resolve( vehicleCount);
                  } catch (error) {
                    console.error('Error parsing vehicle count:', error);
                    reject(new Error('No vehicle count received from Python script'));
                  }
            } else {
                reject(new Error(`Python script exited with code: ${code}`));
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
            const vehicleCount = await callAI(imagePath);
            results.push(vehicleCount);
        }

        const highestCount = Math.max(...results);

        res.status(200).json({message:"Images processed successfully", highestCount});

    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error processing images'});
    }
}