import fetch from "isomorphic-unfetch";

export default async function getPosts() {
  const resp = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/parsed/posts.json")

  if (resp.ok) {
    return await resp.json()
  } else {
    return []
  }
};
