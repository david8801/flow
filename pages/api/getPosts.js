import fetch from "isomorphic-unfetch";

export default async function getPosts() {
    const resp = await fetch("https://flow-blog.netlify.app/parsed/posts.json")
    return await resp.json()
};