import { CircularProgress } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import { useAuth } from '../../services/auth'
import { auth } from '../../services/firebase'
import { showErrorToast, showSuccessToast } from '../../utils/toasts'
import NoAccess from '../NoAccess'

function SignIn() {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const from: string = location.state?.from ?? '/dashboard'

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('The email is required'),
      password: Yup.string().required('The password is required'),
    }),
    onSubmit: (values) => {
      setLoading(true)
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          // AuthProvider picks up the new user and this page redirects.
          showSuccessToast('Welcome back !!')
        })
        .catch(showErrorToast)
        .finally(() => setLoading(false))
    },
  })

  // Still restoring a previous session.
  if (authLoading && !user)
    return null

  if (user && !authLoading)
    return isAdmin ? <Navigate to={from} replace /> : <NoAccess />

  return (
    <>
      <Helmet>
        <title>MCity Club - Sign In</title>
        <meta property="og:title" content="Sign In" />
      </Helmet>
      <div className="container">
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Please login</h2>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email
              ? (
                  <div className="error_label">{formik.errors.email}</div>
                )
              : null}

            <input
              placeholder="enter your password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password
              ? (
                  <div className="error_label">{formik.errors.password}</div>
                )
              : null}

            {loading || authLoading
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
                    Log in
                  </button>
                )}
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
