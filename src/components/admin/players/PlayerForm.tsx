import type { FormikProps } from 'formik'
import type { Player } from '../../../types'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import AdminLayout from '../../../hoc/AdminLayout'
import { playersCollection, storage } from '../../../services/firebase'
import Fileuploader from '../../../utils/fileUploader'
import {
  selectErrorHelper,
  selectIsError,
  textErrorHelper,
} from '../../../utils/formHelpers'
import { showErrorToast, showSuccessToast } from '../../../utils/toasts'

const defaultValues: Player = {
  name: '',
  lastname: '',
  number: '',
  position: '',
  image: '',
}

const validationSchema = Yup.object({
  name: Yup.string().required('This input is required'),
  lastname: Yup.string().required('This input is required'),
  number: Yup.number()
    .required('This input is required')
    .min(0, 'The minimum is 0')
    .max(100, 'The max is 100'),
  position: Yup.string().required('This input is required'),
  image: Yup.string().required('This input is required'),
})

function PlayerForm({ playerid }: { playerid?: string }) {
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState<Player>(defaultValues)
  const [defaultImg, setDefaultImg] = useState('')

  const navigate = useNavigate()
  const isEdit = !!playerid

  const formik: FormikProps<Player> = useFormik<Player>({
    enableReinitialize: true,
    initialValues: values,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      const request = playerid
        ? updateDoc(doc(playersCollection, playerid), { ...values })
            .then(() => showSuccessToast('Player updated'))
        : addDoc(playersCollection, values)
            .then(() => {
              showSuccessToast('Player added')
              formik.resetForm()
              navigate('/admin_players')
            })
      request
        .catch(showErrorToast)
        .finally(() => setLoading(false))
    },
  })

  useEffect(() => {
    if (!playerid)
      return

    getDoc(doc(playersCollection, playerid))
      .then((snapshot) => {
        const data = snapshot.data()
        if (!data) {
          showErrorToast('Sorry, nothing was found')
          return
        }
        setValues({ ...defaultValues, ...data })
        if (data.image) {
          getDownloadURL(ref(storage, `players/${data.image}`))
            .then(setDefaultImg)
            .catch(showErrorToast)
        }
      })
      .catch(showErrorToast)
  }, [playerid])

  const updateImageName = (filename: string) => {
    formik.setFieldValue('image', filename)
  }

  const resetImage = () => {
    formik.setFieldValue('image', '')
    setDefaultImg('')
  }

  const title = isEdit ? 'Edit Player' : 'Add Player'

  return (
    <>
      <Helmet>
        <title>{`MCity Club - ${title}`}</title>
        <meta property="og:title" content={title} />
      </Helmet>
      <AdminLayout title={title}>
        <div className="editplayers_dialog_wrapper">
          <div>
            <form onSubmit={formik.handleSubmit}>
              <FormControl error={selectIsError(formik, 'image')}>
                <Fileuploader
                  dir="players"
                  defaultImg={defaultImg}
                  defaultImgName={formik.values.image}
                  filename={updateImageName}
                  resetImage={resetImage}
                />
                {selectErrorHelper(formik, 'image')}
              </FormControl>

              <hr />
              <h4>Player info</h4>
              <div className="mb-5">
                <FormControl>
                  <TextField
                    id="name"
                    variant="outlined"
                    placeholder="Add firstname"
                    {...formik.getFieldProps('name')}
                    {...textErrorHelper(formik, 'name')}
                  />
                </FormControl>
              </div>

              <div className="mb-5">
                <FormControl>
                  <TextField
                    id="lastname"
                    variant="outlined"
                    placeholder="Add lastname"
                    {...formik.getFieldProps('lastname')}
                    {...textErrorHelper(formik, 'lastname')}
                  />
                </FormControl>
              </div>

              <div className="mb-5">
                <FormControl>
                  <TextField
                    type="number"
                    id="number"
                    variant="outlined"
                    placeholder="Add number"
                    {...formik.getFieldProps('number')}
                    {...textErrorHelper(formik, 'number')}
                  />
                </FormControl>
              </div>

              <div className="mb-5">
                <FormControl error={selectIsError(formik, 'position')}>
                  <Select
                    id="position"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps('position')}
                  >
                    <MenuItem value="" disabled>
                      Select a position
                    </MenuItem>
                    <MenuItem value="Keeper">Keeper</MenuItem>
                    <MenuItem value="Defence">Defence</MenuItem>
                    <MenuItem value="Midfield">Midfield</MenuItem>
                    <MenuItem value="Striker">Striker</MenuItem>
                  </Select>
                  {selectErrorHelper(formik, 'position')}
                </FormControl>
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {title}
              </Button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

// Keyed on the route param so switching records starts from a clean form.
function PlayerFormPage() {
  const { playerid } = useParams()
  return <PlayerForm key={playerid ?? 'new'} playerid={playerid} />
}

export default PlayerFormPage
