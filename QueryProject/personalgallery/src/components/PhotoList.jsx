import React from "react";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import PhotoListItem from "./PhotoListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";

function PhotoList({ album }) {
  const { data, isError, isFetching } = useFetchPhotosQuery(album);

  const [addPhoto, results] = useAddPhotoMutation();

  const handlePhotoAdd = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = (
      <Skeleton
        variant={"rectangular"}
        sx={{ width: "100%", height: "200px" }}
      />
    );
  } else if (isError) {
    content = <div>Hata Var.</div>;
  } else {
    content = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <>
      <div>
        <div className="topArrangement">
          <h3>{album.title} Fotoğrafları</h3>
          <Button variant={"outlined"} onClick={handlePhotoAdd}>
            {results.isLoading ? (
              <CircularProgress />
            ) : (
              <span>Fotoğraf Ekle+</span>
            )}
          </Button>
        </div>
      </div>
      <div className="photoDiv">{content}</div>
    </>
  );
}

export default PhotoList;
