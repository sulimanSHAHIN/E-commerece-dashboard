console.log("DONE");
//view product
function viewProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
console.log(id);

fetch(`http://127.0.0.1:8000/api/viewproducts/${id}`)
.then(response => {
    if (response.ok) {
    return response.json();
    }
    throw new Error('Network response was not ok.');
})
.then(data => {
    // Do something with the response data
    console.log(data);
        for (var i=0;i<data.products.length;i++)
{
    const liElement = document.createElement("li");

const deleteButton = document.createElement("div");
deleteButton.classList.add("Delete-product-button");
deleteButton.textContent = "X";
deleteButton.setAttribute('delete-id',data.products[i].id);
deleteButton.addEventListener('click', (event) => {
    const deleteId = event.currentTarget.getAttribute('delete-id'); // Get the id value from the clicked element
    console.log("deleting is");
    console.log(deleteId);
    fetch(`http://127.0.0.1:8000/api/deleteproduct/${deleteId}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
        },
    })
        .then(response => {
        if (response.ok) {
            alert('Item deleted successfully');
            setTimeout(function(){ 
    location.reload();
    }, 2000);
        } else {
            console.error('Error deleting item');
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    
    
});

const divElement1 = document.createElement("div");
divElement1.classList.add("Product-Option-Logo");
divElement1.style.backgroundImage = `url(${data.products[i].image})`;


const divElement2 = document.createElement("div");
divElement2.classList.add("Product-Option-Name");
divElement2.textContent = data.products[i].name;

const divElement3 = document.createElement("div");
divElement3.classList.add("Product-description");
divElement3.textContent =data.products[i].description;

liElement.appendChild(deleteButton);
liElement.appendChild(divElement1);
liElement.appendChild(divElement2);
liElement.appendChild(divElement3);

        liElement.setAttribute('data-id', data.products[i].id);
        liElement.setAttribute('data-name', data.products[i].name);
        liElement.setAttribute('data-image', data.products[i].image);
        liElement.setAttribute('data-description', data.products[i].description); 

        divElement2.addEventListener('click', (event) => {
                        const id1 = liElement.getAttribute('data-id');
const url = `product-page.html?id=${encodeURIComponent(id1)}`;
                            window.location.href = url;
                            event.preventDefault();
    });
    document.querySelector(".Product-Option").appendChild(liElement);
}})
.catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
});
} 
window.onload=viewProduct;

// add product
const AddProductButton = document.querySelector('.Add-product-button');
AddProductButton.addEventListener('click', (event) => {

event.preventDefault();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const description = document.querySelector('#addproductdescription').value;
const name = document.querySelector('#addproductname').value;
const name_ar = document.querySelector('#addproductnameAR').value;
const description_ar = document.querySelector('#addproductdescriptionAR').value;
const size= document.querySelector('#addproductsize').value;
const price = document.querySelector('#addproductprice').value;
const imageInput= document.querySelector('#addproductimage');

const subcatigory_id=id;

const formData = new FormData();
  formData.append('name', name);
  formData.append('name_ar', name_ar);
  formData.append('description', description);
  formData.append('description_ar', description_ar);
  formData.append('size', size);
  formData.append('price', price);
  formData.append('subcatigory_id', subcatigory_id);
  formData.append('image', imageInput.files[0]);

    fetch('http://127.0.0.1:8000/api/addproduct', {
    method: 'POST',
    headers: {
        'token' : `${localStorage.getItem('token')}`
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // ,"Accept":'application/json'
    },
    body:formData
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
      // Handle the response from the API
    if (data.message=="add product successfuly") {
        alert ("add product successfuly");
        setTimeout(function(){ 
            location.reload();
            }, 2000);
    } else {
        // Handle any errors that occur during the API request
        alert(data.message);
    }
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);
