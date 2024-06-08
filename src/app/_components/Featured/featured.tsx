import React from "react";
import styles from "./featured.module.scss";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Exploring the Great Outdoors!</b> 
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/assets/images/forNature4.jpg" alt="nature1" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>All you need, is right here.</h1>
          <p className={styles.postDesc}>
          Discover tips, stories, and guides for your next adventure in nature. Whether you're a seasoned hiker, an enthusiastic camper, or someone who simply loves to bask in the beauty of the natural world, our blog offers a wealth of information to enhance your outdoor experiences. From detailed trail guides and essential gear reviews to inspiring adventure stories and eco-friendly practices, we cover everything you need to know to make the most of your time in the wild. Join us as we explore the wonders of nature and embark on unforgettable journeys together.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;