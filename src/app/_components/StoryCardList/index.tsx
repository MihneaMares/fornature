import React from 'react'
import styles from './index.module.scss'
import StoryCard from '../StoryCard'
import StoryPagination from '../StoryPagination';
import {fetchStoryPosts} from '../../_api/tentativa'

const getData = async (storyPage, cat) => {
  //console.log(`http://localhost:3001/posts?page=${storyPage}`)
  const res = await fetch(`http://localhost:3001/posts?cat=${cat || ""}`, {
     cache: "no-store",
   });
   console.log(res);
  if (!res.ok) {
    console.log(res.text())
    throw new Error("Failed");
  }

   return res.json();
};

const StoryCardList = async ({storyPage, cat}) => {
  const data = await fetchStoryPosts(cat);

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Recent Posts</h1>
        <div className={styles.posts}>
          {data?.map((item) =>  (
            
            <StoryCard item={item}/>
          ))}

        </div>
        <StoryPagination storyPage={storyPage} />
    </div>
  )
}

export default StoryCardList