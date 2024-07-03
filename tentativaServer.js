const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());

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

    const catSlug = req.query.catSlug;
    const query = catSlug ? { catSlug } : {};

    const storyPosts = await collection.find(query).toArray();
    res.json(storyPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.get('/posts/:slug', async (req, res) => {
  try {
    res.setHeader(
      "Content-Security-Policy",
      "connect-src 'self' http://localhost:3001/posts http://localhost:3000/posts "
    );
    await client.connect();

    const database = client.db('ForNature');
    const collection = database.collection('Post');

    const { slug } = req.params;
    const post = await collection.findOne({ slug });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.get('/comments/:postSlug', async (req, res) => {
  try {
    res.setHeader(
      "Content-Security-Policy",
      "connect-src 'self' http://localhost:3001/comments http://localhost:3001/comments/Bucegi "
    );
    await client.connect();
    
    const database = client.db('ForNature');
    const collection = database.collection('Comment');

    const { postSlug } = req.params; // Extract slug from the URL parameters
    const query = { postSlug };

    const comments = await collection.find(query).toArray();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    //await client.close();
  }
});

app.post('/comments', async (req, res) => {
  try {
    await client.connect();
    
    const database = client.db('ForNature');
    const collection = database.collection('Comment');

    const { desc, userEmail, postSlug } = req.body;
    console.log('Received request body:', req.body); // Log the request body for debugging
    if (!desc || !userEmail || !postSlug) {
      return res.status(400).json({ error: 'All fields (desc, userEmail, postSlug) are required' });
    }

    const newComment = {
      createdAt: new Date(),
      desc,
      userEmail,
      postSlug
    };

    const result = await collection.insertOne(newComment);
    console.log('Insert result:', result); // Log the insert operation result for debugging

  } catch (error) {
    // console.error('Error:', error); // Log the error for debugging
    // res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.post('/posts', async (req, res) => {
  try {
    await client.connect();
    
    const database = client.db('ForNature');
    const collection = database.collection('Post');

    const { desc, userEmail, slug, title, img, catSlug } = req.body;
    console.log('Received request body:', req.body); // Log the request body for debugging

    if (!desc || !slug || !catSlug) {
      return res.status(400).json({ error: 'All fields (desc, userEmail, postSlug, catSlug) are required' });
    }

    const newPost = {
      createdAt: new Date(),
      slug: slug,
      title: title,
      desc: desc,
      img: img,
      catSlug: catSlug,
      userEmail: userEmail || 'lazarandrei19@stud.ase.ro',
      isApproved: false
    };

    console.log(newPost)
    const result = await collection.insertOne(newPost);
    console.log('Insert result:', result); // Log the insert operation result for debugging

    // Send the response back to the client
    res.status(201).json({ redirectUrl: 'http://localhost:3000/stories' });

  } catch (error) {
    // console.error('Error:', error); // Log the error for debugging
    // res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.put('/posts/:slug', async (req, res) => {
  try {
    await client.connect();
    
    const database = client.db('ForNature');
    const collection = database.collection('Post');

    const { slug } = req.params;
    const { desc, userEmail, title, img, catSlug } = req.body;
    console.log('Received request body:', req.body); // Log the request body for debugging

    // if (!desc || !catSlug) {
    //   return res.status(400).json({ error: 'Fields (desc, catSlug) are required' });
    // }

    const updatedPost = {
      $set: {
        desc: desc,
        title: title,
        img: img,
        catSlug: catSlug,
        userEmail: userEmail || 'maresmihnea19@stud.ase.ro',
        isApproved: true,
        updatedAt: new Date() // Track when the post was updated
      }
    };

    console.log(updatedPost);
    const result = await collection.updateOne({ slug: slug }, updatedPost);
    console.log('Update result:', result); // Log the update operation result for debugging

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Send the response back to the client
    res.status(200).json({ message: 'Post updated successfully' });

  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    await client.connect();
    
    const database = client.db('ForNature');
    const collection = database.collection('Post');

    const postId = req.params.id;
    console.log('Received request to delete post with ID:', postId); // Log the request ID for debugging

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(postId) });
    console.log('Delete result:', result); // Log the delete operation result for debugging

    if (result.deletedCount === 1) {
      // Successfully deleted the document
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      // No document matched the provided ID
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
