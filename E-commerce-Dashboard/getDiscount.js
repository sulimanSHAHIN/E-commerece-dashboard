console.log("DONE");

function viewDiscount() {

    fetch(`http://127.0.0.1:8000/api/homepage`)
    .then(response => {
        if (response.ok) {
        return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // Do something with the response data
        console.log(data.discounts);

        for (var i=0;i<data.discounts.length;i++)
    {
// Create the list item element
const listItem = document.createElement('li');
listItem.className = 'd-flex w-100';

// Create the div element for the product option logo
const productOptionLogoDiv = document.createElement('div');
productOptionLogoDiv.className = 'Product-Option-Logo';
productOptionLogoDiv.style.backgroundImage = `url(${data.discounts[i].image})`;


// Create the div element for the discount data
const discountDataDiv = document.createElement('div');
discountDataDiv.className = 'Discount-data w-75';

// Create the div element for the product option name
const productOptionNameDiv = document.createElement('div');
productOptionNameDiv.className = 'Product-Option-Name';
productOptionNameDiv.textContent =  data.discounts[i].name;

// Create the div element for the product description
const productDescriptionDiv = document.createElement('div');
productDescriptionDiv.className = 'Product-description';
productDescriptionDiv.textContent =  data.discounts[i].description;

// Create the div element for the price data
const priceDataDiv = document.createElement('div');
priceDataDiv.className = 'd-flex Price-data justify-content-between w-75';

// Create the div element for the old price
const oldPriceDiv = document.createElement('div');
oldPriceDiv.className = 'Old-price d-flex';

// Create the div element for the old price word
const oldPriceWordDiv = document.createElement('div');
oldPriceWordDiv.className = 'Old-price-word';
oldPriceWordDiv.textContent = ' price:';

// Create the div element for the old price value
const oldPriceValueDiv = document.createElement('div');
oldPriceValueDiv.className = 'Old-price-value';
oldPriceValueDiv.textContent = data.discounts[i].price;

// Create the div element for the old price SP
const spOldDiv = document.createElement('div');
spOldDiv.className = 'SPOLD';
spOldDiv.textContent = 'S.P';

// Append the old price word, old price value, and SP old div to the old price div
oldPriceDiv.appendChild(oldPriceWordDiv);
oldPriceDiv.appendChild(oldPriceValueDiv);
oldPriceDiv.appendChild(spOldDiv);

// Create the div element for the new price
const newPriceDiv = document.createElement('div');
newPriceDiv.className = 'New-price d-flex';

// Create the div element for the new price word
const newPriceWordDiv = document.createElement('div');
newPriceWordDiv.className = 'New-price-word';
newPriceWordDiv.textContent = 'Discount Percent:';

// Create the div element for the new price value
const newPriceValueDiv = document.createElement('div');
newPriceValueDiv.className = 'New-price-value';
newPriceValueDiv.textContent = data.discounts[i].discount;

// Create the div element for the new price SP
const spNewDiv = document.createElement('div');
spNewDiv.className = 'SPNEW';
spNewDiv.textContent = '%';

// Append the new price word, new price value, and SP new div to the new price div
newPriceDiv.appendChild(newPriceWordDiv);
newPriceDiv.appendChild(newPriceValueDiv);
newPriceDiv.appendChild(spNewDiv);

// Append the old price div and new price div to the price data div
priceDataDiv.appendChild(oldPriceDiv);
priceDataDiv.appendChild(newPriceDiv);

// Create the div element for the difscount rating
const discountRatingDiv = document.createElement('div');
discountRatingDiv.className = 'Discount-rating';
for (let index = 0; index < data.discounts[i].rating; index++) {
    discountRatingDiv.textContent += "*";
    }
// Append the product option logo div, product option name div, product description div, price data div, and discount rating div to the discount data div
discountDataDiv.appendChild(productOptionNameDiv);
discountDataDiv.appendChild(productDescriptionDiv);
discountDataDiv.appendChild(priceDataDiv);
discountDataDiv.appendChild(discountRatingDiv);

// Append the discount data div to the list item
listItem.appendChild(productOptionLogoDiv);
listItem.appendChild(discountDataDiv);
listItem.setAttribute('data-id', data.discounts[i].id);

listItem.addEventListener('click', (event) => {
    const id1 = listItem.getAttribute('data-id');
const url = `product-page.html?id=${encodeURIComponent(id1)}`;
        window.location.href = url;
        event.preventDefault();
});
document.querySelector(".Product-Option").appendChild(listItem);

    }})
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
    });
} 
window.onload=viewDiscount;
