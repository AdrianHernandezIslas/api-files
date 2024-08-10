import { Request, Response } from "express";
import fileService from "../services/file.service";

class FileController {
  public async upload(req: Request, res: Response) {
    const { body } = req;
    const response = await fileService.upload(body);
    res.status(201).json(response);
  }

  public async download(req: Request, res: Response) {
    const { query, params } = req;
    const path = params[0];
    const { mimeType, fileBinary, fileName } = await fileService.download(path);

    const responseFile = await fileService.resized(fileBinary, query);
    res
      .setHeader("Content-Type", mimeType)
      .setHeader("Content-Disposition", `attachment; filename=file_${fileName}`)
      .send(responseFile);
  }
}

export default new FileController();
