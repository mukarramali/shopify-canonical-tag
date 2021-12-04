import Compressor from "compressorjs";
import { useCallback, useEffect, useState } from "react";

function readBlob(file, callback) {
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      callback(reader.result);
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

export function ImageForm() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(50);
  const [imageSrc, setImageSrc] = useState("");

  const handleCompressedUpload = useCallback((e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: quality / 100,
      success: (compressedResult) => {
        setFile(compressedResult);
      },
    });
  }, []);

  useEffect(() => {
    if (file) {
      readBlob(file, (src) => {
        setImageSrc(src);
      });
    }
  }, [file, quality]);

  return (
    <div>
      <h5>Upload your image</h5>

      <label>
        File:
        <input
          accept="image/*,capture=camera"
          type="file"
          name="name"
          onChange={(event) => handleCompressedUpload(event)}
        />
      </label>
      <br />
      <label>
        Quality:
        <input
          type="range"
          min="0"
          max="100"
          value={quality}
          onChange={(event) => setQuality(event.target.value)}
        />
      </label>
      <br />
      <img src={imageSrc} style={{ height: "400px" }} />
    </div>
  );
}
