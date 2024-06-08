import { STORY_CATEGORIES } from "./story_categories";

export const POST = `
    query Post {
        id
        createdAt
        slug
        title
        desc
        img
        views
        catSlug
        cat
        userEmail
        user
        comments
    }
`