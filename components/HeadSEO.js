import React from 'react';
import Head from "next/head";

const HeadSEO = ({title, url, description, image}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:title" content={title}/>
      <meta property="og:title" content={title}/>
      {description && <meta name="description" content={description}/>}
      {description && <meta name="twitter:description" content={description}/>}
      {description && <meta property='og:description'  content={description}/>}
      {image && <meta property="og:image" content={image}/>}
      {image && <meta name="twitter:image" content={image}/>}
      {url && <link rel='canonical' href={url}/>}
      {url && <meta property="og:url" content={url}/>}
      {url && <meta name='twitter:url' content={url}/>}
      <meta name="twitter:card" content="summary_large_image"/>
    </Head>
  );
};

export default HeadSEO;
