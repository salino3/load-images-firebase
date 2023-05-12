import React from "react";
import {storage} from '../firebase/firebase';
import { ref, uploadBytes, listAll, ListResult, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';


export const Home: React.FC = () => {
  

  const [imageUpload, setImageUpload] = React.useState<File | null>(null);
  const [imagesList, setImagesList] = React.useState<
    string[] | null | undefined
  >([]);

  //
  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload === null) return;

    const newFileName = v4() + "_" + imageUpload.name;
    const imageRef = ref(storage, `images/${newFileName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
         setImagesList((prev) => [ url, ...(prev ?? [])]);
        })
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
    <div>
      <input
        required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setImageUpload(event?.target?.files?.[0] ?? null)
        }
        type="file"
        placeholder="Upload your image.."
      />
      <button onClick={uploadImage}>Upload Images</button>

      <div>
        {imagesList &&
          imagesList.map((url: string | null, index: number) => {
            if (url == null) return null;
            return <img key={index} src={url} alt="image" />;
          })}
      </div>
    </div>
  );
};
