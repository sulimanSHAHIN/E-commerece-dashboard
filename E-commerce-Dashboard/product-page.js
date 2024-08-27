console.log("DONE");
let counter=0;
let CommentArrow=document.querySelector(".Comment-button-arrow");
//controling display in comments
CommentArrow.addEventListener('click', (event) => {
    if (counter%2==0) {
        document.querySelector(".Comments").style.display="block";
    counter=1;
    }
    else{
        document.querySelector(".Comments").style.display="none";
        counter=0;
    }
    }
    );

//view product info
function productInfo() {

    const token = localStorage.getItem('token');
    
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

 fetch(`http://127.0.0.1:8000/api/productinfo/${id}`, {
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
    document.querySelector(".Product-Real-name").innerHTML=data.product[0].name;
    document.querySelector(".Description").innerHTML=data.product[0].description;
    document.querySelector(".Size-value").innerHTML=data.product[0].size;
    document.querySelector(".Price-value").innerHTML=data.product[0].price;
    document.querySelector(".Discount-value").innerHTML=data.product[0].discount;
    document.querySelector(".abrakadabra").style.backgroundImage = `url(${data.product[0].image})`;
    for (let index = 0; index < data.product[0].rating; index++) {
        document.querySelector(".Rate").textContent += "*";
        }
        for (let index = 0; index < data.attribute.length; index++)
        {
// Create the main div element
const mainDiv = document.createElement('div');
mainDiv.className = 'Attribute-info d-flex justify-content-between w-100';

// Create the first div element for color
const colorDiv = document.createElement('div');
colorDiv.className = 'Prodcuct-color Attribute d-flex justify-content-between';

// Create the first inner div element for color
const colorWordDiv = document.createElement('div');
colorWordDiv.className = 'Color-word Word';
colorWordDiv.textContent = 'Color:';

// Create the second inner div element for color
const colorValueDiv = document.createElement('div');
colorValueDiv.className = 'Color-value Value';
colorValueDiv.textContent = data.attribute[index].color;

// Append the inner div elements to the color div
colorDiv.appendChild(colorWordDiv);
colorDiv.appendChild(colorValueDiv);

// Create the second div element for quantity
const quantityDiv = document.createElement('div');
quantityDiv.className = 'Prodcuct-quantity Attribute d-flex justify-content-between';

// Create the first inner div element for quantity
const quantityWordDiv = document.createElement('div');
quantityWordDiv.className = 'Quantity-word Word';
quantityWordDiv.textContent = 'Quantity:';

// Create the second inner div element for quantity
const quantityValueDiv = document.createElement('div');
quantityValueDiv.className = 'Quantity-value Value';
quantityValueDiv.textContent = data.attribute[index].quaintity;

// Append the inner div elements to the quantity div
quantityDiv.appendChild(quantityWordDiv);
quantityDiv.appendChild(quantityValueDiv);

// Append the color and quantity divs to the main div
mainDiv.appendChild(colorDiv);
mainDiv.appendChild(quantityDiv);

// Create the end stick div
const endStickDiv = document.createElement('div');
endStickDiv.className = 'Attribute-end-stick mb-3';

document.querySelector(".Product-attribute").appendChild(mainDiv); 
document.querySelector(".Product-attribute").appendChild(endStickDiv); 
}
for (var i=0;i<=data.attribute.length;i++)
{
   const option = document.createElement("option");
   option.value =data.attribute[i].id;
   option.textContent = data.attribute[i].color;
   
document.querySelector(".Choose-color").appendChild(option);

}
})
.catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
});
} 


//calling the view function
window.onload=function () {
    viewComment();
    productInfo();
};

    // edit product
    const EditProductButton = document.querySelector('.Edit-product-button');
EditProductButton.addEventListener('click', (event) => {

event.preventDefault();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const name = document.querySelector('#editproductname').value;
const name_ar = document.querySelector('#editproductnameAR').value;
const description = document.querySelector('#editproductdescription').value;
const description_ar = document.querySelector('#editproductdescriptionAR').value;
const size = document.querySelector('#editproductsize').value;
const price = document.querySelector('#editproductprice').value;
const imageInput = document.querySelector('#editproductimage');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('name_ar', name_ar);
        formData.append('description', description);
        formData.append('description_ar', description_ar);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('image', imageInput.files[0]);

    fetch(`http://127.0.0.1:8000/api/editproduct/${id}`, {
    method: 'POST',
    headers: {
        'token' : `${localStorage.getItem('token')}`
    },
    body: formData
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
      // Handle the response from the API
    if (data.message=="Product updated successfuly") {
        // alert ("Product updated successfuly");
        swal("Product updated successfuly")
        .then((value) => {
            
        });
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

    // add attribute
    const AddAttriubteButton = document.querySelector('.Add-attriubte-button');
    AddAttriubteButton.addEventListener('click', (event) => {

event.preventDefault();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const color = document.querySelector('#addattributecolor').value;
const quantity = document.querySelector('#addattributequantity').value;
const product_id=id;
const formData = new FormData();
formData.append('color', color);
formData.append('quaintity', quantity);
formData.append('product_id', product_id);
    fetch(`http://127.0.0.1:8000/api/addattribute`, {
    method: 'POST',
    headers: {
        'token' : `${localStorage.getItem('token')}`
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // ,"Accept":'application/json'
    },
    body: formData
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
      // Handle the response from the API
    if (data.status=="success") {
        // alert ("add Attribute successfuly");
        swal("attribute added successfuly")
        .then((value) => {
           
        });
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

    // edit attribute
    const EditAttriubteButton = document.querySelector('.Edit-attriubte-button');
    EditAttriubteButton.addEventListener('click', (event) => {

event.preventDefault();

const quantity = document.querySelector('#editattributequantity').value;
const formData = new FormData();
formData.append('quaintity', quantity);
const id =document.querySelector(".Choose-color").value;
    fetch(`http://127.0.0.1:8000/api/editattribute/${id}`, {
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
    if (data.status== "success") {
        alert ("Attribute updated successfuly");
        swal("Attribute updated successfuly")
        .then((value) => {
           
        });
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

// add discount
const AddDiscount = document.querySelector('.Add-discount');

AddDiscount.addEventListener('click', (event) => {

event.preventDefault();
const discount = document.querySelector('#discount').value;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const formData = new FormData();
formData.append('discount', discount);
    fetch(`http://127.0.0.1:8000/api/discount/${id}`, {
    method: 'POST',
    headers: {
        'token' : `${localStorage.getItem('token')}`
    },
    body: formData
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
      // Handle the response from the API
    if (data.message=="add discount successfuly") {
        alert("add discount successfuly");
        swal("Discount added successfuly")
        .then((value) => {
           
        });
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

   // view comment
   function viewComment() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
console.log(id);
fetch(`http://127.0.0.1:8000/api/viewcomments/${id}`)
.then(response => {
    if (response.ok) {
    return response.json();
}
throw new Error('Network response was not ok.');
})
.then(data => {
    // Do something with the response data
    console.log(data);
    console.log(data.comments.length);
    
    document.querySelector(".Nomofcomment").textContent=data.comments.length;
for (let index = 0; index < data.comments.length; index++)
{
    // Create the list item element
const listItem = document.createElement('li');

// Create the div element for the user name
const userNameDiv = document.createElement('div');
userNameDiv.className = 'UserNameC';
userNameDiv.textContent = data.comments[index].name;

// Create the div element for the comment
const commentDiv = document.createElement('div');
commentDiv.className = 'CommentC';
commentDiv.textContent = data.comments[index].comment;

// Append the user name div and comment div to the list item
listItem.appendChild(userNameDiv);
listItem.appendChild(commentDiv);

document.querySelector(".Comments").appendChild(listItem);
}
})
.catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
});
} 
