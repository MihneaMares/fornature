import React from 'react'
import styles from './index.module.scss'
import StoryMenuPosts from '../StoryMenuPosts';
import StoryMenuCategories from '../StoryMenuCategories';

const StoryMenu = () => {
    return (
        <div className={styles.container}>
          <h2 className={styles.subtitle}>{"What's hot"}</h2>
          <h1 className={styles.title}>Most Popular</h1>
          <StoryMenuPosts withImage={false} />
          <h2 className={styles.subtitle}>Discover by topic</h2>
          <h1 className={styles.title}>Categories</h1>
          <StoryMenuCategories />
          <h2 className={styles.subtitle}>Chosen by the editor</h2>
          <h1 className={styles.title}>Editors Pick</h1>
          <StoryMenuPosts withImage={true} />
        </div>
      );
}

export default StoryMenu 