import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { firebase } from '../../services/firebase'
import { CircularProgress } from '@material-ui/core'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet-async'
import { showErrorToast, showSuccessToast } from '../../utils/tools'

const SignIn = ({ user }: any) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: 'francis@gmail.com',
      password: 'testing123',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('The email is required'),
      password: Yup.string().required('The password is required'),
    }),
    onSubmit: (values) => {
      setLoading(true)
      submitForm(values)
    },
  })

  const submitForm = (values: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        showSuccessToast('Welcome back !!')
        navigate('/dashboard')
      })
      .catch((error) => {
        setLoading(false)
        showErrorToast(error.message)
      })
  }

  return (
    <>
      <Helmet>
        <title>MCity Club - Sign In</title>
      </Helmet>
      {!user ? (
        <div className="container">
          <div className="signin_wrapper" style={{ margin: '100px' }}>
            <form onSubmit={formik.handleSubmit}>
              <h2>Please login</h2>
              <input
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error_label">{formik.errors.email}</div>
              ) : null}

              <input
                placeholder="enter your password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error_label">{formik.errors.password}</div>
              ) : null}

              {loading ? (
                <CircularProgress color="secondary" className="progress" />
              ) : (
                <button
                  style={{
                    cursor: 'pointer',
                  }}
                  type="submit"
                >
                  Log in
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  )
}

export default SignIn
