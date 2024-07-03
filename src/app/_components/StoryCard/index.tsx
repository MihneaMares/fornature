// components/StoryCard.tsx
import React from 'react';
import styles from './index.module.scss';
import Link from "next/link";
import Image from "next/image";
import { getMeUser } from './../../_utilities/getMeUser';
import dynamic from 'next/dynamic';
import DeclineButton from './DeclineButton';

const ApproveButton = dynamic(() => import('./ApproveButton'), { ssr: false });

interface StoryCardProps {
  item: {
    _id: string;
    createdAt: string;
    slug: string;
    title: string;
    desc: string;
    img: string;
    catSlug: string;
    isApproved: boolean;
  };
}

const StoryCard: React.FC<StoryCardProps> = async ({ item }) => {
  const { user } = await getMeUser({
    nullUserRedirect: null,
  });

  if (!item.isApproved && !(user?.roles.includes('admin'))) {
    return null;
  }

  return (
    <div className={styles.container}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: `${item?.desc.substring(0, 88)}...` }} />
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
        {user?.roles.includes('admin') && !item.isApproved && (
          <div className={styles.buttonContainer}>
            <ApproveButton item={item} />
            <DeclineButton item={item} />
          </div>
          
        )}
      </div>
    </div>
  );
};

export default StoryCard;
