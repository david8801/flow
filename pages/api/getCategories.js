import fetch from "isomorphic-unfetch";

export default async function getCategories() {
  const resp = await fetch("https://thecymes.netlify.app/parsed/categories.json")

  if (resp.ok) {
    return (await resp.json()).sort((a, b) => a.data.order - b.data.order)
  } else {
    return []
  }
};
