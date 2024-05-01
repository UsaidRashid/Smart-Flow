const express = require("express");
const port = 3005;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res, next) => {
    res.send("You are now on Smart Flow's backend");
});

app.use((err, req, res, next) => {
    console.error(err); 
    
    if (err.status) {
        res.status(err.status).json({ message: err.message }); 
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const setDataRouter = require("./routes/setData");
app.use("/getimages", setDataRouter);

const getDataRouter= require("./routes/getData");
app.use("/processimages",getDataRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
