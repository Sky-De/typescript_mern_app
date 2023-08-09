import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import {
  createPost,
  updatePost,
} from "../../../redux/features/post/postActionCreators";
import { useHandleUpload } from "../../../hooks/useImageUploder";
import CircularLoading from "../../loading/CircularLoading";
import SubmitBtn from "../../buttons/SubmitBtn";
import BookCover from "../../../assets/images/book-cover-min.jpg";
import Input from "../Input";
import "./style.scss";
import { usePostFormValidator } from "../../../hooks/formValidators";
import ErrorMessage from "../../Error/Error";
import CloseBtn from "../../buttons/CloseBtn";

type PostFormStateProps = {
  title: string;
  bookAuthor: string;
  desc: string;
  coverUrl: string;
};

type FormErr = {
  isError: boolean;
  msg: string;
};
const formErrInitialState = {
  isError: false,
  msg: "",
};

const postFromInitialState: PostFormStateProps = {
  title: "",
  bookAuthor: "",
  desc: "",
  coverUrl: "",
};

const PostForm: React.FC<{ isUpdate: boolean }> = ({ isUpdate }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] =
    useState<PostFormStateProps>(postFromInitialState);
  const [formErr, setFormErr] = useState<FormErr>(formErrInitialState);

  const { selectedPost, allPosts } = useAppSelectore((state) => state.post);
  const { isValid, errMessage } = usePostFormValidator(formData);
  const {
    isError: uploadImageError,
    isLoading: uploadImageLoading,
    coverUrl: uploadImageUrl,
  } = useHandleUpload({ selectedImage });
  const dispatch = useAppDispatch();

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  useEffect(() => {
    setFormData({ ...formData, coverUrl: uploadImageUrl });
  }, [uploadImageUrl]);
  // last formData

  useEffect(() => {
    if (isUpdate && selectedPost) setFormData({ ...selectedPost });
    else setFormData(postFromInitialState);
  }, [isUpdate, selectedPost]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return setFormErr({ isError: true, msg: errMessage });
    if (isUpdate)
      dispatch(updatePost({ _id: selectedPost._id, updatedPost: formData }));
    if (!isUpdate) dispatch(createPost(formData));
  };

  return (
    <form className="authForm postForm" onSubmit={submitHandler}>
      <CloseBtn />
      <i
        className={`bx ${
          isUpdate ? "bx-edit-alt" : "bx-book-add"
        }  postForm__icon`}
      ></i>
      <Input
        type="text"
        name="title"
        value={formData.title}
        changeHandler={changeHandler}
      />
      <Input
        type="text"
        name="bookAuthor"
        value={formData.bookAuthor}
        changeHandler={changeHandler}
      />
      <Input
        type="text-field"
        name="desc"
        value={formData.desc}
        changeHandler={changeHandler}
      />
      <span style={{ fontSize: "0.85rem" }}>{formData.desc.length}</span>

      <input onChange={changeImageHandler} type="file" />

      <img
        className="postForm__img"
        alt="book"
        src={
          !isUpdate
            ? //if creates new post--form
              selectedImage
              ? URL.createObjectURL(selectedImage)
              : BookCover
            : //if updates post--form
            selectedImage
            ? URL.createObjectURL(selectedImage)
            : selectedPost.coverUrl === ""
            ? BookCover
            : selectedPost.coverUrl
        }
      />

      <SubmitBtn
        disable={uploadImageLoading}
        isLoading={allPosts.isLoading}
        tag={isUpdate ? "save" : "create"}
      />
      {uploadImageLoading && <CircularLoading />}
      {formErr.isError && <ErrorMessage errMessage={formErr.msg} />}
      {allPosts.error && <ErrorMessage errMessage={allPosts.error} />}
      {uploadImageError && (
        <ErrorMessage errMessage="Image upload has been failed!" />
      )}
    </form>
  );
};

export default PostForm;
