import React from 'react';

interface Props {
  imagesList: string[] | null | undefined;
};

export const List: React.FC<Props> = (props) => {
    const {imagesList} = props;
    
  return (
    <div >
      {imagesList &&
        imagesList.map((url: string | null, index: number) => {
          if (url == null) return null;
          return (
            <div className=' border-bottom mb-2 p-2 w-75 m-auto'>
              <img style={{maxWidth: "150px"}} key={index} src={url} alt="image" />
            </div>
          );
        })}
    </div>
  );
}
