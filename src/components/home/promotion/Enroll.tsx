import { CircularProgress } from '@material-ui/core'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import * as Yup from 'yup'
import { promotionsCollection } from '../../../services/firebase'
import { showErrorToast, showSuccessToast } from '../../../utils/tools'

function Enroll() {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('The email is required'),
    }),
    onSubmit: (values) => {
      setLoading(true)
      submitForm(values)
    },
  })

  const submitForm = async (values: any) => {
    try {
      const isOnTheList = await promotionsCollection
        .where('email', '==', values.email)
        .get()

      if (isOnTheList.docs.length >= 1) {
        showErrorToast('sorry you are on the list already')
        setLoading(false)
        return false
      }
      await promotionsCollection.add({ email: values.email })
      formik.resetForm()
      setLoading(false)
      showSuccessToast('Congratulation !!!:)')
    }
    catch (error) {
      if (error instanceof Error)
        showErrorToast(error.message)
    }
  }

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />

            {formik.touched.email && formik.errors.email
              ? (
                  <div className="error_label">{formik.errors.email}</div>
                )
              : null}

            {loading
              ? (
                  <CircularProgress color="secondary" className="progress" />
                )
              : (
                  <button
                    style={{
                      cursor: 'pointer',
                    }}
                    type="submit"
                  >
                    Enroll
                  </button>
                )}

            <div className="enroll_discl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </form>
      </div>
    </Fade>
  )
}

export default Enroll
