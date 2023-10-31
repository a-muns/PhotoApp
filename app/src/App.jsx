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
      .then(response => {
        const result = response.json();
        return result;
        // Create binary BytesIO() object out of file in app.py, then receive it with the below
        // return response.blob().then((blob) => {
        //   return {
        //     blob: blob,
        //     title: response.headers.get("title"),
        //     id: response.headers.get("id")
        //   }
        // })
      })
      .then(data => {
        console.log(data);
        setPhotos(data);
        // 
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