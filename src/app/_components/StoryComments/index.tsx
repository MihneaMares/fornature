"use client"
import React, { useState } from 'react'
import styles from './index.module.scss'
import Image from 'next/image';
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const StoryComments = ({storyPost}) => {

  const [desc, setDesc] = useState('');
  const userEmail = "lazarandrei19@stud.ase.ro"
  const postSlug = storyPost
 
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3001/comments/${storyPost}`,
    fetcher, {
      refreshInterval: 3000
    }
  )

  const handleSubmit = async () => {
    try {
      setDesc('');

      await fetch(`http://localhost:3001/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desc, userEmail, postSlug }),
      });

      // Update the comments list
      mutate();
  
      
      // Clear the desc value after submission
      
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle error as needed
    }
  };

  return (
    
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
        {/* {user ? ( */}
          <div className={styles.write}>
            <textarea
            placeholder="write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            />
            <button className={styles.button} onClick={handleSubmit}>
              Send
            </button>
          </div>
        {/* ): (
          <Link href="/login">Login to write a comment</Link>
        )} */}
      
      <div className={styles.comments}>
        {isLoading
          ? "loading"
          :   data?.map((item) => (
              <div className={styles.comment} key={item._id}>
                <div className={styles.user}>
                  {item?.userEmail?.image && (
                    <Image
                      src={item.userEmail.image}
                      alt=""
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div>
                    <span className={styles.username} style={{ display: 'inline-block' }}>{item.userEmail.split('@')[0]} said at: </span>
                    <span className={styles.date} style={{ display: 'inline-block', marginLeft: '10px' }}>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default StoryComments