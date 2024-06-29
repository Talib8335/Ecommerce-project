const uploadFile = (req, res)=>{
    const {destination, filename} = req.file
    const path = destination+filename
    
    res.status(200).json({
        success: true,
        path: path,
        filename: filename
    })
}

module.exports = {
    uploadFile
}