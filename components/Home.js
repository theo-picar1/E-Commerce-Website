import React, {Component} from "react";

import Toolbar from "./Toolbar.js";
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
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`).then((res) => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage);
                } else {
                    console.log("Products have been successfully retrieved/read");

                    let categories = [];

                    res.data.forEach((product) => {
                        if (product["category"]) {
                            categories.push(product["category"]);
                        }
                    });

                    let uniqueCategories = [...new Set(categories)];

                    this.setState({
                        products: res.data,
                        originalProducts: res.data,
                        categories: uniqueCategories,
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

        if (sortType === "asc") {
            updatedProducts.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
        } else if (sortType === "desc") {
            updatedProducts.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1));
        }

        this.setState({
            products: updatedProducts,
        });
    };

    setSortAttribute = (e) => {
        let array = e.target.value.split("-");

        let sortBy = array[0];
        let sortType = array[1];

        this.sortProducts(sortBy, sortType);
    };

    // Function to scroll to the top
    scrollToTop = () => {
        const topOfPage = document.getElementById("top-of-page");
        topOfPage.scrollIntoView({behavior: "smooth"});
    };

    handleProductClick = (product) => {
        this.setState(
            {
                product,
                showProductDetails: true,
            },
            () => {
                this.scrollToTop();
            }
        );
    };

    closeProductDetails = () => {
        this.setState({showProductDetails: false, product: null});
    };

    handleSearch = (searchValue) => {
        searchValue = searchValue.toLowerCase();
        const filteredProducts = this.state.originalProducts.filter((product) =>
            product.name.toLowerCase().includes(searchValue)
        );

        this.setState({
            searchValue,
            products: filteredProducts,
        });
    };

    render() {
        const {searchValue, showProductDetails, cartCounter, categories, products, product} =
            this.state;
        const {
            incrementCartCounter,
            setSortAttribute,
            handleProductClick,
            closeProductDetails,
        } = this;
        return (
            <div className="page-content">
                <div id="top-of-page"></div>
                <Toolbar cartCounter={cartCounter} onSearch={this.handleSearch} searchValue={searchValue}/>
                <div id="main-content">
                    {showProductDetails ? (
                        <ProductDetails
                            product={product}
                            closeProductDetails={closeProductDetails}
                            incrementCartCounter={incrementCartCounter}
                        />
                    ) : (
                        <>
                            <Filters categories={categories}/>
                            <ProductsGallery
                                products={products}
                                incrementCartCounter={incrementCartCounter}
                                onSort={setSortAttribute}
                                handleProductClick={handleProductClick}
                            />
                        </>
                    )}
                </div>
                <Footer/>
            </div>
        );
    }
}
