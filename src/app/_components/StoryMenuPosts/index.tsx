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
                Într-o dimineață răcoroasă de vară, am pornit într-o drumeție spre vârful muntelui Retezat.
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
                Muzicienii talentați au improvizat melodii captivante, iar atmosfera a fost electrizantă..
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
                Am petrecut o seară de camping liniștită sub un cer înstelat, înconjurați de natura sălbatică..
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
                Geaca impermeabilă de drumeție m-a protejat excelent de ploaie și vânt pe parcursul întregii excursii montane.
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