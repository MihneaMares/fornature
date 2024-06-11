import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link';

import Image from 'next/image';

const getData = async (storyPost) => {
  const res = await fetch(`http://localhost:3001/comments/${storyPost}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const StoryComments = async ({storyPost}) => {
  
  const data = await getData(storyPost);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            
          />
          <button className={styles.button}>
            Send
          </button>
        </div>
      
        {/* <Link href="/login">Login to write a comment</Link> */}
      
      <div className={styles.comments}>
        { data?.map((item) => (
              <div className={styles.comment} key={item._id}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
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