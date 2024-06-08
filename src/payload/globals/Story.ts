// src/globals/StoryPage.ts

import { GlobalConfig } from 'payload/types';

const StoryPage: GlobalConfig = {
  slug: 'story-page',
  label: 'Story Page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        {
          slug: 'storyPosts',
          labels: {
            singular: 'Story Post',
            plural: 'Story Posts',
          },
          fields: [
            {
              name: 'posts',
              type: 'relationship',
              relationTo: 'stories',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
};

export default StoryPage;
