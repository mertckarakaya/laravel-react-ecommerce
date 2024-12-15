import React from "react"
import Categories from "../components/Catagories/Categories"
import Products from "../components/Products/Products"
import CampaignSingle from "../components/CampaignSingle/CampaignSingle"
import MetaDecorator from "../components/utils/MetaDecorator/MetaDecorator"

const ShopPage = () => {
  return (
    <React.Fragment>
        <MetaDecorator title="Shop Page" description="This is the shop page" />
        <Categories />
        <Products />
        <CampaignSingle />
        <Products />
    </React.Fragment>
  )
}

export default ShopPage