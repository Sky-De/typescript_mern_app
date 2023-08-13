import axios from "axios";
import { useEffect, useState } from "react";

type UploadProps = {
  selectedImage: File | null;
};

type Return = {
  isLoading: boolean;
  coverUrl: string;
  isError: boolean;
};

export const useHandleUpload = (porps: UploadProps): Return => {
  const { selectedImage } = porps;
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getUrl = async () => {
    if (!selectedImage) return console.log("There is no image here (hooks)");

    const imgFormData = new FormData();
    imgFormData.append("file", selectedImage);
    imgFormData.append("upload_preset", "upload");
    const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL || "";

    try {
      setIsloading(true);
      const response = await axios.post(CLOUDINARY_URL, imgFormData);
      if (response.status === 200) {
        setCoverUrl(response.data.url);
        setIsloading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Image upload failed!");
      setCoverUrl("");
      setIsError(true);
      setIsloading(false);
    }
  };

  useEffect(() => {
    getUrl();
  }, [selectedImage]);

  return { isLoading, coverUrl, isError };
};
