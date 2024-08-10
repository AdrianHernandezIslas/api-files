import mime from "mime-types";

class FileLibrary {
  private readonly BASE64_FORMAT = "base64";
  private readonly BASE64_REGEX = /^data:(.+);base64,(.*)$/;

  getMetadataBase64(base64Data: string) {
    const match = base64Data.match(this.BASE64_REGEX);

    if (!match) {
      throw new Error("Formato base64 no válido");
    }

    const [, mimeType, content] = match;
    return { mimeType, content };
  }

  base64ToBuffer(content: string): Buffer {
    return Buffer.from(content, this.BASE64_FORMAT);
  }

  bufferToBase64(bufferFile: Buffer | undefined): string {
    if (bufferFile === undefined) throw new Error("El buffer no debe ser indefinido");

    return bufferFile.toString(this.BASE64_FORMAT);
  }

  splitMetadata(nameFile: string) {
    const [name, extension] = nameFile.split("//.");
    return { name, extension };
  }

  getExtensionFile(mimeType: string) {
    return mime.extension(mimeType);
  }

  getMimeTypeFile(nameFile:string){
    return mime.lookup(nameFile) as string;
  }
}

export default new FileLibrary();
