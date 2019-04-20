const Box = require("../models/Box");
const File = require("../models/File");

class FileController {
    async store (req, res) {
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);

        await box.save();
        // alert everyone that a new file was created
        req.io.sockets.in(box._id).emit('file', file);
        // creating file
        return res.json(file);
    }
}

module.exports = new FileController();