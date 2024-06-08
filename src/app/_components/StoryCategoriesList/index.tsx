
import React from 'react'
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:3001/storycategories", {
    cache: "no-store",
  });
  console.log(res.body);
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};


const StoryCategoriesList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href="/blog?cat=trails"
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoryCategoriesList