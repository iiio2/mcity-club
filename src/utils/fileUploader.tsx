import type { ChangeEvent } from 'react'
import { CircularProgress } from '@mui/material'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { storage } from '../services/firebase'
import { showErrorToast } from './toasts'

interface Props {
  dir: string
  /** Called with the stored file name once an upload finishes. */
  filename: (name: string) => void
  resetImage: () => void
  /** URL of the image already saved on the record, shown until replaced. */
  defaultImg: string
  defaultImgName: string
}

const MAX_SIZE = 5 * 1024 * 1024

function randomName(file: File) {
  const ext = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')) : ''
  return `${crypto.randomUUID()}${ext}`
}

function FileUploader({ dir, filename, resetImage, defaultImg, defaultImgName }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploaded, setUploaded] = useState<{ name: string, url: string } | null>(null)

  const imageURL = uploaded?.url ?? defaultImg
  const imageName = uploaded?.name ?? defaultImgName

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file)
      return
    if (!file.type.startsWith('image/')) {
      showErrorToast('Please pick an image file')
      return
    }
    if (file.size > MAX_SIZE) {
      showErrorToast('The image must be smaller than 5 MB')
      return
    }

    const name = randomName(file)
    const fileRef = ref(storage, `${dir}/${name}`)
    setIsUploading(true)

    uploadBytes(fileRef, file, { contentType: file.type })
      .then(() => getDownloadURL(fileRef))
      .then((url) => {
        setUploaded({ name, url })
        filename(name)
      })
      .catch(showErrorToast)
      .finally(() => setIsUploading(false))
  }

  const uploadAgain = () => {
    setUploaded(null)
    resetImage()
  }

  return (
    <div>
      {!imageURL && !isUploading
        ? <input type="file" accept="image/*" name="image" onChange={handleChange} />
        : null}

      {isUploading
        ? (
            <div
              className="progress"
              style={{ textAlign: 'center', margin: '30px 0' }}
            >
              <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
            </div>
          )
        : null}

      {imageURL && !isUploading
        ? (
            <div className="image_upload_container">
              <img
                style={{
                  width: '100%',
                }}
                src={imageURL}
                alt={imageName}
              />
              <button type="button" className="remove" onClick={uploadAgain}>
                Remove
              </button>
            </div>
          )
        : null}
    </div>
  )
}

export default FileUploader
