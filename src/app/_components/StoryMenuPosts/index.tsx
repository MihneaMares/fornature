import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link';
import Image from 'next/image';

const StoryMenuPosts = ({withImage}) => {
    return (
        <div className={styles.items}>
          <Link href="/" className={styles.item}>
            {withImage && (
              <div className={styles.imageContainer}>
                <Image src="/assets/images/forNature3.jpg" alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles.trails}`}>Trails</span>
              <h3 className={styles.postTitle}>
              On a cool summer morning, we embarked on a hike to the top of Mount Retezat.
              </h3>
              <div className={styles.detail}>
                <span className={styles.username}>Ioana Vasilescu</span>
                <span className={styles.date}> - 10.03.2023</span>
              </div>
            </div>
          </Link>
          <Link href="/" className={styles.item}>
            {withImage && (
              <div className={styles.imageContainer}>
                <Image src="/assets/postsImages/cultureevent.jpg" alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles.cultureEvent}`}>
                Culture Event
              </span>
              <h3 className={styles.postTitle}>
              The talented musicians improvised captivating songs, and the atmosphere was electrifying..
              </h3>
              <div className={styles.detail}>
                <span className={styles.username}>Mihai Dumitrescu</span>
                <span className={styles.date}> - 18.04.2024</span>
              </div>
            </div>
          </Link>
          <Link href="/" className={styles.item}>
            {withImage && (
              <div className={styles.imageContainer}>
                <Image src="/assets/postsImages/camping2.jpg" alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles.camping}`}>Camping</span>
              <h3 className={styles.postTitle}>
              We spent a quiet evening camping under a starry sky, surrounded by wild nature..
              </h3>
              <div className={styles.detail}>
                <span className={styles.username}>Elena Ionescu</span>
                <span className={styles.date}> - 7.08.2023</span>
              </div>
            </div>
          </Link>
          <Link href="/" className={styles.item}>
            {withImage && (
              <div className={styles.imageContainer}>
                <Image src="/assets/postsImages/equipment.jpg" alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles.equipment}`}>
                Equipment
              </span>
              <h3 className={styles.postTitle}>
              The waterproof hiking jacket protected me excellently from rain and wind throughout the mountain trip.
              </h3>
              <div className={styles.detail}>
                <span className={styles.username}>Andrei Popescu</span>
                <span className={styles.date}> - 16.05.2023</span>
              </div>
            </div>
          </Link>
        </div>
      );
}

export default StoryMenuPosts