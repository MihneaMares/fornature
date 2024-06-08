const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/storycategories', async (req, res) => {
  try {
    res.setHeader(
      "Content-Security-Policy",
      "connect-src 'self' http://localhost:3001/storycategories "
    );
    await client.connect();
    
    const database = client.db('ForNature');
    const collection = database.collection('StoryCategory');

    const storyCategories = await collection.find().toArray();
    res.json(storyCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.get('/posts', async (req, res) => {
  try {
    res.setHeader(
      "Content-Security-Policy",
      "connect-src 'self' http://localhost:3001/posts "
    );
    await client.connect();
    
    const database = client.db('ForNature');
    const collection = database.collection('Post');

    const storyPosts = await collection.find().toArray();
    res.json(storyPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
