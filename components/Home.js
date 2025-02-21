import React, {Component} from "react";

import Header from "./Header.js";
import Filters from "./Filters.js";
import ProductsGallery from "./ProductsGallery.js";
import ProductDetails from "./ProductDetails.js";
import Footer from "./Footer.js";

import axios from "axios";

import {SERVER_HOST} from "../config/global_constants.js";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            originalProducts: [],
            categories: [],
            cartCounter: 0,
            sortBy: ``,
            sortType: ``,
            showProductDetails: false,
            product: null,
            searchValue: "",
            selectedCategories: [],
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`).then((res) => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage);
                } else {
                    console.log("Products have been successfully retrieved/read");

                    let categories = [...new Set(res.data.map(product => product.category))];

                    this.setState({
                        products: res.data,
                        originalProducts: res.data,
                        categories: categories.filter(Boolean), // Remove empty categories
                    });
                }
            }
        });
    }

    incrementCartCounter = () => {
        this.setState((prevState) => ({cartCounter: prevState.cartCounter + 1}));
    };

    sortProducts = (sortBy, sortType) => {
        let updatedProducts = [...this.state.products];

        updatedProducts.sort((a, b) => {
            if (sortType === "asc") return a[sortBy] > b[sortBy] ? 1 : -1;
            return a[sortBy] < b[sortBy] ? 1 : -1;
        });

        this.setState({products: updatedProducts});
    };

    setSortAttribute = (e) => {
        const [sortBy, sortType] = e.target.value.split("-");
        this.sortProducts(sortBy, sortType);
    };

    scrollToTop = () => {
        document.getElementById("top-of-page").scrollIntoView({behavior: "smooth"});
    };

    handleProductClick = (product) => {
        this.setState({product, showProductDetails: true}, this.scrollToTop);
    };

    closeProductDetails = () => {
        this.setState({showProductDetails: false, product: null});
    };

    handleSearch = (searchValue) => {
        searchValue = searchValue.toLowerCase();
        this.setState({searchValue}, this.filterProducts);
    };

    handleFilterChange = (selectedCategories) => {
        this.setState({selectedCategories}, this.filterProducts);
    };

    filterProducts = () => {
        const {selectedCategories, originalProducts, searchValue} = this.state;

        let filteredProducts = originalProducts;

        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        if (searchValue) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchValue)
            );
        }

        this.setState({products: filteredProducts});
    };

    render() {
        const {searchValue, showProductDetails, cartCounter, categories, products, product} = this.state;

        return (
            <div className="page-content">
                <div id="top-of-page"></div>
                <Header cartCounter={cartCounter} onSearch={this.handleSearch} searchValue={searchValue}/>
                <div id="main-content">
                    {showProductDetails ? (
                        <ProductDetails
                            product={product}
                            closeProductDetails={this.closeProductDetails}
                            incrementCartCounter={this.incrementCartCounter}
                        />
                    ) : (
                        <>
                            <Filters categories={categories} onFilterChange={this.handleFilterChange}/>
                            <ProductsGallery
                                products={products}
                                incrementCartCounter={this.incrementCartCounter}
                                onSort={this.setSortAttribute}
                                handleProductClick={this.handleProductClick}
                            />
                        </>
                    )}
                </div>
                <Footer/>
            </div>
        );
    }
}
