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
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import AdminLayout from '../../../hoc/AdminLayout'
import { matchesCollection, teamsCollection } from '../../../services/firebase'
import {
  selectErrorHelper,
  selectIsError,
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
} from '../../../utils/tools'

const defaultValues = {
  date: '',
  local: '',
  resultLocal: '',
  away: '',
  resultAway: '',
  referee: '',
  stadium: '',
  result: '',
  final: '',
}

function MatchForm() {
  const [loading, setLoading] = useState(false)
  const [formType, setFormType] = useState('')
  const [teams, setTeams] = useState<any[] | null>(null)
  const [values, setValues] = useState(defaultValues)

  const { matchid } = useParams()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      date: Yup.string().required('This input is required'),
      local: Yup.string().required('This input is required'),
      resultLocal: Yup.number()
        .required('This input is required')
        .min(0, 'The minimum is 0')
        .max(99, 'The maximum is 30'),
      away: Yup.string().required('This input is required'),
      resultAway: Yup.number()
        .required('This input is required')
        .min(0, 'The minimum is 0')
        .max(99, 'The maximum is 30'),
      referee: Yup.string().required('This input is required'),
      stadium: Yup.string().required('This input is required'),
      result: Yup.mixed()
        .required('This input is required')
        .oneOf(['W', 'D', 'L', 'n/a']),
      final: Yup.mixed()
        .required('This input is required')
        .oneOf(['yes', 'no']),
    }),
    onSubmit: (values) => {
      submitForm(values)
    },
  })

  const showTeams = () =>
    teams
      ? teams.map(item => (
          <MenuItem key={item.id} value={item.shortName}>
            {item.shortName}
          </MenuItem>
        ))
      : null

  function submitForm(values: any) {
    const dataToSubmit = values

    teams
    && teams.forEach((team) => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit.localThmb = team.thmb
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit.awayThmb = team.thmb
      }
    })

    setLoading(true)
    if (formType === 'add') {
      matchesCollection
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast('Match added :)')
          formik.resetForm()
        })
        .catch(() => {
          showErrorToast('Sorry, something went wrong')
        })
        .finally(() => {
          setLoading(false)
        })
    }
    else {
      matchesCollection
        .doc(matchid)
        .update(dataToSubmit)
        .then(() => {
          showSuccessToast('Match Updated')
        })
        .catch(() => {
          showErrorToast('Sorry, something went wrong')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    if (!teams) {
      teamsCollection
        .get()
        .then((snapshot) => {
          const teams = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setTeams(teams)
        })
        .catch((error) => {
          showErrorToast(error)
        })
    }
  }, [teams])

  useEffect(() => {
    if (matchid) {
      matchesCollection
        .doc(matchid)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            setFormType('edit')
            setValues(snapshot.data() as any)
          }
          else {
            showErrorToast('No records found')
          }
        })
    }
    else {
      setFormType('add')
      setValues(defaultValues)
    }
  }, [matchid])

  return (
    <>
      <Helmet>
        <title>
          MCity Club -
          {matchid ? 'Edit Match' : 'Add Match'}
          <meta property='og:title' content={`${matchid ? 'Edit Match' : 'Add Match'}`}  />
        </title>
      </Helmet>
      <AdminLayout title={formType === 'add' ? 'Add match' : 'Edit match'}>
        <div className="editmatch_dialog_wrapper">
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h4>Select date</h4>
                <FormControl>
                  <TextField
                    id="date"
                    // name="date"
                    type="date"
                    variant="outlined"
                    {...formik.getFieldProps('date')}
                    {...textErrorHelper(formik, 'date')}
                  />
                </FormControl>
              </div>

              <hr />

              <div>
                <h4>Result local</h4>
                <FormControl error={selectIsError(formik, 'local')}>
                  <Select
                    id="local"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps('local')}
                  >
                    <MenuItem value="" disabled>
                      Select a team
                    </MenuItem>
                    {showTeams()}
                  </Select>
                  {selectErrorHelper(formik, 'local')}
                </FormControl>

                <FormControl style={{ marginLeft: '10px' }}>
                  <TextField
                    id="resultLocal"
                    type="number"
                    variant="outlined"
                    {...formik.getFieldProps('resultLocal')}
                    {...textErrorHelper(formik, 'resultLocal')}
                  />
                </FormControl>
              </div>

              <div>
                <h4>Result away</h4>
                <FormControl error={selectIsError(formik, 'away')}>
                  <Select
                    id="away"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps('away')}
                  >
                    <MenuItem value="" disabled>
                      Select a team
                    </MenuItem>
                    {showTeams()}
                  </Select>
                  {selectErrorHelper(formik, 'away')}
                </FormControl>

                <FormControl style={{ marginLeft: '10px' }}>
                  <TextField
                    id="resultAway"
                    type="number"
                    variant="outlined"
                    {...formik.getFieldProps('resultAway')}
                    {...textErrorHelper(formik, 'resultAway')}
                  />
                </FormControl>
              </div>

              <hr />

              <div>
                <h4>Match info</h4>
                <div className="mb-5">
                  <FormControl>
                    <TextField
                      id="referee"
                      variant="outlined"
                      placeholder="Add the referee name"
                      {...formik.getFieldProps('referee')}
                      {...textErrorHelper(formik, 'referee')}
                    />
                  </FormControl>
                </div>

                <div className="mb-5">
                  <FormControl>
                    <TextField
                      id="stadium"
                      variant="outlined"
                      placeholder="Add the stadium name"
                      {...formik.getFieldProps('stadium')}
                      {...textErrorHelper(formik, 'stadium')}
                    />
                  </FormControl>
                </div>

                <div className="mb-5">
                  <FormControl error={selectIsError(formik, 'result')}>
                    <Select
                      id="result"
                      variant="outlined"
                      displayEmpty
                      {...formik.getFieldProps('result')}
                    >
                      <MenuItem value="" disabled>
                        Select a result
                      </MenuItem>
                      <MenuItem value="W">Win</MenuItem>
                      <MenuItem value="D">Draw</MenuItem>
                      <MenuItem value="L">Lose</MenuItem>
                      <MenuItem value="n/a">Non available</MenuItem>
                    </Select>
                    {selectErrorHelper(formik, 'result')}
                  </FormControl>
                </div>

                <div className="mb-5">
                  <FormControl error={selectIsError(formik, 'final')}>
                    <Select
                      id="final"
                      variant="outlined"
                      displayEmpty
                      {...formik.getFieldProps('final')}
                    >
                      <MenuItem value="" disabled>
                        Was the game played ?
                      </MenuItem>
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                    {selectErrorHelper(formik, 'final')}
                  </FormControl>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {formType === 'add' ? 'Add match' : 'Edit match'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default MatchForm
