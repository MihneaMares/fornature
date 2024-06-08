import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link';

const StoryMenuCategories = () => {
    return (
        <div className={styles.categoryList}>
          <Link
            href="/blog?cat=trails"
            className={`${styles.categoryItem} ${styles.trails}`}
          >
            Trails
          </Link>
          <Link href="/blog" className={`${styles.categoryItem} ${styles.camping}`}>
            Camping
          </Link>
          <Link href="/blog" className={`${styles.categoryItem} ${styles.equipment}`}>
            Equipment
          </Link>
          <Link href="/blog" className={`${styles.categoryItem} ${styles.ecoFriendly}`}>
            Eco Friendly
          </Link>
          <Link href="/blog" className={`${styles.categoryItem} ${styles.cultureEvent}`}>
            Culture Event
          </Link>
          <Link href="/blog" className={`${styles.categoryItem} ${styles.donations}`}>
            Donations
          </Link>
        </div>
      );
}

export default StoryMenuCategories