import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import SignToNews from "./SignToNews";

const RenderContent = ({ children, categories }) => {
  return (
    <>
      <Header categories={categories}/>
      <div className={"page-content theme-bg"}>
        {children}

        <SignToNews/>
        <Footer categories={categories}/>
      </div>
    </>
  );
};

export default RenderContent;
