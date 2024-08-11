import { FirebaseStorage, getDownloadURL, getStorage, ref, UploadResult, uploadString } from "firebase/storage";

class StoreLibrary {
  private storage: FirebaseStorage;
  constructor() {
    this.storage = getStorage();
  }

  async uploadBase64File(fileName: string, fileBase64: string) {
    try {
      const storageRef = ref(this.storage, fileName);
      const response: UploadResult = await uploadString(storageRef, fileBase64, "base64");
      return { file: response.ref.fullPath };
    } catch (error) {
      console.log(error);
    }
  }

  async getUrlFile(url: string): Promise<{ downloadURL: string; nameFile: string }> {
    const fileRef = ref(this.storage, url);
    const downloadURL = await getDownloadURL(fileRef);
    return { downloadURL, nameFile: fileRef.name };
  }
}

export default new StoreLibrary();
