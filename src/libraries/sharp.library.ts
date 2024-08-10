import sharp from 'sharp';

export class SharpLibrary {

    async resizeBase64Image(base64Image: string, width: number, height: number): Promise<string> {
        // Eliminar el prefijo 'data:image/png;base64,' del Base64 (si existe)
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        
        // Decodificar Base64 a buffer
        const imageBuffer = Buffer.from(base64Data, 'base64');
      
        // Redimensionar la imagen usando sharp
        const resizedImageBuffer = await sharp(imageBuffer)
          .resize(width, height) // Puedes ajustar la opción de tamaño según sea necesario
          .toBuffer();
      
        // Convertir el buffer redimensionado a Base64
        const resizedBase64 = `data:image/png;base64,${resizedImageBuffer.toString('base64')}`;
      
        return resizedBase64;
      }
}