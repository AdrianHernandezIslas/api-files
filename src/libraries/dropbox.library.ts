import { Dropbox } from "dropbox";
import fetch from "isomorphic-fetch";
import mime from "mime-types";

export class DropboxLibrary {
  private intance: Dropbox;
  private readonly token: string = process.env.TOKEN_DROPBOX as string;

  constructor() {
    this.intance = new Dropbox({ accessToken: this.token, fetch });
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
      const response = await this.intance.filesUpload({
        path: `/${fileName}`,
        contents: fileBuffer,
      });

      console.log("Archivo subido con éxito:", response.result);
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  }
}
