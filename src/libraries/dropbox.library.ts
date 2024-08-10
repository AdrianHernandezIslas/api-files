import { Dropbox, DropboxResponse } from "dropbox";
import fetch from "isomorphic-fetch";
import { DropboxFileMetadata } from "../domain/interface/DropboxFileMetaData.interface";

class DropboxLibrary {
  private instance: Dropbox;
  private readonly token: string = process.env.TOKEN_DROPBOX as string;

  constructor() {
    this.instance = new Dropbox({ accessToken: this.token });
  }

  async uploadBase64File(fileName: string, fileBuffer: Buffer) {
    try {
      // Usa la API de Dropbox para subir el archivo
      const response = await this.instance.filesUpload({
        path: `${fileName}`,
        contents: fileBuffer,
      });

      return response.result;
    } catch (error) {
     console.log(error); 
    }
  }

  async getBufferFile(url: string):Promise<DropboxFileMetadata> {
    const response: DropboxResponse<DropboxFileMetadata> = await this.instance.filesDownload({ path: `/${url}` });
    return response.result;
  }
}

export default new DropboxLibrary();
