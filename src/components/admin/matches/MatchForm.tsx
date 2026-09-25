import type { FormikProps } from 'formik'
import type { Match, Team, WithId } from '../../../types'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { addDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import AdminLayout from '../../../hoc/AdminLayout'
import { matchesCollection, teamsCollection, withIds } from '../../../services/firebase'
import {
  selectErrorHelper,
  selectIsError,
  textErrorHelper,
} from '../../../utils/formHelpers'
import { showErrorToast, showSuccessToast } from '../../../utils/toasts'

const defaultValues: Match = {
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

const scoreSchema = Yup.number()
  .required('This input is required')
  .min(0, 'The minimum is 0')
  .max(99, 'The maximum is 99')

const validationSchema = Yup.object({
  date: Yup.string().required('This input is required'),
  local: Yup.string().required('This input is required'),
  resultLocal: scoreSchema,
  away: Yup.string().required('This input is required'),
  resultAway: scoreSchema,
  referee: Yup.string().required('This input is required'),
  stadium: Yup.string().required('This input is required'),
  result: Yup.mixed()
    .required('This input is required')
    .oneOf(['W', 'D', 'L', 'n/a']),
  final: Yup.mixed()
    .required('This input is required')
    .oneOf(['yes', 'no']),
})

function MatchForm({ matchid }: { matchid?: string }) {
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState<WithId<Team>[]>([])
  const [values, setValues] = useState<Match>(defaultValues)

  const isEdit = !!matchid

  const formik: FormikProps<Match> = useFormik<Match>({
    enableReinitialize: true,
    initialValues: values,
    validationSchema,
    onSubmit: (values) => {
      const thumbOf = (shortName: string) =>
        teams.find(team => team.shortName === shortName)?.thmb
      const dataToSubmit: Match = {
        ...values,
        localThmb: thumbOf(values.local) ?? values.localThmb ?? '',
        awayThmb: thumbOf(values.away) ?? values.awayThmb ?? '',
      }

      setLoading(true)
      const request = matchid
        ? updateDoc(doc(matchesCollection, matchid), { ...dataToSubmit })
            .then(() => showSuccessToast('Match Updated'))
        : addDoc(matchesCollection, dataToSubmit)
            .then(() => {
              showSuccessToast('Match added :)')
              formik.resetForm()
            })
      request
        .catch(showErrorToast)
        .finally(() => setLoading(false))
    },
  })

  const showTeams = () =>
    teams.map(item => (
      <MenuItem key={item.id} value={item.shortName}>
        {item.shortName}
      </MenuItem>
    ))

  useEffect(() => {
    getDocs(teamsCollection)
      .then(snapshot => setTeams(withIds(snapshot)))
      .catch(showErrorToast)
  }, [])

  useEffect(() => {
    if (!matchid)
      return

    getDoc(doc(matchesCollection, matchid))
      .then((snapshot) => {
        const data = snapshot.data()
        if (data)
          setValues({ ...defaultValues, ...data, final: String(data.final ?? '').toLowerCase() })
        else
          showErrorToast('No records found')
      })
      .catch(showErrorToast)
  }, [matchid])

  const title = isEdit ? 'Edit Match' : 'Add Match'

  return (
    <>
      <Helmet>
        <title>{`MCity Club - ${title}`}</title>
        <meta property="og:title" content={title} />
      </Helmet>
      <AdminLayout title={title}>
        <div className="editmatch_dialog_wrapper">
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h4>Select date</h4>
                <FormControl>
                  <TextField
                    id="date"
                    type="date"
                    variant="outlined"
                    {...formik.getFieldProps('date')}
                    {...textErrorHelper(formik, 'date')}
                  />
                </FormControl>
              </div>

              <hr />

              <div>
                <h4>Local team and score</h4>
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
                <h4>Away team and score</h4>
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
                      <MenuItem value="n/a">Not available</MenuItem>
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
                  {title}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

// Keyed on the route param so switching records starts from a clean form.
function MatchFormPage() {
  const { matchid } = useParams()
  return <MatchForm key={matchid ?? 'new'} matchid={matchid} />
}

export default MatchFormPage
