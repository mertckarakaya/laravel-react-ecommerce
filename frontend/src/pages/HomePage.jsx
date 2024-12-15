import React from "react";
import Sliders from "../components/Sliders/Sliders";
import Categories from "../components/Catagories/Categories";
import Products from "../components/Products/Products";
import Campaigns from "../components/Campaigns/Campaigns";
import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import MetaDecorator from "../components/utils/MetaDecorator/MetaDecorator.jsx";

const HomePage = () => {
  return (
    <React.Fragment>
      <MetaDecorator title="React E-Commerce" description="React E-Commerce web site" />
      <Sliders />
      <Categories />
      <Products />
      <Campaigns />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </React.Fragment>
  );
};

export default HomePage;
