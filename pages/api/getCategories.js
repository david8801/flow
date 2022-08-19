import fetch from "isomorphic-unfetch";

export default async function getCategories() {
  const resp = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/parsed/categories.json")

  if (resp.ok) {
    return (await resp.json()).sort((a, b) => a.data.order - b.data.order)
  } else {
    return []
  }
};
