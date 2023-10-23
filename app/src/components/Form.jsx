import React from "react";

function Form() {

  function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(formData);
    fetch("http://127.0.0.1:5000/photos", { mode: "no-cors", method: "POST", headers: {"Content-Type":"application/json"}, body: formData });
  }

  return (
    <div className="form">
      <form method="post" onSubmit={onSubmit}>
        <label>Title: </label>
        <input type="text" name="title"></input>
        <label>Choose file to upload</label>
        <input type="file" name="file" required></input>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Form;