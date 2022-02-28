import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./ImageUpload.css";

const BASE_URL = "http://localhost:8000/";

function ImageUpload({ authToken, authTokenType }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e?.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
      }),
      body: formData,
    };

    fetch(BASE_URL + "post/image", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setImage(null);
        // create post here
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
      .finally(() => {
        setImage(null);
        setCaption("");
        document.getElementById("fileInput").value = null;
      });
  };

  return (
    <div className="imageupload">
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" id="fileInput" onChange={handleChange} />
      <Button className="imageupload_button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
