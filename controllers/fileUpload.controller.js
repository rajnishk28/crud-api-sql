const FileModel = require('../models/file.model');
const UserModel = require('../models/User');
const { uploadToCloudinary } = require('../utils/fileUploadUtil');

// Controller to handle a single file upload
const uploadSingleFile = async (req, res) => {
    console.log("userId....",req.user.id)
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        const uploadResult = await uploadToCloudinary(file.path);

        const newFile = await FileModel.create({
            description: req.body.description,
            file: uploadResult.secure_url,
            userId: req.user.id // Store userId
        });

        res.status(201).json(newFile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle multiple files upload
const uploadMultipleFiles = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) return res.status(400).json({ message: 'No files uploaded' });

        const uploadPromises = files.map(file => uploadToCloudinary(file.path));
        const uploadResults = await Promise.all(uploadPromises);

        const newFiles = await Promise.all(uploadResults.map(result =>
            FileModel.create({
                description: req.body.description,
                file: result.secure_url,
                userId: req.user.id // Store userId
            })
        ));

        res.status(201).json(newFiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to fetch files and user details by userId
const getFilesByUserId = async (req, res) => {
    try {
        const userId = req.user.id; // Extract userId from the authenticated user

        // Fetch user details
        const user = await UserModel.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch files associated with the userId
        const files = await FileModel.find({ userId });

        // Combine user details with files
        const response = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            files
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles,
    getFilesByUserId
};
