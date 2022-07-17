const product_section = document.getElementById("product-section");
const cartBtn = document.getElementById("cart");
const cart_table = document.getElementById("cart-table");
const grand_total = document.getElementById("grand-total");

cartBtn.addEventListener("click",renderCart);

fetch("https://fakestoreapi.com/products?limit=10")
  .then((res) => res.json())
  .then((data) => {
    addProduct(data);
  });

function addProduct(arr) {
  for (let i = 0; i < arr.length; i++) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let product_name = document.createElement("span");
    let product_price = document.createElement("span");
    let cartbtn = document.createElement("button");

    div.classList.add("card");
    img.classList.add("product_img");
    product_name.setAttribute("id", `product_name_${i}`);
    product_price.setAttribute("id", `product_price_${i}`);
    cartbtn.setAttribute("id", `cartbtn_${i}`);
    product_name.classList.add("product_name");
    product_price.classList.add("product_price");
    cartbtn.classList.add("cartbtn");

    img.src = arr[i].image;
    product_name.innerHTML = arr[i].title.slice(0, 10);
    product_price.innerHTML = arr[i].price + " ₹";
    cartbtn.innerHTML = "Add To Cart";

    div.appendChild(img);
    div.appendChild(product_name);
    div.appendChild(product_price);
    div.appendChild(cartbtn);
    product_section.appendChild(div);
  }
  addEvent(arr);
}

function addEvent(arr) {
  for (var i = 0; i < arr.length; i++) {
    document.getElementsByClassName("cartbtn")[i].addEventListener("click", (e) => {
      const id = e.target.id.slice(-1);
      const product_name = document
        .getElementById(`product_name_${id}`)
        .innerHTML.slice(0, -2);
      const product_price = document
        .getElementById(`product_price_${id}`)
        .innerHTML.slice(0, -2);
      qty = 0;
      qtySet = false;
      cart = checklocalStorage();
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name == product_name && cart[i].price == product_price) {
          cart[i].qty += 1;
          qtySet = true;
          setLocalStorage("cart", cart);
          break;
        }
      }
      if (!qtySet) {
        const data = {
          name: product_name,
          price: product_price,
          qty: 1
        };
        cart.push(data);
        setLocalStorage("cart", cart);
      }
    });
  }
}


function renderCart(){
    const products = getLocalStorage("cart");
    
    if(products.length > 0){
        var total = 0
        var grandTotal = 0
        cart_table.innerHTML = "";

        for(let i = 0; i < 6; i++) {
            window["th" + (i+1)] = document.createElement("th");
        }

        tr = document.createElement("tr");
        th1.innerHTML = "Sr No"
        th2.innerHTML = "Name"
        th3.innerHTML = "Price"
        th4.innerHTML = "Qty"
        th5.innerHTML = "Total" 
        th6.innerHTML = "Delete" 
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        cart_table.appendChild(tr);

        for(let i = 0; i < products.length; i++){
            tr = document.createElement("tr");
        
            for(let i = 0; i < 6; i++) {
                window["td" + (i+1)] = document.createElement("td");
            }
        
            td1.innerHTML = i+1;
            td2.innerHTML = products[i].name;
            td3.innerHTML = products[i].price;
            td4.innerHTML = `<input type="text" id="qty${i}" class="qty-box" value="${products[i].qty}">`;
            total = parseInt(products[i].price) * parseInt(products[i].qty) ;
            grandTotal += total;
            td5.innerHTML = total ;
            td6.innerHTML = `<i class='bx bx-trash bx-sm' id='delete${i}' style='color:#fc0909'></i>`;
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            
            cart_table.appendChild(tr);
        }
        grand_total.innerHTML = "Grand Total: " + grandTotal;
    }
    addDeleteEvent(products.length)
}

function addDeleteEvent(len) {
    for(let i = 0; i < len; i++){
        document.getElementsByClassName('bx')[i].addEventListener("click",(e)=>{
            let cartt = getLocalStorage("cart");
            cartt.splice(e.target.id.slice(-1), 1);
            setLocalStorage("cart", cartt);
            renderCart();
        })
    }
}


function saveChanges(){
    const cart = getLocalStorage("cart");
    for(let i= 0; i < cart.length; i++) {
        let inputData = document.getElementById(`qty${i}`).value;
        cart[i].qty = parseInt(inputData);
    }
    setLocalStorage("cart", cart);
}


function checklocalStorage() {
    if (localStorage.getItem("cart") === null) {
        cart = [];
        setLocalStorage("cart", cart);
    } else {
        cart = getLocalStorage("cart");
    }
    return cart;
}

function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

function setLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}
