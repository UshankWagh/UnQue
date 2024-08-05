import React from 'react'
import DropDown from '../components/DropDown'
import "../styles/SearchShop.css"
import ShopCard from '../components/ShopCard'

const SearchShop = () => {
    return (
        <div className='search-shop'>
            <h1>Search Shop</h1>
            <div className="search-bar">
                <DropDown />
                <DropDown />
                <button className='btn search-btn'>Search</button>
            </div>
            <div className="shops">
                <div className="shops-head">Shops</div>
                <div className="shop-list">
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                </div>
            </div>
        </div>
    )
}

export default SearchShop