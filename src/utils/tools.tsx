import { FormHelperText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import mcitylogo from '../resources/images/logos/manchester_city_logo.png'
import { firebase } from '../services/firebase'

export function CityLogo(props: any) {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background: `url(${mcitylogo}) no-repeat`,
      }}
    >
    </div>
  )

  if (props.link) {
    return (
      <Link className="link_logo" to={props.linkTo}>
        {template}
      </Link>
    )
  }
  else {
    return template
  }
}

export function showSuccessToast(msg: string) {
  toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
  })
}

export function showErrorToast(msg: string) {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  })
}

export function Tag(props: any) {
  const template = (
    <div
      style={{
        background: props.bck ? props.bck : '#ffffff',
        fontSize: props.size ? props.size : '15px',
        color: props.color ? props.color : '#000000',
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...props.add,
      }}
    >
      {props.children}
    </div>
  )

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>
  }
  else {
    return template
  }
}

export function textErrorHelper(formik: any, values: any) {
  return {
    error: formik.errors[values] && formik.touched[values],
    helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
  }
}

export function selectErrorHelper(formik: any, values: any) {
  if (formik.errors[values] && formik.touched[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>
  }
  return false
}

export function selectIsError(formik: any, values: any) {
  return formik.errors[values] && formik.touched[values]
}

export function logoutHandler() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      showSuccessToast('Goodbye!!')
    })
    .catch((error) => {
      showErrorToast(error.message)
    })
}
