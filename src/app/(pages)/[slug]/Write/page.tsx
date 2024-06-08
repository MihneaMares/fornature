"use client"

import React, { useState } from 'react'
import styles from './index.module.scss'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.bubble.css"
import Image from 'next/image'
import { useRouter } from 'next/router'

const WritePage = () => {


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");


  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
      />
      <select className={styles.select}>
        <option value="trails">trails</option>
        <option value="camping">camping</option>
        <option value="equipment">equipment</option>
        <option value="culture event">culture event</option>
        <option value="eco friendly">eco friendly</option>
        <option value="donations">donations</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/assets/icons/plus.svg" alt="plus" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
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
      <button className={styles.publish}>
        Publish
      </button>
    </div>
  )
}

export default WritePage