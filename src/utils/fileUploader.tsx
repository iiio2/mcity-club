// @ts-nocheck
import { useState } from "react";
import { firebase } from "../services/firebase";
import Uploader from "react-firebase-file-uploader";
import { CircularProgress } from "@material-ui/core";

interface Props {
  dir: string;
  filename: (name: string) => void;
  resetImage: () => void;
}

const FileUploader = ({ dir, filename, resetImage }: Props) => {
  const [state, setState] = useState({
    name: "",
    isUploading: false,
    fileURL: "",
  });

  const handleUploadStart = () => {
    setState({ ...state, isUploading: true });
  };

  const handleUploadError = () => {
    setState({ ...state, isUploading: false });
  };

  const handleUploadSuccess = (imageName: string) => {
    setState({ ...state, name: imageName, isUploading: false });

    firebase
      .storage()
      .ref(dir)
      .child(imageName)
      .getDownloadURL()
      .then((url) => {
        setState({ ...state, fileURL: url });
      });

    filename(imageName);
  };

  const uploadAgain = () => {
    setState({
      name: "",
      isUploading: false,
      fileURL: "",
    });
    resetImage();
  };

  return (
    <>
      <div>
        {!state.fileURL ? (
          <div>
            <Uploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(dir)}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
            />
          </div>
        ) : null}

        {state.isUploading ? (
          <div
            className="progress"
            style={{ textAlign: "center", margin: "30px 0" }}
          >
            <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
          </div>
        ) : null}

        {state.fileURL ? (
          <div className="image_upload_container">
            <img
              style={{
                width: "100%",
              }}
              src={state.fileURL}
              alt={state.name}
            ></img>
            <div className="remove" onClick={() => uploadAgain()}>
              Remove
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FileUploader;
