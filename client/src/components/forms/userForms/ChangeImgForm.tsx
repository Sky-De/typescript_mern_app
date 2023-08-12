import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import SubmitBtn from "../../buttons/SubmitBtn";
import Avatar from "../../../assets/icons/avatar.png";
import CircularLoading from "../../loading/CircularLoading";
import { updateUser } from "../../../redux/features/user/userActionCreators";
import { useHandleUpload } from "../../../hooks/useImageUploder";
import CloseBtn from "../../buttons/CloseBtn";
import ErrorMessage from "../../Error/Error";

type FormDataType = {
  imgUrl: string;
  id: string;
};
const ChangeImgForm: React.FC = () => {
  const { user, isLoading, error } = useAppSelectore((state) => state.user);

  const [formData, setFormData] = useState<FormDataType>({
    imgUrl: "",
    id: `${user ? user._id : ""}`,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  // uploads img on cloudinary and return these vars
  const {
    coverUrl: uploadImageUrl,
    isLoading: uploadImageLoading,
    isError: uploadImageError,
  } = useHandleUpload({ selectedImage });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  useEffect(() => {
    setFormData({ ...formData, imgUrl: uploadImageUrl });
  }, [uploadImageUrl, formData]);
  // last formData

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(formData));
  };

  return (
    // FIX-clean this code and better ui and structure
    <form className="changeImgForm" onSubmit={submitHandler}>
      <CloseBtn />
      <span>Current image</span>
      <img
        src={user && user.imgUrl !== "" ? user.imgUrl : Avatar}
        alt="user avatar"
      />
      <input onChange={changeHandler} type="file" />
      <span>New image</span>
      <img
        src={
          selectedImage
            ? URL.createObjectURL(selectedImage)
            : user?.imgUrl === ""
            ? Avatar
            : user?.imgUrl
        }
        alt="user avatar"
      />
      <SubmitBtn
        disable={uploadImageLoading}
        isLoading={isLoading}
        tag="Change Image"
      />
      {uploadImageLoading && <CircularLoading isBoth={true} />}
      {error && <ErrorMessage errMessage={error} />}
      {uploadImageError && <ErrorMessage errMessage="Uploading image faild!" />}
    </form>
  );
};

export default ChangeImgForm;
