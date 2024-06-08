import type { CollectionConfig } from 'payload/types'
import { MediaBlock } from '../../../blocks/MediaBlock'

const Story: CollectionConfig = {
    slug:'stories',
    labels: {
        singular: 'Story',
        plural: 'Stories',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'author',
            type: 'text',
        },
        {
            name:'image',
            type:'upload',
            relationTo: 'media'
        },
        {
            name:'tags',
            type:'array',
            fields: [
                {
                    name:'storycategory',
                    type:'text',
                }
            ],            
        },
    ]
}

export default Story;