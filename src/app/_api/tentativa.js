const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

const uri = process.env.DATABASE_URL; // MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchStoryCategories() {
  try {
    await client.connect();
    const database = client.db('ForNature'); // Replace with your database name
    const collection = database.collection('StoryCategory'); // Replace with your collection name

    const storyCategories = await collection.find().toArray();
    console.log(storyCategories);
    return storyCategories;
  } catch (error) {
    console.error('Error fetching story categories:', error);
    throw error;
  } finally {
    await client.close();
  }
}

export const fetchStoryPosts = async() => {
  try {
    await client.connect();
    const database = client.db('ForNature'); // Replace with your database name
    const collection = database.collection('Post'); // Replace with your collection name

    const storyPosts = await collection.find().toArray();
    return storyPosts;
  } catch (error) {
    console.error('Error fetching story categories:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Call the function to fetch and log story categories
// fetchStoryCategories().catch((error) => {
//   console.error('Error:', error);
// });
