import { Link } from "react-router-dom";
import { FormHelperText } from "@material-ui/core";
import { toast } from "react-toastify";
import { firebase } from "../services/firebase";
import mcitylogo from "../resources/images/logos/manchester_city_logo.png";

export const CityLogo = (props: any) => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background: `url(${mcitylogo}) no-repeat`,
      }}
    ></div>
  );

  if (props.link) {
    return (
      <Link className="link_logo" to={props.linkTo}>
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

export const showSuccessToast = (msg: string) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const showErrorToast = (msg: string) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const Tag = (props: any) => {
  const template = (
    <div
      style={{
        background: props.bck ? props.bck : "#ffffff",
        fontSize: props.size ? props.size : "15px",
        color: props.color ? props.color : "#000000",
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const textErrorHelper = (formik: any, values: any) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
});

export const selectErrorHelper = (formik: any, values: any) => {
  if (formik.errors[values] && formik.touched[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>;
  }
  return false;
};

export const selectIsError = (formik: any, values: any) => {
  return formik.errors[values] && formik.touched[values];
};

export const logoutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      showSuccessToast("Goodbye!!");
    })
    .catch((error) => {
      showErrorToast(error.message);
    });
};
