import dropboxLibrary from "../libraries/dropbox.library";
import fileLibrary from "../libraries/file.library";
import sharpLibrary from "../libraries/sharp.library";
import { Dimension } from "../domain/interface/Dimension.interface";
import { FileRequest } from "../domain/interface/FileRequest.interface";
import storeLibrary from "../libraries/store.library";

class FileService {
  async upload({ destination, file }: FileRequest) {
    const { mimeType, content } = fileLibrary.getMetadataBase64(file);
    const extension = fileLibrary.getExtensionFile(mimeType);
    const fileName = `${destination || ""}/${fileLibrary.getRandomName()}.${extension}`;
    return await storeLibrary.uploadBase64File(fileName, content);
  }

  async download(path: string) {
    const { downloadURL, nameFile } = await storeLibrary.getUrlFile(path);
    const fileBase64 = await fileLibrary.fetchBase64FromURL(downloadURL);
    const mimeType = fileLibrary.getMimeTypeFile(nameFile);
    return { mimeType: mimeType, fileName: nameFile, fileBinary: Buffer.from(fileLibrary.base64ToBuffer(fileBase64)) };
  }

  async resized(fileBinary: Buffer | undefined, dimension: Dimension) {
    let resizedImg = fileBinary;
    const width = parseInt(dimension.width as string, 10);
    const height = parseInt(dimension.height as string, 10);
    if (!(isNaN(width) || isNaN(height)) && fileBinary) {
      resizedImg = await sharpLibrary.resizeBufferImage(fileBinary, width, height);
    }
    return resizedImg;
  }
}

export default new FileService();
