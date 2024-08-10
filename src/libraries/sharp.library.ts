import sharp from 'sharp';

class SharpLibrary {

    async resizeBufferImage(bufferFile: Buffer, width: number, height: number): Promise<Buffer> {
        const resizedFileBuffer = await sharp(bufferFile)
          .resize(width, height)
          .toBuffer();
        return resizedFileBuffer;
      }
}

export default new SharpLibrary;