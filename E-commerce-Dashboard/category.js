console.log("DONE");

// view category
function viewcatigory() {
        const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/viewcatigory`, {
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
            for (var i=0;i<data.Catigoryes.length;i++)
    {
        
        const liElement = document.createElement("li");
        
        liElement.setAttribute('data-image', data.Catigoryes[i].image); // Set the data-id attribute to the id value
        liElement.setAttribute('data-name', data.Catigoryes[i].name); // Set the data-id attribute to the id value
        liElement.setAttribute('data-id', data.Catigoryes[i].id); // Set the data-id attribute to the id value
        
        const divElement1 = document.createElement("div");
        divElement1.classList.add("Category-Option11", "d-flex", "w-100", "justify-content-between", "align-items-center");
        
        const divElement2 = document.createElement("div");
        divElement2.classList.add("Category-Option-Logo");
        divElement2.style.backgroundImage = `url(${data.Catigoryes[i].image})`;
        
        const divElement3 = document.createElement("div");
        divElement3.classList.add("Category-Option-Name");
        divElement3.textContent = data.Catigoryes[i].name;
        
        divElement1.appendChild(divElement2);
        divElement1.appendChild(divElement3);
        
        const deleteButton = document.createElement("div");
        deleteButton.classList.add("Delete-category-button");
        deleteButton.textContent = "X";
        deleteButton.setAttribute('delete-id',data.Catigoryes[i].id);


            deleteButton.addEventListener('click', (event) => {
                const deleteId = event.currentTarget.getAttribute('delete-id'); // Get the id value from the clicked element
                console.log("deleting is");
                console.log(deleteId);
                fetch(`http://127.0.0.1:8000/api/deletecatigory/${deleteId}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                    },
                })
                    .then(response => {
                    if (response.ok) {
                        // alert('Item deleted successfully');
                        swal("catigory deleted successfuly")
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
        
        divElement3.addEventListener('click', (event) => {
            const id1 = liElement.getAttribute('data-id'); // Get the id value from the clicked element
            const name1 = liElement.getAttribute('data-name'); // Get the id value from the clicked element
            const url = `sub-category.html?name=${encodeURIComponent(name1)}&id=${encodeURIComponent(id1)}`;
            window.location.href = url;
            // event.preventDefault();
        });
        
        document.querySelector(".Category-Option").appendChild(liElement);
    }
}
)
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
    });
} 

//view choose category
function viewCategory1() {

    const token = localStorage.getItem('token');
 fetch(`http://127.0.0.1:8000/api/viewcatigory`, {
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
        for (var i=0;i<=data.Catigoryes.length;i++)
 {
    const option = document.createElement("option");
    option.value =data.Catigoryes[i].id;
    option.textContent = data.Catigoryes[i].name;
    
document.querySelector(".Choose-cat").appendChild(option);

}})
.catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
});
} 

//calling the view function
window.onload=function () {
    viewCategory1();
    viewcatigory();
};

// add category

const AddCategoryButton = document.querySelector('.Add-category-button');
AddCategoryButton.addEventListener('click', (event) => {

event.preventDefault();

const name = document.querySelector('#addCategoryName').value;
const imageInput  = document.querySelector('#addCategoryImage');
const name_ar = document.querySelector('#addCategoryNameAR').value;
   
const formData = new FormData();
  formData.append('name', name);
  formData.append('name_ar', name_ar);
  formData.append('image', imageInput.files[0]);


    fetch('http://127.0.0.1:8000/api/addcatigory', {
        method: 'POST',
        body:formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      // Handle the response from the API
    if (data.message=="catigory added successfuly") {
        // alert ("catigory added successfuly");
        swal("catigory added successfuly")
            .then((value) => {
                
            });
        setTimeout(function(){ 
            location.reload();
            }, 2000);
    } else {
        // Handle any errors that occur during the API request
        // alert(data.message);
        alert("no adding");
    }
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);

//edit category

const EditCategoryButton = document.querySelector('.Edit-category-button');
EditCategoryButton.addEventListener('click', (event) => {
event.preventDefault();
const name = document.querySelector('#editCategoryName').value;
const name_ar = document.querySelector('#editCategoryNameAR').value;
const imageInput = document.querySelector('#editCategoryImage');
const formData = new FormData();
formData.append('name', name);
formData.append('name_ar', name_ar);
formData.append('image', imageInput.files[0]);
    let id=document.querySelector(".Choose-cat").value;
    fetch(`http://127.0.0.1:8000/api/editcatigory/${id}`, {
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
    if (data.message=="catigory updated successfuly") {
        // alert ("catigory updated successfuly");
        swal("catigory updated successfuly")
        .then((value) => {
        });
        setTimeout(function(){ 
            location.reload();
            },2000);                                                               
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

