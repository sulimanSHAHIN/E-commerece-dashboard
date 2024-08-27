console.log("DONE");



const Search = document.querySelector('.Search-Icon');
Search.addEventListener('click', (event) => {
event.preventDefault();

const token = localStorage.getItem('token');

        const SearchValue=document.querySelector(".Search-input").value;
fetch(`http://127.0.0.1:8000/api/searchbyname/${SearchValue}`, {
    headers: {
    'token': token
    }
    })
.then(response => {
    if (response.ok) {
    return response.json();
    }
    throw new Error('Network response was not ok.');
})
.then(data => {
    // Do something with the response data
    console.log(data);
    for (let i = 0; i < data.products.length; i++) {
        // Create the main div element
const mainDiv = document.createElement('div');
mainDiv.className = 'One-result d-flex align-items-center justify-content-between';

// Create the div element for the result name
const resultNameDiv = document.createElement('div');
resultNameDiv.className = 'Result-name';
resultNameDiv.textContent = data.products[i].name;

// Create the div element for the result image
const resultImgDiv = document.createElement('div');
resultImgDiv.className = 'Resultimg';

// Create the inner div element for the image result
const imgResultDiv = document.createElement('div');
imgResultDiv.className = 'ImgResult';
imgResultDiv.style.backgroundImage = `url(${data.products[i].image})`;

// Append the inner div element to the result image div
resultImgDiv.appendChild(imgResultDiv);

// Append the result name div and result image div to the main div
mainDiv.appendChild(resultNameDiv);
mainDiv.appendChild(resultImgDiv);
mainDiv.setAttribute('data-id', data.products[i].id);

mainDiv.addEventListener('click', (event) => {
    const id1 = mainDiv.getAttribute('data-id');
const url = `product-page.html?id=${encodeURIComponent(id1)}`;
        window.location.href = url;
        event.preventDefault();
});
        document.querySelector(".Result").appendChild(mainDiv);
    }
 
}
)
.catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
});
}
);


document.querySelector(".Home").addEventListener('click',(event)=>{
    window.location.href="index.html";
});
document.querySelector(".Offers").addEventListener('click',(event)=>{
    window.location.href="discount.html";
});