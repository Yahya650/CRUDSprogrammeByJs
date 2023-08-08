let inputTitle = document.getElementById("Title");
let inputPrice = document.getElementById("Price");
let inputTaxes = document.getElementById("Taxes");
let inputAds = document.getElementById("ads");
let inputDiscount = document.getElementById("discount");
let inputTotal = document.getElementById("Total");
let inputCount = document.getElementById("Count");
let inputCategory = document.getElementById("Category");
let Btn_creat = document.getElementById("btn_creat");
let inputSearch = document.getElementById("Search");
let searchBy_title = document.getElementById("searchBy_title");
let searchBy_category = document.getElementById("searchBy_category");
let btn_DeleteAll = document.getElementById("deleteAll");
let span_numberProduct = document.getElementById("number_product");
let Table_body = document.getElementById("Table_body");
let divTotal = document.getElementById("divTotal");
let btn_update = document.getElementById("btn_update");
let searchBy_total = document.getElementById("searchBy_total");

if (localStorage.getItem("arrayProduct") !== null) {
  span_numberProduct.innerText = JSON.parse(localStorage.arrayProduct).length;
  for (let on = 0; on < JSON.parse(localStorage.arrayProduct).length; on++) {
    Table_body.innerHTML += `<tr>
                <td>${on + 1}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].title}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].price}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].taxes}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].ads}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].discount}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].total}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].Category}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].deleteItem}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].updateItem}</td>
              </tr>`;
  }
}

function Func_Creat() {
  if (/^[a-zA-Z0-9]+$/.test(inputTitle.value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(inputPrice.value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(inputTaxes.value) && /^([0-9]+(\.[0-9]{1,2}))*?$/.test(inputAds.value) && /^([0-9]+(\.[0-9]{1,2}))*?$/.test(inputDiscount.value) && /^[0-9]*$/.test(inputCount.value) && /^[a-zA-Z]+$/.test(inputCategory.value)) {
  divTotal.style.cssText = `
  background-color: red;
  display:flex;
`;
  // Retrieve the existing array from localStorage or initialize an empty array
  let existingArray = JSON.parse(localStorage.getItem("arrayProduct")) || [];
  let index = existingArray.length;
  if (parseInt(inputCount.value) >= 0) {
    for (let i = 0; i < inputCount.value; i++) {
      // Define the new array to be added to the existing array
      const newArray = {
        id: index,
        title: inputTitle.value,
        price: inputPrice.value,
        taxes: inputTaxes.value,
        ads: inputAds.value,
        discount: inputDiscount.value,
        total: inputTotal.value,
        Category: inputCategory.value,
        deleteItem: `<button id="deleteItem" onclick='deletItem(${index})' class="deleteItem rounded-pill px-2 py-1">Delete</button>`,
        updateItem: `<button id="updateItem" onclick='updatItem(${index})' class="updateItem rounded-pill px-2 py-1">Update</button>`,
      };
      
      index++
      // Create a new array that combines the old and new arrays
      existingArray = [...existingArray, newArray];

      // Store the new array in localStorage
      localStorage.setItem("arrayProduct", JSON.stringify(existingArray));
    }
  } else {
    // Define the new array to be added to the existing array
    const newArray = {
      id: index,
      title: inputTitle.value,
      price: inputPrice.value,
      taxes: inputTaxes.value,
      ads: inputAds.value,
      discount: inputDiscount.value,
      total: inputTotal.value,
      Category: inputCategory.value,
      deleteItem: `<button id="deleteItem" onclick='deletItem(${index})' class="deleteItem rounded-pill px-2 py-1">Delete</button>`,
      updateItem: `<button id="updateItem" onclick='updatItem(${index})' class="updateItem rounded-pill px-2 py-1">Update</button>`,
    };
    
    index++
    // Create a new array that combines the old and new arrays
    existingArray = [...existingArray, newArray];

    // Store the new array in localStorage
    localStorage.setItem("arrayProduct", JSON.stringify(existingArray));
  }

  // Add the new row to the table body
  Table_body.innerHTML = "";
  let len = JSON.parse(localStorage.arrayProduct).length;
  existingArray = JSON.parse(localStorage.getItem("arrayProduct")) || [];
  for (let on = 0; on < len; on++) {
    Table_body.innerHTML += `<tr>

              <td>${on + 1}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].title}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].price}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].taxes}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].ads}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].discount}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].total}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].Category}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].deleteItem}</td>
              <td>${JSON.parse(localStorage.arrayProduct)[on].updateItem}</td>
            </tr>`;
  }

  inputTitle.value = null;
  inputPrice.value = null;
  inputTaxes.value = null;
  inputAds.value = null;
  inputDiscount.value = null;
  inputCount.value = null;
  inputCategory.value = null;
  inputTotal.value = 0;
  span_numberProduct.innerText = JSON.parse(localStorage.arrayProduct).length;
  document.getElementById('msgError').innerHTML = ""
} else {
  document.getElementById('msgError').innerHTML = `<div class="my-3 col-6 alert alert-danger alert-dismissible fade show" role="alert">
  <b class="text text-danger">make sure you type good data.</b>
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`
}
}

btn_DeleteAll.onclick = () => {
  // clear array
  existingArray = [];

  // and stock it in local storage
  localStorage.setItem("arrayProduct", JSON.stringify(existingArray));

  // set 0 in numberProduct
  span_numberProduct.innerText = JSON.parse(localStorage.arrayProduct).length;

  // clear teble body
  Table_body.innerHTML = "";
};

inputDiscount.onkeyup = () => {
  let ads = Number(inputAds.value) || 0;
  let discount = Number(inputDiscount.value);
  inputTotal.value =
    inputPrice.value != "" && inputTaxes.value != ""
      ? +inputPrice.value +
        (+inputPrice.value * +inputTaxes.value) / 100 +
        ads -
        discount
      : 0;
  inputPrice.value != "" && inputTaxes.value != ""
    ? (divTotal.style.cssText = `
  background-color: green !important;
  display:flex;
  


  `)
    : null;

  if (inputPrice.value == "" || inputTaxes.value == "") {
    divTotal.style.cssText = `
  background-color: red !important;
  display:flex;
  
  `;
  }

  if (
    inputPrice.value == "" &&
    inputTaxes.value == "" &&
    inputDiscount.value == "" &&
    inputAds.value == ""
  ) {
    divTotal.style.cssText = `
      background-color: red;
      display:flex;
  `;
    divTotal.classList.add(
      "fit-content text-center m-2 col-2 bg-danger rounded-pill bg-opacity-50"
    );
  }
};

inputTaxes.onkeyup = () => {
  let ads = Number(inputAds.value) || 0;
  let discount = Number(inputDiscount.value) || 0;
  inputTotal.value =
    inputPrice.value != "" && inputTaxes.value != ""
      ? +inputPrice.value +
        (+inputPrice.value * +inputTaxes.value) / 100 +
        ads -
        discount
      : 0;
  inputPrice.value != "" && inputTaxes.value != ""
    ? (divTotal.style.cssText = `
  background-color: green !important;
  display:flex;
  


  `)
    : null;

  if (inputPrice.value == "" || inputTaxes.value == "") {
    divTotal.style.cssText = `
  background-color: red !important;
  display:flex;
  
  `;
  }

  if (
    inputPrice.value == "" &&
    inputTaxes.value == "" &&
    inputDiscount.value == "" &&
    inputAds.value == ""
  ) {
    divTotal.style.cssText = `
      background-color: red;
      display:flex;
  `;
    divTotal.classList.add(
      "fit-content text-center m-2 col-2 bg-danger rounded-pill bg-opacity-50"
    );
  }
};
inputAds.onkeyup = () => {
  let ads = Number(inputAds.value);
  let discount = Number(inputDiscount.value) || 0;
  inputTotal.value =
    inputPrice.value != "" && inputTaxes.value != ""
      ? +inputPrice.value +
        (+inputPrice.value * +inputTaxes.value) / 100 +
        ads -
        discount
      : 0;
  inputPrice.value != "" && inputTaxes.value != ""
    ? (divTotal.style.cssText = `
  background-color: green !important;
  display:flex;
  


  `)
    : null;

  if (inputPrice.value == "" || inputTaxes.value == "") {
    divTotal.style.cssText = `
  background-color: red !important;
  display:flex;
  
  `;
  }

  if (
    inputPrice.value == "" &&
    inputTaxes.value == "" &&
    inputDiscount.value == "" &&
    inputAds.value == ""
  ) {
    divTotal.style.cssText = `
      background-color: red;
      display:flex;
  `;
    divTotal.classList.add(
      "fit-content text-center m-2 col-2 bg-danger rounded-pill bg-opacity-50"
    );
  }
};

inputPrice.onkeyup = () => {
  let ads = Number(inputAds.value) || 0;
  let discount = Number(inputDiscount.value) || 0;
  inputTotal.value =
    inputPrice.value != "" && inputTaxes.value != ""
      ? +inputPrice.value +
        (+inputPrice.value * +inputTaxes.value) / 100 +
        ads -
        discount
      : 0;
  inputPrice.value != "" && inputTaxes.value != ""
    ? (divTotal.style.cssText = `
  background-color: green !important;
  display:flex;
  


  `)
    : null;

  if (inputPrice.value == "" || inputTaxes.value == "") {
    divTotal.style.cssText = `
  background-color: red !important;
  display:flex;
  
  `;
  }

  if (
    inputPrice.value == "" &&
    inputTaxes.value == "" &&
    inputDiscount.value == "" &&
    inputAds.value == ""
  ) {
    divTotal.style.cssText = `
      background-color: red;
      display:flex;
  `;
    divTotal.classList.add(
      "fit-content text-center m-2 col-2 bg-danger rounded-pill bg-opacity-50"
    );
  }
};

searchBy_category.onclick = () => {
  Table_body.innerHTML = "";

  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("arrayProduct")).length;
    i++
  ) {
    Table_body.innerHTML += `<tr>
    <td>${i + 1}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].title}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].price}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].taxes}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].ads}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].discount}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].total}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].Category}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].deleteItem}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].updateItem}</td>
        </tr>`;
  }
  inputSearch.type = "text";
  inputSearch.focus();

  inputSearch.value = null;
  inputSearch.placeholder = "Search By Caterogy";
  inputSearch.onkeyup = () => {
    Table_body.innerHTML = ``;
    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem("arrayProduct")).length;
      i++
    ) {
      if (
        JSON.parse(localStorage.getItem("arrayProduct"))
          [i].Category.toUpperCase()
          .startsWith(inputSearch.value.toUpperCase())
      ) {
        Table_body.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].title}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].price}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].taxes}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].ads}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].discount}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].total}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].Category}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].deleteItem}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].updateItem}</td>
      </tr>`;
      }
    }
  };
};

searchBy_title.onclick = () => {
  Table_body.innerHTML = "";
  inputSearch.value = null;
  inputSearch.focus();
  inputSearch.type = "text";
  inputSearch.placeholder = "Search By Title";
  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("arrayProduct")).length;
    i++
  ) {
    Table_body.innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].title}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].price}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].taxes}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].ads}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].discount}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].total}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].Category}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].deleteItem}</td>
      <td>${JSON.parse(localStorage.arrayProduct)[i].updateItem}</td>
    </tr>`;
  }

  inputSearch.onkeyup = () => {
    Table_body.innerHTML = ``;
    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem("arrayProduct")).length;
      i++
    ) {
      if (
        JSON.parse(localStorage.getItem("arrayProduct"))
          [i].title.toUpperCase()
          .startsWith(inputSearch.value.toUpperCase())
      ) {
        Table_body.innerHTML += `<tr>
          <td>${i + 1}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].title}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].price}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].taxes}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].ads}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].discount}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].total}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].Category}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].deleteItem}</td>
          <td>${JSON.parse(localStorage.arrayProduct)[i].updateItem}</td>
        </tr>`;
      }
    }
  };
};

searchBy_total.onclick = () => {
  Table_body.innerHTML = "";

  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("arrayProduct")).length;
    i++
  ) {
    Table_body.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].title}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].price}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].taxes}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].ads}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].discount}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].total}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].Category}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].deleteItem}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].updateItem}</td>
      </tr>`;
  }
  inputSearch.type = "number";
  inputSearch.focus();
  inputSearch.value = null;
  inputSearch.placeholder = "Search By total";
  inputSearch.onkeyup = () => {
    Table_body.innerHTML = ``;
    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem("arrayProduct")).length;
      i++
    ) {
      if (
        JSON.parse(localStorage.getItem("arrayProduct"))[i].total.startsWith(
          inputSearch.value
        )
      ) {
        Table_body.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].title}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].price}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].taxes}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].ads}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].discount}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].total}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].Category}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].deleteItem}</td>
        <td>${JSON.parse(localStorage.arrayProduct)[i].updateItem}</td>
      </tr>`;
      }
    }
  };
};

function deletItem(a) {
  // Extract the array from local storage
  const arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));

  // Remove one element from the array at index `a`
  arrayProduct.splice(a, 1);

  // Save the modified array back to local storage
  localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct));

  // Extract the array from local storage
  // const arrayProduct1 = JSON.parse(localStorage.getItem('arrayProduct'));

  // Remove one element from the array at index `a`
  let arrayProduct1 = [];
  for (
    let x = 0;
    x < JSON.parse(localStorage.getItem("arrayProduct")).length;
    x++
  ) {
    arrayProduct1.push({
      id: x,
      title: JSON.parse(localStorage.arrayProduct)[x].title,
      price: JSON.parse(localStorage.arrayProduct)[x].price,
      taxes: JSON.parse(localStorage.arrayProduct)[x].taxes,
      ads: JSON.parse(localStorage.arrayProduct)[x].ads,
      discount: JSON.parse(localStorage.arrayProduct)[x].discount,
      total: JSON.parse(localStorage.arrayProduct)[x].total,
      Category: JSON.parse(localStorage.arrayProduct)[x].Category,
      deleteItem: `<button id="deleteItem" onclick='deletItem(${x})' class="deleteItem rounded-pill px-2 py-1">Delete</button>`,
      updateItem: `<button id="updateItem" onclick='updatItem(${x})' class="updateItem rounded-pill px-2 py-1">Update</button>`,
    });
  }

  // Save the modified array back to local storage
  localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct1));
  Table_body.innerHTML = "";
  for (let on = 0; on < JSON.parse(localStorage.arrayProduct).length; on++) {
    Table_body.innerHTML += `<tr>
                <td>${on + 1}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].title}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].price}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].taxes}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].ads}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].discount}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].total}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].Category}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].deleteItem}</td>
                <td>${JSON.parse(localStorage.arrayProduct)[on].updateItem}</td>
              </tr>`;
  }

  span_numberProduct.innerText = JSON.parse(localStorage.arrayProduct).length;
}

function updatItem(a) {
  inputSearch.disabled = true;
  btn_DeleteAll.style.cssText = `
  background-color: #2a066885;
  `;
  btn_DeleteAll.disabled = true;

  searchBy_category.style.cssText = `
  background-color: #2a066885;
  `;
  searchBy_category.disabled = true;

  searchBy_title.style.cssText = `
  background-color: #2a066885;
  `;
  searchBy_total.disabled = true;
  searchBy_total.style.cssText = `
  background-color: #2a066885;
  `;
  searchBy_total.disabled = true;

  for (let i = 0; i < document.querySelectorAll(".deleteItem").length; i++) {
    document.querySelectorAll(".deleteItem")[
      i
    ].style.cssText = `  background-color: #2a066885`;
    document.querySelectorAll(".deleteItem")[i].disabled = true;
  }

  Btn_creat.style.display = "none";
  btn_update.style.cssText = `display:block !important;`;

  inputTitle.value = null;
  inputPrice.value = null;
  inputTaxes.value = null;
  inputAds.value = null;
  inputDiscount.value = null;
  inputCategory.value = null;
  inputCount.style.cssText = `
  
  background-color: transparent;
  color: transparent;

  
  `;
  inputCount.disabled = true;
  inputCategory.value = null;
  console.log(JSON.parse(localStorage.arrayProduct)[0].title);
  inputTitle.value = JSON.parse(localStorage.arrayProduct)[a].title;
  inputPrice.value = JSON.parse(localStorage.arrayProduct)[a].price;
  inputTaxes.value = JSON.parse(localStorage.arrayProduct)[a].taxes;
  inputAds.value = JSON.parse(localStorage.arrayProduct)[a].ads;
  inputDiscount.value = JSON.parse(localStorage.arrayProduct)[a].discount;
  inputTotal.value = JSON.parse(localStorage.arrayProduct)[a].total;
  inputCategory.value = JSON.parse(localStorage.arrayProduct)[a].Category;
  if (inputTotal.value > 0) {
    divTotal.style.cssText = `
background-color: green !important;
display:flex;



`;
  } else {
    divTotal.style.cssText = `
background-color: green ;
display:flex;`;
  }

  btn_update.onclick = () => {
    if (/^[a-zA-Z0-9]+$/.test(inputTitle.value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(inputPrice.value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(inputTaxes.value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(inputAds.value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(inputDiscount.value) && /^[0-9]*$/.test(inputCount.value) && /^[a-zA-Z]+$/.test(inputCategory.value)) {
      const arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
      console.log(a);
      arrayProduct[a] = {
        id: a,
        title: inputTitle.value,
        price: inputPrice.value,
        taxes: inputTaxes.value,
        ads: inputAds.value,
        discount: inputDiscount.value,
        total: inputTotal.value,
        Category: inputCategory.value,
        deleteItem: `<button id="deleteItem" onclick='deletItem(${a})' class="deleteItem rounded-pill px-2 py-1">Delete</button>`,
        updateItem: `<button id="updateItem" onclick='updatItem(${a})' class="updateItem rounded-pill px-2 py-1">Update</button>`,
      };

      localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct));
      Table_body.innerHTML = "";
      for (let on = 0; on < JSON.parse(localStorage.arrayProduct).length; on++) {
        Table_body.innerHTML += `<tr>
                  <td>${on + 1}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].title}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].price}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].taxes}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].ads}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].discount}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].total}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].Category}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].deleteItem}</td>
                  <td>${JSON.parse(localStorage.arrayProduct)[on].updateItem}</td>
                </tr>`;
      }

      inputTitle.value = null;
      inputPrice.value = null;
      inputTaxes.value = null;
      inputAds.value = null;
      inputDiscount.value = null;
      inputTotal.value = 0;
      inputCategory.value = null;

      Btn_creat.style.display = "block";
      btn_update.style.cssText = `display:block;`;
      inputCount.disabled = false;

      inputCount.style.cssText = `     
      border-radius: 15px;
      outline: none;
      border: none;
      background-color: #111110;
      `;

      btn_DeleteAll.style.cssText = `
      background-color: #2a0668;

      }
      `;
      btn_DeleteAll.disabled = false;

      searchBy_category.style.cssText = `
      background-color: #2a0668;

      }
      `;
      searchBy_category.disabled = false;

      inputSearch.disabled = false;

      searchBy_title.style.cssText = `
      background-color: #2a0668;

      }
      `;
      searchBy_title.disabled = false;

      searchBy_total.style.cssText = `
      background-color: #2a0668;

      }
      `;
      searchBy_total.disabled = false;
      divTotal.style.cssText = `
        background-color: red;
        display:flex;
      `;
      document.getElementById('msgError').innerHTML = ""
    } else {
      document.getElementById('msgError').innerHTML = `<div class="my-3 col-6 alert alert-danger alert-dismissible fade show" role="alert">
     <b class="text text-danger">make sure you type good data.</b>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
    }
  } 
}