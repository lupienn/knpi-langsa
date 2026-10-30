const imageExtensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
} as const

export type SupportedImageType = keyof typeof imageExtensions

export function isSupportedImageType(contentType?: string): contentType is SupportedImageType {
  return Boolean(contentType && contentType in imageExtensions)
}

export function extensionForImageType(contentType: SupportedImageType): string {
  return imageExtensions[contentType]
}
