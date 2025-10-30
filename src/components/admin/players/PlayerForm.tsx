import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import AdminLayout from '../../../hoc/AdminLayout'
import { firebase, playersCollection } from '../../../services/firebase'
import Fileuploader from '../../../utils/fileUploader'
import {
  selectErrorHelper,
  selectIsError,
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
} from '../../../utils/tools'

const defaultValues = {
  name: '',
  lastname: '',
  number: '',
  position: '',
  image: '',
}

function PlayerForm() {
  const [loading, setLoading] = useState(false)
  const [formType, setFormType] = useState('')
  const [values, setValues] = useState(defaultValues)
  const [defaultImg, setDefaultImg] = useState('')

  const { playerid } = useParams()
  const navigate = useNavigate()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required('This input is required'),
      lastname: Yup.string().required('This input is required'),
      number: Yup.number()
        .required('This input is required')
        .min(0, 'The minimum is cero')
        .max(100, 'The max is 100'),
      position: Yup.string().required('This input is required'),
      image: Yup.string().required('This input is required'),
    }),
    onSubmit: (values) => {
      submitForm(values)
    },
  })

  function submitForm(values: any) {
    const dataToSubmit = values
    setLoading(true)

    if (formType === 'add') {
      playersCollection
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast('Player added')
          formik.resetForm()
          navigate('/admin_players')
        })
        .catch((error) => {
          showErrorToast(error)
        })
    }
    else {
      playersCollection
        .doc(playerid)
        .update(dataToSubmit)
        .then(() => {
          showSuccessToast('Player updated')
        })
        .catch((error) => {
          showErrorToast(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    if (playerid) {
      playersCollection
        .doc(playerid)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            firebase
              .storage()
              .ref('players')
              .child(snapshot.data()?.image)
              .getDownloadURL()
              .then((url) => {
                updateImageName(snapshot.data()?.image)
                setDefaultImg(url)
              })

            setFormType('edit')
            setValues(snapshot.data() as any)
          }
          else {
            showErrorToast('Sorry, nothing was found')
          }
        })
        .catch((error) => {
          showErrorToast(error)
        })
    }
    else {
      setFormType('add')
      setValues(defaultValues)
    }
  }, [playerid])

  function updateImageName(filename: string) {
    formik.setFieldValue('image', filename)
  }

  const resetImage = () => {
    formik.setFieldValue('image', '')
    setDefaultImg('')
  }

  return (
    <>
      <Helmet>
        <title>
          MCity Club -
          {playerid ? 'Edit Player' : 'Add Player'}
        </title>
        <meta property="og:title" content="Add Player" />
      </Helmet>
      <AdminLayout title={formType === 'add' ? 'Add player' : 'Edit player'}>
        <div className="editplayers_dialog_wrapper">
          <div>
            <form onSubmit={formik.handleSubmit}>
              <FormControl error={selectIsError(formik, 'image')}>
                <Fileuploader
                  dir="players"
                  defaultImg={defaultImg}
                  defaultImgName={formik.values.image}
                  filename={filename => updateImageName(filename)}
                  resetImage={() => resetImage()}
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
                {formType === 'add' ? 'Add player' : 'Edit player'}
              </Button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default PlayerForm
