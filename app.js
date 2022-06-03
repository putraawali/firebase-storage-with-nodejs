require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

const { bucketFirebase } = require("./firebase");
const { multerSetup } = require("./helper/multer");
const { upload } = require("./helper/upload");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// "file" on multerSetup.single is the key assigned from form-data

app.post("/upload", multerSetup.single("file"), async (req, res) => {
    try {
        const { path, originalname } = req.file;
        let link = await upload({
            bucketFirebase,
            filename: originalname,
            path,
        });

        res.status(200).json({
            message: "Upload success",
            link,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.listen(PORT, () => console.log("Server running on port", PORT));
