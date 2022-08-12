import fetch from "isomorphic-unfetch";

export default async function getCategories() {
    const resp = await fetch("https://flow-blog.netlify.app/parsed/categories.json")
    return await resp.json()
};
