// src/routes/stories.ts

import { Request, Response } from 'express';
import { find } from 'payload';

export default async function handler(req: Request, res: Response) {
  try {
    const stories = await find({
      collection: 'stories',
      depth: 2, // Adjust depth according to your schema
    });

    // Render your stories template or return JSON data
    res.status(200).json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
