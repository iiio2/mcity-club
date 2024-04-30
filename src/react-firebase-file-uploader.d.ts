declare module 'react-firebase-file-uploader' {
  export interface UploaderProps {
    accept: string
    name: string
    randomizeFilename: boolean
    storageRef: firebase.storage.Reference
    onUploadStart?: () => void
    onUploadError?: () => void
    onUploadSuccess: (imageName: string) => void
  }

  const Uploader: React.ComponentType<UploaderProps>

  export default Uploader
}
