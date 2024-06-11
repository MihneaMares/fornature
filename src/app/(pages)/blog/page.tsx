
import React, from 'react'
import styles from './index.module.scss'
import StoryCardList from '../../_components/StoryCardList'
import StoryMenu from '../../_components/StoryMenu'
import global from './index.module.scss'
import classes from './index.module.scss'
import { MongoClient } from 'mongodb';

const clientPromise = new MongoClient(process.env.DATABASE_URL).connect();


async function fetchPosts(catSlug) {
  const client = await clientPromise;
  const database = client.db('ForNature');
  const collection = database.collection('Post');
  const query = catSlug ? { catSlug } : {};
  const posts = await collection.find(query).toArray();
  return posts;
}
const BlogPage = async({searchParams}) => {

  const catSlug = searchParams.catSlug || null;
  const posts = await (fetchPosts(catSlug));

  return (
    <div className={global.container}>
      <h1 className={global.title}>{catSlug} Blog</h1>
      <div className={global.wrapper}>
        <div className={classes.content}>
          <StoryCardList cat={catSlug} />
          <StoryMenu />
        </div>
      </div>
      
    </div>
  )
}

export default BlogPage