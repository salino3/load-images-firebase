import React from 'react';
import { ref, uploadBytes, listAll, ListResult, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';
import { storage } from '../firebase/firebase';

interface Props {
  imageUpload: File | null;
  setImageUpload: React.Dispatch<React.SetStateAction<File | null>>;
  imageList: string[] | null | undefined;
  setImagesList: ( value: React.SetStateAction<string[] | null | undefined>) => void;
};


export const FormImages: React.FC<Props> = (props) => {
  const { imageUpload, setImageUpload, imageList, setImagesList } = props;

    
  const imageListRef = ref(storage, "images/");


  const uploadImage: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (imageUpload === null) return;

    const newFileName = v4() + "_" + imageUpload.name;
    const imageRef = ref(storage, `images/${newFileName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImagesList((prev) => [url, ...(prev ?? [])]);
      });
      alert("Image Uploaded");
    });
  };

  React.useEffect(() => {
    listAll(imageListRef).then((response: ListResult) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImagesList((prev) => [...(prev ?? []), url]);
        });
      });
    });
  }, []);


  return (
    <form onSubmit={uploadImage} className='border border-info rounded border-2 w-75 m-auto p-3'>
      <input
        required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setImageUpload(event?.target?.files?.[0] ?? null)}
        type="file"
        className='border border-white rounded bg-secundary text-warning m-1'
        placeholder="Upload your image.."/>
      <button className='btn btn-primary m-1 ' type="submit"><b>Upload Images</b></button>
    </form>
  );
}
