    console.log("DONE");
    // view sub category
    function viewSubCategory() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/viewsubcatigory/${id}`)
    .then(response => {
        if (response.ok) {
        return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // Do something with the response data
        console.log(data);
            for (var i=0;i<data.Subcatigoryes.length;i++)
    {
        const liElement = document.createElement("li");
        const divElement1 = document.createElement("div");
        divElement1.classList.add("Sub-Category-Option11", "d-flex", "w-100", "justify-content-between", "align-items-center");
        
        const divElement2 = document.createElement("div");
        divElement2.classList.add("Sub-Category-Option-Logo");
        divElement2.style.backgroundImage = `url(${data.Subcatigoryes[i].image})`;
        
        const divElement3 = document.createElement("div");
        divElement3.classList.add("Sub-Category-Option-Name");
        divElement3.textContent = data.Subcatigoryes[i].name;
        
        divElement1.appendChild(divElement2);
        divElement1.appendChild(divElement3);
        
        const deleteButton = document.createElement("div");
        deleteButton.classList.add("Delete-sub-category-button");
        deleteButton.textContent = "X";
        deleteButton.setAttribute('delete-id',data.Subcatigoryes[i].id);
        deleteButton.addEventListener('click', (event) => {
            const deleteId = event.currentTarget.getAttribute('delete-id'); // Get the id value from the clicked element
            console.log("deleting is");
            console.log(deleteId);
            fetch(`http://127.0.0.1:8000/api/deletesubcatigory/${deleteId}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
                },
            })
                .then(response => {
                if (response.ok) {
                    // alert('Item deleted successfully');
                    swal("Subcatigory deleted successfuly")
                    .then((value) => {
                       
                    });
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

        
        liElement.appendChild(divElement1);
        liElement.appendChild(deleteButton);
    liElement.setAttribute('data-image', data.Subcatigoryes[i].image); // Set the data-image attribute to the id value
    liElement.setAttribute('data-name', data.Subcatigoryes[i].name); // Set the data-name attribute to the id value
    liElement.setAttribute('data-id', data.Subcatigoryes[i].id); // Set the data-id attribute to the id value

    divElement3.addEventListener('click', (event) => {
            const id1 = liElement.getAttribute('data-id'); // Get the id value from the clicked element
            const name1 = liElement.getAttribute('data-name'); // Get the name value from the clicked element
            const url = `product.html?name=${encodeURIComponent(name1)}&id=${encodeURIComponent(id1)}`;
            window.location.href = url;
                event.preventDefault();
            });
    document.querySelector(".Sub-Category-Option").appendChild(liElement);

    }})
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
    });
} 

//view choose subcategory
function viewSubCategory1() {
    const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
    console.log(id);
    const token = localStorage.getItem('token');
fetch(`http://127.0.0.1:8000/api/viewsubcatigory/${id}`, {
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
        for (var i=0;i<=data.Subcatigoryes.length;i++)
{
    const option = document.createElement("option");
    option.value =data.Subcatigoryes[i].id;
    option.textContent = data.Subcatigoryes[i].name;
    
document.querySelector(".Choose-sub-cat").appendChild(option);

}})
.catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
});
} 

//calling the view function
window.onload=function () {
    viewSubCategory1();
    viewSubCategory();
};

// add sub category
const AddSubCategoryButton = document.querySelector('.Add-sub-category-button');

AddSubCategoryButton.addEventListener('click', (event) => {

event.preventDefault();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const imageInput  = document.querySelector('#addSubCategoryImage');
const name = document.querySelector('#addSubCategoryName').value;
const name_ar = document.querySelector('#addSubCategoryNameAR').value;
const catigory_id= id;
      
const formData = new FormData();
formData.append('name', name);
formData.append('name_ar', name_ar);
formData.append('catigory_id', catigory_id);
formData.append('image', imageInput.files[0]);

    fetch('http://127.0.0.1:8000/api/addsubcatigory', {
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
    if (data.message=="Subcatigory added successfuly") {
        alert ("subcatigory added successfuly");
        swal("subcatigory added successfuly")
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

//edit sub category

const EditSubCategoryButton = document.querySelector('.Edit-sub-category-button');

EditSubCategoryButton.addEventListener('click', (event) => {

event.preventDefault();
const imageInput = document.querySelector('#editSubCategoryimage');
const name_ar = document.querySelector('#editSubCategorynameAR').value;
const name = document.querySelector('#editSubCategoryname').value;

const formData = new FormData();
formData.append('name', name);
formData.append('name_ar', name_ar);
formData.append('image', imageInput.files[0]);

    let id=document.querySelector(".Choose-sub-cat").value;
    
    fetch(`http://127.0.0.1:8000/api/editsubcatigory/${id}`, {
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
    if (data.message=="Subcatigory updated successfuly") {
        alert ("Subcatigory updated successfuly");
        swal("Subcatigory updated successfuly")
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
