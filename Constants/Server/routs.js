import posts from "../../Routs/Server/posts.js"

const POST = {
    route: '/posts',
    middlewares: [],
    router: posts
}

export default [POST]