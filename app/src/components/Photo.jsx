import React, {useState} from "react";

function Photo({photo, onDelete, onEdit}) {

    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(photo.title);
    const handleEditClick = () => {
      setEditing(true);
    }
    const handleSaveClick = () => {
      onEdit(photo.id, newTitle);
      setEditing(false);
    }
    
    // Decode base64 image
    var decodedImg = atob(photo.image);
    var photoImg = new Image();
    photoImg.src = "data:image/jpg;base64," + decodedImg;

    return (
      <div className="photo">
        <img ng-src={photoImg.src} alt={photo.title} crossOrigin="anonymous"/>
        {console.log("photo: " + photoImg.src)}
        {editing ? (
          <div>
            <input
              type = "text"
              value = {newTitle}
              onChange = {(e) => setNewTitle(e.target.value)}
            />
            <button onClick = {handleSaveClick}>Save</button>
          </div>
        ) : (
          <div>
            <p>{photo.title}</p>
            <button onClick = {handleEditClick}>Edit</button>
            <button onClick = {() => onDelete(photo.id)}>Delete</button>
          </div> 
        )}
        </div>
    );
  }

export default Photo;