import React from "react";
import Photo from "./Photo";

function PhotoGallery({photos, onDelete, onEdit}) {
  return (
    <div className='gallery'>
      {photos.map((photo) => (
        <Photo 
          key = {photo.id}
          photo = {photo}
          onDelete = {onDelete} 
          onEdit = {onEdit}
        />
      ))}
    </div>
    );
}

export default PhotoGallery;