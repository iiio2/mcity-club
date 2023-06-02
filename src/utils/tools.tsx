import { Link } from "react-router-dom";
import{ toast } from "react-toastify"
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