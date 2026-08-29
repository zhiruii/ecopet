const MAX_DIMENSION = 768
const JPEG_QUALITY = 0.8

/** Downscales to ~768px on the long edge and JPEG-compresses before upload. */
export async function captureAndCompress(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file.')
  }
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas 2d context unavailable')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('image compression failed'))),
      'image/jpeg',
      JPEG_QUALITY,
    )
  })
}
