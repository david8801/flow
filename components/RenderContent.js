import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const RenderContent = ({ children, categories }) => {
  return (
    <>
      <Header categories={categories}/>
      <div className={"page-content theme-bg"}>
        {children}
      </div>
      <Footer categories={categories}/>
    </>
  );
};

export default RenderContent;
