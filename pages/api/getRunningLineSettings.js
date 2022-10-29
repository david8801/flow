import fetch from "isomorphic-unfetch";

export default async function getRunningLineSettings() {
  const resp = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/parsed/running_line.json")

  if (resp.ok) {
    return await resp.json()
  } else {
    return []
  }
};
