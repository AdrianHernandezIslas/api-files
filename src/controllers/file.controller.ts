import { Request, response, Response } from 'express';
import { DropboxLibrary } from '../libraries/dropbox.library';

class FileController{
    private dropbox: DropboxLibrary

    constructor(dropbox:DropboxLibrary){
        this.dropbox = dropbox;
    }

    public async upload(req:Request, res:Response){
       const file =  req.body.file;
        await this.dropbox.uploadBase64File("unarchivo",file);
        return res.send("ok");
    }
}

export default new FileController(new DropboxLibrary());