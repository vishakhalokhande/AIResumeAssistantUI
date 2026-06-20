import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadResume = async () => {
    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://localhost:7269/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Upload failed.");
    }
  };
  return (
    <div>
      <h2>Upload Resume</h2>

      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

      <br />
      <br />

      <button onClick={uploadResume}>Upload</button>

      <p>{message}</p>
    </div>
  );
};

export default ResumeUpload;
