import React, { Component } from "react";

export default class ProductDetails extends Component {
  render() {
    const { product, closeProductDetails, incrementCartCounter } = this.props;
    return (
      <div id="product-details-container">
        <div id="product-imagesDiv">
          <div id="product-images">
            {product.productImgs.map((img, index) => (
              <img key={index} src={img} alt={`Product Image ${index + 1}`} />
            ))}
          </div>
        </div>
        <div id="product-details">
          <div id="close-button" onClick={() => closeProductDetails()}>
            <p>&#10005;</p>
          </div>
          <h1>{product.name}</h1>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>{product.stockQuantity} AVAILABLE</strong>
          </p>
          <p>
            <strong>Only €{product.price}</strong>
          </p>
          <p>
            <strong>{product.rating} / 5</strong>
          </p>
          <p>
            <strong>{product.noOfReviews} Reviews</strong>
          </p>
          <div id="description">
            {product.description.map((desc, index) => 
              <div key={index}>{desc}</div>
            )}
          </div>
          <button onClick={incrementCartCounter}>ADD TO BASKET</button>
        </div>
      </div>
    );
  }
}
