const fs = require('fs');
const path = require('path');

module.exports.sendRandomImages = async (req,res) =>{
    const idx1 = Math.floor(Math.random() * 50) + 1;
    const idx2 = Math.floor(Math.random() * 50) + 1;
    const idx3 = Math.floor(Math.random() * 50) + 1;

    const imagePath = './images/';

    try {
        const files = await fs.promises.readdir(imagePath);

        const randomImages = [];

        const filename1 = files[idx1];
        const imagePath1 = path.join(imagePath, filename1);
        randomImages.push(imagePath1);

        const filename2 = files[idx2];
        const imagePath2 = path.join(imagePath, filename2);
        randomImages.push(imagePath2);

        const filename3 = files[idx3];
        const imagePath3 = path.join(imagePath, filename3);
        randomImages.push(imagePath3);

        const emptyImage=path.join(imagePath,"empty.jpg");
        randomImages.push(emptyImage);

        res.status(200).json({message :"Successfully sent images" , randomImages});

    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error retrieving images'});
    }

}