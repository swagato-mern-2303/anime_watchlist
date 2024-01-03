import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";

export default function ProfileEditModal({ onCloseAllModal }) {
  const auth = getAuth();

  const [image, setImage] = useState();
  const cropperRef = createRef();

  const storage = getStorage();
  const storageRef = ref(storage, auth.currentUser.uid);

  const [profileName, setProfileName] = useState(auth.currentUser.displayName);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleUpdateProfile = function (e) {
    e.preventDefault();
    if (!profileName) {
      setError("Profile Name required");
      return;
    }
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const message = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            displayName: profileName,
            photoURL: downloadURL,
          });
        });
        setTimeout(onCloseAllModal, 2500);
        toast.success("Profile updated successfully");
      });
    } else {
      updateProfile(auth.currentUser, {
        displayName: profileName,
      });
      setTimeout(onCloseAllModal, 2500);
      toast.success("Profile updated successfully");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        transition={Zoom}
      />
      <form
        className="flex max-w-[800px] flex-col overflow-hidden rounded-xl sm:w-auto"
        noValidate
        onSubmit={(e) => handleUpdateProfile(e)}
      >
        <h1 className="mb-8 text-center text-[32px] font-semibold">
          Update Profile
        </h1>
        <input
          type="text"
          className="rounded-lg border border-blue-700 bg-blue-950/20 px-4 py-2 text-lg placeholder:text-white/50 focus-visible:border-blue-200 focus-visible:outline-none"
          placeholder="Profile Name"
          value={profileName}
          onChange={(e) => {
            setError("");
            setProfileName(e.target.value);
          }}
        />
        <p className="h-8 text-red-500">{error}</p>
        <div className="mx-auto mb-4 w-[100px] overflow-hidden rounded-full">
          {image && (
            <div
              className="img-preview"
              style={{ width: "100%", height: "100px" }}
            />
          )}
        </div>

        {image && (
          <Cropper
            ref={cropperRef}
            style={{ height: 200, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        )}

        <input
          className="text-primary-color-400 cursor-pointer rounded-[8.6px] border border-blue-700 bg-blue-950/20 py-2 pl-4 text-lg font-semibold file:rounded-lg file:border-none file:px-2 file:text-blue-800 md:pl-6 lg:pl-14"
          type="file"
          onChange={handleChange}
        />

        <div className="mx-auto mt-8 flex flex-col gap-3 font-semibold sm:flex-row">
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white duration-200 hover:bg-blue-800"
            type="submit"
          >
            Update Profile
          </button>
          <button
            className="rounded-lg bg-red-500 px-4 py-2 text-white duration-200 hover:bg-red-800"
            type="button"
            onClick={onCloseAllModal}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
}
