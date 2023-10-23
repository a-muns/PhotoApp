import './App.css'
import React, { useState, useEffect } from "react"
import PhotoGallery from "./components/PhotoGallery"
import Form from "./components/Form"

// GET photos from backend; ensure JSON array exists; pass to PhotoGallery component

// Supply PhotoGallery with onDelete & onEdit methods
//    These methods should DELETE & PUT respectively to the backend
// 

function App() {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/photos")
      .then(res => {
        const result = res.json();
        return result; // - uncomment and delete rest of this block to restore functionality
        // const blob = new Blob([JSON.stringify(result, null, 2)], {type: "application/json"});
        // return blob;
      })
      .then(data => {
        setPhotos(data);
      });
      console.log(photos);
  }, []);

  // DELETE to backend
function onDelete(photoid) {
    
}

  // PUT to backend
function onEdit(photoid, newTitle) {

}

    return (
      <div>
        <PhotoGallery 
          photos = {photos}
          onDelete = {onDelete} 
          onEdit = {onEdit}      
        />
        <Form />
      </div>
    );
}

export default App;