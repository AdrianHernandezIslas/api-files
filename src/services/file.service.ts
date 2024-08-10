import dropboxLibrary from "../libraries/dropbox.library";
import fileLibrary from "../libraries/file.library";
import sharpLibrary from "../libraries/sharp.library";
import { Dimension } from "../domain/interface/Dimension.interface";

class FileService {
  async upload(file: string) {
    const { mimeType, content } = fileLibrary.getMetadataBase64(file);
    const extension = fileLibrary.getExtensionFile(mimeType);
    const fileName = `${"test"}.${extension}`;
    const fileBuffer = fileLibrary.base64ToBuffer(content);
    return await dropboxLibrary.uploadBase64File(fileName, fileBuffer);
  }

  async download(path: string) {
    const { fileBinary, name: fileName } = await dropboxLibrary.getBufferFile(path);
    const mimeType = fileLibrary.getMimeTypeFile(fileName);
    return { mimeType, fileName, fileBinary };
  }

  async resized(fileBinary: Buffer | undefined, dimension:Dimension) {
    let resizedImg = fileBinary;
    const width = parseInt(dimension.width as string, 10);
    const height = parseInt(dimension.height as string, 10);
    if(!(isNaN(width) || isNaN(height)) && fileBinary){
        resizedImg = await sharpLibrary.resizeBufferImage(fileBinary, width, height);
    }
    return resizedImg;
  }
}

export default new FileService();
