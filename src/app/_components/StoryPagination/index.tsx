"use client"

import React from 'react'
import styles from './index.module.scss'
import { useRouter } from 'next/navigation';

const StoryPagination = ({ page }) => {
  const router = useRouter();
  
  return (
    <div className={styles.container}>
    <button
      className={styles.button}
      onClick={() => router.push(`?page=${page - 1}`)}
    >
      Previous
    </button>
    <button
      className={styles.button}
      onClick={() => router.push(`?page=${page + 1}`)}
    >
      Next
    </button>
  </div>
  )
}

export default StoryPagination