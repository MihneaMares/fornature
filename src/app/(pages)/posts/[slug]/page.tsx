
import React from 'react'
import styles from './singleStoryPage.module.scss'
import global from './singleStoryPage.module.scss'
import Image from 'next/image'
import StoryMenu from '../../../_components/StoryMenu'
import StoryComments from '../../../_components/StoryComments'


const getData = async (slug) => {
  const res = await fetch(`http://localhost:3001/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const SingleStoryPage = async ({params}) => {

  const { slug } = params;
  const data = await getData(slug);
  return (
    <div className={global.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>Posted by {data?.userEmail.split('@')[0]}</span>
              <span className={styles.date}>
                {new Date(data?.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <StoryComments storyPost={slug}/>
          </div>
        </div>
        <StoryMenu />
      </div>
    </div>
  );
};

export default SingleStoryPage
