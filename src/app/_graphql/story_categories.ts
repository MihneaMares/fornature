import { POST } from "./posts";

export const STORY_CATEGORIES = `
    query StoryCategories {
        StoryCategories {
            id
            slug
            title
            img
            items {
                posts ${POST}
            }
        }
    }
`