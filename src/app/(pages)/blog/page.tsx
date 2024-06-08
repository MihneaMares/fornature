import React from 'react'
import styles from './index.module.scss'
import StoryCardList from '../../_components/StoryCardList'
import StoryMenu from '../../_components/StoryMenu'

const BlogPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trails Blog</h1>
      <div className={styles.content}>
        <StoryCardList />
        <StoryMenu />
      </div>
    </div>
  )
}

export default BlogPage