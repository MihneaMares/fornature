import React from 'react'
import styles from './singleStoryPage.module.scss'
import Image from 'next/image'
import StoryMenu from '../../../_components/StoryMenu'
import StoryComments from '../../../_components/StoryComments'

const SingleStoryPage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.infoContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title displayed here</h1>
        <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src="/assets/images/forNature2.jpg" alt="" fill className={styles.avatar} />
            </div>
          <div className={styles.userTextContainer}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}>01.01.2024</span>
          </div>
        </div>
      </div>
        <div className={styles.imageContainer}>
          <Image src="/assets/images/forNature4.jpg" alt="" fill className={styles.image} />
        </div>
    </div>
    <div className={styles.content}>
      <div className={styles.post}>
        <div className={styles.description}>
          <p>
            New text to fill this content New text to fill this content New text to fill this content New text to fill this content
          </p>
        </div>
        <div className={styles.comment}>
          <StoryComments />
        </div>
      </div>
      <StoryMenu />
    </div>
  </div>
  )
}

export default SingleStoryPage