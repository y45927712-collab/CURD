let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let hiMas = document.getElementById('hiMas')
let user = prompt('hi what is your name?');

if(user != null || user != ''){
    alert('hi ' + user)
    hiMas.innerHTML = "what's new " + user
}


let mood = 'create';
let tmp;
// get total


function get_total(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}


// create prodact
let datapro;

if(localStorage.prodact != null){
    datapro = JSON.parse(localStorage.prodact)
    show_data()

}else{
    datapro = [];
}


submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    
    
    //  && newpro.count < 501
    if(mood=='create' ){
        if(title.value != '' && price.value != '' && category.value != ''){
            if(newpro.count > 1 && count.value < 501){
                for(i = 0;i< newpro.count;i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }
            clear_data();
        }
    }else{
        datapro[tmp] = newpro;
        mood = 'create';
        count.style.display = 'block';
        submit.innerHTML = 'create';
        get_total()
        clear_data();
    }
    
    localStorage.setItem('prodact', JSON.stringify(datapro));
    show_data();
}


// save localstorage


// clear inputs
function clear_data(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    category.value = '';
    count.value = '';
    ads.value = '';
    total.innerHTML = '';

}
// read
function show_data(){
    let table = '';
    for(let i = 0 ;i<datapro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick = "updatedata(${i})" id="update">update</button></td>
            <td><button onclick="delete_data(${i})" id="delete">delete</button></td>
        </tr>`;

    }
    let btn_del_all = document.getElementById('deleteAll');
    document.getElementById('tbody').innerHTML = table
    if(datapro.length > 0){
        btn_del_all.innerHTML = `
        <button onclick="delete_all_data()">delete all(${datapro.length})</button>
        `;
    }else{
        btn_del_all.innerHTML = '';
    }
}


// delete
function delete_data(i) {
    datapro.splice(i,1);
    localStorage.prodact = JSON.stringify(datapro);
    show_data();
}

function delete_all_data(){
    datapro.splice(0)
    localStorage.clear()
    show_data()

}
// coun
// updat
function updatedata(i){
    tmp = i
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    scroll({
        top:0,
        behavior:'smooth',
    })
    get_total();
}


// search
let searchmood = 'title';

function getsearchmood(id){

    let search = document.getElementById('search')
    
    if(id == 'searchTitle'){
        searchmood = 'title';
        
    }else{
        searchmood = 'category';
    }
    search.focus()
    search.placeholder = 'search by ' + searchmood;
    search.value = '';
    show_data()
}

function searchdata(value){
    let table;
    for(let i = 0; i< datapro.length;i++){
        if (searchmood == 'title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                            
                            table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick = "updatedata(${i})" id="update">update</button></td>
                            <td><button onclick="delete_data(${i})" id="delete">delete</button></td>
                        </tr>`;
                        
            }
        }else{
            if(datapro[i].category.includes(value.toLowerCase())){
                            
                            table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick = "updatedata(${i})" id="update">update</button></td>
                            <td><button onclick="delete_data(${i})" id="delete">delete</button></td>
                        </tr>`;
                        
            }
        }
    }
    
    
    document.getElementById('tbody').innerHTML = table
}


show_data()
// clean data


