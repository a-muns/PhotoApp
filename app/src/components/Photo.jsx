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
    
    return (
      <div className="photo">
        <img src={photo.url} alt={photo.title} crossOrigin="anonymous"/>
        {console.log("photo: " + photo.url)}
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