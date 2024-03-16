let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let count = document.getElementById('count')
let submit = document.getElementById('submit');
let btnup = document.getElementById('up');


window.onscroll = function(){
    if(scrollY >600){
        btnup.style.display = 'block';
    }else{
        btnup.style.display = 'none';
    }
}
btnup.onclick = function(){
    window.scroll({
        left:0,
        top:0,
        behavior:'smooth'
    })
}

let mood = 'Create';
let tmp;
// get total price

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +tax.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}



// create new product

let products;
if(localStorage.prod != null){
    products = JSON.parse(localStorage.prod);
}
else{
    products = [];
}

submit.onclick = function(){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value.toLowerCase(),
        count:count.value
    }
    if(title.value != '' && price.value != '' && category.value != '' && count.value < 100)
    {
        if(mood === 'Create'){
            if(newProduct.count > 1){
                for (let i = 0 ; i <  newProduct.count ; i++){
                    products.push(newProduct)
                }
            }else{
                products.push(newProduct)
            }
    
        }else{
            products[tmp] = newProduct;
            mood = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            this.scroll({
                top:0,
                behavior:"smooth"
            })
        }
        clearData();
    }
    
  
    
    localStorage.setItem('prod', JSON.stringify(products))
 
    showData();
}



// clear inputs after click create
function clearData(){
    title.value = '';
    price.value = '';
    tax.value = '';
    ads.value = '';
    total.innerHTML = '';
    discount.value = '';
    count.value = '';
    category.value = '';
}


// show data in the table after create (read)


function showData(){
    getTotal();
    let table = '';
    for(let i = 0 ; i < products.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].tax}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteProduct(${i})">Delete</button></td>
        </tr>
        
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteAll');
    if(products.length > 0){
        btndelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${products.length})</button>
        
        `
    }else{
        btndelete.innerHTML='';
    }
}
showData();


// delete


function deleteProduct(i)
{
    products.splice(i,1);
    localStorage.prod = JSON.stringify(products);
    showData();

}

//delete all products
function deleteAll(){
    localStorage.clear();
    products.splice(0);
    showData();
}


// update
function updateData(i){
    title.value = products[i].title;
    price.value = products[i].price;
    tax.value = products[i].tax;
    ads.value = products[i].ads;
    discount.value= products[i].discount;
    category.value= products[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;

}
// search


let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+searchMood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){
    value = value.toLowerCase();
    let table = '';
    for(let i=0; i<products.length; i++){
        if(searchMood == 'title')
        {

                if(products[i].title.includes(value)){
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${products[i].title}</td>
                            <td>${products[i].price}</td>
                            <td>${products[i].tax}</td>
                            <td>${products[i].ads}</td>
                            <td>${products[i].discount}</td>
                            <td>${products[i].total}</td>
                            <td>${products[i].category}</td>
                            <td><button onclick="updateData(${i})">Update</button></td>
                            <td><button onclick="deleteProduct(${i})">Delete</button></td>
                        </tr>
                        
                        `

                }
            }
    else{
        
            if(products[i].category.includes(value)){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].tax}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateData(${i})">Update</button></td>
                        <td><button onclick="deleteProduct(${i})">Delete</button></td>
                    </tr>
                    
                    `

            }
        

        }
}
    document.getElementById('tbody').innerHTML = table;


}
// clean data

