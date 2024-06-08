import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link';
import { useAuth } from '../../_providers/Auth';

const StoryComments = () => {
  const { user } = useAuth()
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            //onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
    </div>
    
  )
}

export default StoryComments