import { Dropbox, DropboxResponse } from "dropbox";
import fetch from "isomorphic-fetch";
import mime from "mime-types";
import { DropboxFileMetadata } from "../domain/interface/DropboxFileMetaData.interface";

export class DropboxLibrary {
  private instance: Dropbox;
  private readonly token: string = process.env.TOKEN_DROPBOX as string;

  constructor() {
    this.instance = new Dropbox({ accessToken: this.token });
  }

  async uploadBase64File(fileName: string, base64Data: string) {
    // Extrae el tipo MIME del string base64
    const base64Regex = /^data:(.+);base64,(.*)$/;
    const match = base64Data.match(base64Regex);

    if (!match) {
      console.error("Formato base64 no válido");
      return;
    }

    const [, mimeType, content] = match;
    const fileBuffer = Buffer.from(content, "base64");

    // Obtén la extensión del archivo a partir del tipo MIME
    const extension = mime.extension(mimeType);
    if (extension) {
      fileName = `${fileName}.${extension}`;
    }

    try {
      // Usa la API de Dropbox para subir el archivo
      const response = await this.instance.filesUpload({
        path: `/${fileName}`,
        contents: fileBuffer,
      });

      console.log("Archivo subido con éxito:", response.result);
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  }

  async getBase64File(url: string):Promise<DropboxFileMetadata> {
    const response: DropboxResponse<DropboxFileMetadata> = await this.instance.filesDownload({ path: url });
    return response.result;
  }
}
