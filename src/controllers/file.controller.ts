import { Request, response, Response } from 'express';
import dropbox from '../libraries/dropbox.library';
import fileService from '../services/file.service';

class FileController{
    public async upload(req:Request, res:Response){
       const file =  req.body.file;
        const response = await fileService.upload(file);
        res.status(201).json(response);
    }

    public async get(req:Request, res:Response){
        const file =  req.body.file;
         await dropbox.getBase64File(file)
         return res.send("ok");
     }
}

export default new FileController();