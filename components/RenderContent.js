import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import SignToNews from "./SignToNews";

const RenderContent = ({ children, categories, posts }) => {
  return (
    <>
      <Header categories={categories} posts={posts}/>
      <div className={"page-content theme-bg"}>
        {children}

        <SignToNews/>
        <Footer categories={categories}/>
      </div>
    </>
  );
};

export default RenderContent;
