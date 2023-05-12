import React from "react";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";

interface Props {
  imagesList: string[] | null | undefined;
  setImagesList: ( value: React.SetStateAction<string[] | null | undefined>) => void;
};

export const List: React.FC<Props> = (props) => {
  const { imagesList, setImagesList } = props;

  const deleteImage = (index: number) => {
    const deletedImageUrl = imagesList?.splice(index, 1)[0];
    if (deletedImageUrl) {
      const imageRef = ref(storage, deletedImageUrl);
      deleteObject(imageRef)
        .then(() => {
          setImagesList([...imagesList]);
          alert("Image deleted successfully");
        })
        .catch((error) => {
          console.log(error);
          alert("Error deleting image");
        });
    };
  };

  return (
    <div className="d-flex text-white flex-column justify-content-center align-items-center mb-5 mt-2">
      {imagesList &&   
        imagesList.map((url: string | null | undefined, index: number) => {
          if (url == null) return null;
          return (
            <div key={index} 
            className="d-flex flex-row justify-content-center align-items-center gap-4 border-bottom mb-2 p-2 w-75 m-auto">
              <img
                style={{ maxWidth: "150px" }}
                key={index}
                src={url}
                alt="image"
              />
              <button
                className="btn btn-danger "
                onClick={() => deleteImage(index)}
              >
                <b>Delete</b>
              </button>
            </div>
          );
        })}
    </div>
  );
};
