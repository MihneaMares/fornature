"use client"

import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.bubble.css"
import Image from 'next/image'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';
import { app } from './../../../_utilities/firebase'
const WritePage = () => {

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);


  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  
      const handleSubmit = async () => {
        try {
          alert('Story posted! Waiting for the admin approval. In the meantime, explore other stories.');
      
            setTimeout(() => {
              window.location.href = data.redirectUrl;
            }, 2000); // Adjust the delay as needed (2000ms = 2 seconds)

          const res = await fetch("http://localhost:3001/posts", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              desc: value,
              img: media,
              slug: slugify(title),
              catSlug: catSlug || "trails", // If not selected, choose the general category
            }),
          });
      
          // Parse the response data
          const data = await res.json();
      
          // Check if the response is ok (status 200-299)
          if (res.ok) {
            // Show notification
            
            
            // Redirect to the provided URL
            window.location.href = data.redirectUrl;
          } else {
            // Handle error response
            console.error("Error:", data);
            alert(`Error: ${data.error}`);
          }
        } catch (error) {
          console.error("Error:", error);
          alert(`Error: ${error.message}`);
        }
      };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={e => setTitle(e.target.value)}
      />
      <div style={{display:'flex'}}>
        <select className={styles.select}>
          <option value="trails">trails</option>
          <option value="camping">camping</option>
          <option value="equipment">equipment</option>
          <option value="culture event">culture event</option>
          <option value="eco friendly">eco friendly</option>
          <option value="donations">donations</option>
        </select>
        <button className={styles.button} onClick={() => setOpen(!open)}>
            <Image src="/assets/icons/plus.svg" alt="plus" width={16} height={16} />
        </button>
      </div>

      <div className={styles.editor}>
        
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}      
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/assets/icons/image.png" alt="image" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/assets/icons/external.png" alt="exteral" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/assets/icons/video.png" alt="video" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  )
}

export default WritePage