import dropboxLibrary from "../libraries/dropbox.library";
import fileLibrary from "../libraries/file.library";

class FileService{

    async upload(file:string){
        const {mimeType,content} = fileLibrary.getMetadataBase64(file);
        const extension = fileLibrary.getExtensionFile(mimeType);
        const fileName = `${"test"}.${extension}`;
        const fileBuffer = fileLibrary.base64ToBuffer(content);
        return await dropboxLibrary.uploadBase64File(fileName,fileBuffer);
    }
}

export default new FileService();