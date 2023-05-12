import React from "react";
import { FormImages, List } from "../components";

export const Home: React.FC = () => {
  const [imageUpload, setImageUpload] = React.useState<File | null>(null);
  const [imagesList, setImagesList] = React.useState<string[] | null | undefined>([]);


  return (
    <div className="d-flex flex-column">
      <FormImages
        imageUpload={imageUpload}
        setImageUpload={setImageUpload}
        imageList={imagesList}
        setImagesList={setImagesList}
      />
      <hr className=" mt-3 mb-4 " />
      <List imagesList={imagesList} />
    </div>
  );
};
