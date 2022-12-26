import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import SignToNews from "./SignToNews";

const RenderContent = ({ children, categories, posts }) => {

  console.log(children.type.name)
  return (
    <>
      <Header categories={categories} posts={posts}/>
      <div className={"page-content theme-bg"}>
        {children}

        <SignToNews/>
        {children.type.name === "Home" && (
          <div className="seo-text-wrapper">
            <h1>Zoom in Tech power | The Cymes </h1>
            <p>
              The Cymes is your one-stop destination for all things tech. Our team of Ukrainian entreGpreneurs, developers, and designers bring a unique perspective to the world of IT and technology, covering a wide range of topics including tech, hardware, design, blockchains, and games. <br/>
              At The Cymes, we are dedicated to delivering high-quality content and staying on top of the latest trends and innovations in the tech industry. Our in-depth articles and expert insights provide valuable information for developers, designers, and tech enthusiasts alike. <br/>
              In addition to covering the latest news and developments in the world of IT and technology, The Cymes also offers a wide range of resources for those looking to stay up-to-date on the latest hardware, software, and design trends. Whether you're looking for the latest information on blockchains, games, or any other aspect of the tech industry, The Cymes has you covered. <br/>
              So if you're looking for a reliable source of information and insights on all things tech, look no further than The Cymes. Our team of experts is dedicated to providing the latest and most accurate information on the constantly evolving world of IT and technology. Don't miss out – visit The Cymes today and stay on top of the latest trends and developments in the tech industry. <br/>
            </p>
          </div>
        )}
        <Footer categories={categories}/>
      </div>
    </>
  );
};

export default RenderContent;
