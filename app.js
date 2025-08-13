// ======================= PRODUCTS DATA =======================

let products = [
    
  {
    id: 1,
    image: "Images/burger.webp",
    title: "Burger 1",
    description:
      "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
    price: 100,
    category: "Burger",
    rating: 5,
  },
  {
    id: 2,
    image: "Images/shawarma.webp",
    title: "Shawarma1",
    description:
      "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
    price: 200,
    category: "Shawarma",
    rating: 4,
  },
  {
    id: 3,
    image: "Images/piz.webp",
    title: "Pizza 1",
    description: "Crispy zinger with crispy rolled into paratha",
    price: 300,
    category: "Pizza",
    rating: 3,
  },
  {
    id: 4,
    image: "Images/burger.webp",
    title: "Burger 2",
    description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
    price: 400,
    category: "Burger",
    rating: 2,
  },
  {
    id: 5,
    image: "Images/shawarma.webp",
    title: "Shawarma 2",
    description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
    price: 500,
    category: "Shawarma",
    rating: 1,
  },
  {
    id: 6,
    image: "Images/piz.webp",
    title: "Pizza 2",
    description: "Crispy zinger with crispy rolled into paratha",
    price: 600,
    category: "Pizza",
    rating: 5,
  },
  {
    id: 7,
    image: "Images/burger.webp",
    title: "Burger 3",
    description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
    price: 700,
    category: "Burger",
    rating: 4,
  },
  {
    id: 8,
    image: "Images/shawarma.webp",
    title: "Shawarma 3",
    description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
    price: 800,
    category: "Shawarma",
    rating: 3,
  },
  {
    id: 9,
    image: "Images/piz.webp",
    title: "Pizza 3",
    description: "Crispy zinger with crispy rolled into paratha",
    price: 900,
    category: "Pizza",
    rating: 2,
  },
  {
    id: 10,
    image: "Images/burger.webp",
    title: "Burger 4",
    description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
    price: 1000,
    category: "Burger",
    rating: 3,
  },
  {
    id: 11,
    image: "Images/shawarma.webp",
    title: "Shawarma 4",
    description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
    price: 1100,
    category: "Shawarma",
    rating: 2,
  },
  {
    id: 12,
    image: "Images/piz.webp",
    title: "Pizza 4",
    description: "Crispy zinger with crispy rolled into paratha",
    price: 1200,
    category: "Pizza",
    rating: 1,
  },
  {
    id: 13,
    image: "Images/burger.webp",
    title: "Burger 5",
    description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
    price: 1300,
    category: "Burger",
    rating: 1,
  },
  {
    id: 14,
    image: "Images/shawarma.webp",
    title: "Shawarma 5",
    description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
    price: 1400,
    category: "Shawarma",
    rating: 5,
  },
  {
    id: 15,
    image: "Images/piz.webp",
    title: "Pizza 5",
    description: "Crispy zinger with crispy rolled into paratha",
    price: 1500,
    category: "Pizza",
    rating: 4,
  }
  
];

// ======================= STATE =======================
let selectedCateg = [];
let selectedRat = null;
let priceRange = null;
let currentFilteredData = products.slice();
let currentPage = 1;
let itemsPerPage = 15;

// ======================= HELPERS =======================
const findPriceRange = () => {
  let min = products[0].price, max = products[0].price;
  products.forEach(p => {
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
  });
  return { min, max };
};
priceRange = findPriceRange();

// ======================= DOM REFERENCES =======================
const slider = document.getElementById("priceSlider");
const minValue = document.getElementById("minValue");
const maxValue = document.getElementById("maxValue");
const prodCards = document.getElementById("prodCards");
const paginationContainer = document.getElementById("pagination");
const itmDropdown = document.getElementById("itmPrPgDropdown");
const sortDropdown = document.getElementById("sortDropdown");
const allCategFiltLine = document.getElementById("allCategFiltLine");
const allRatFiltLine = document.getElementById("allRatFiltLine");
const allRangFiltLine = document.getElementById("allRangFiltLine");
const clearAllBtnDiv = document.getElementById("clearAllBtnDiv");

// ======================= CATEGORIES (map) =======================

let categories = [];
products.forEach(p => { if (!categories.includes(p.category)) categories.push(p.category); });

function mapCategTxt() {
  let container = document.getElementById("categCards");
  categories.forEach(c => {
    container.innerHTML += `
      <div class="flex flex-row space-y-3 font-medium text-[15px]">
        <div><input type="checkbox" onchange="filterCategory('${c}', this.checked)" class="checkCateg w-4 h-4 hover:cursor-pointer"></div>
        <label class="pl-2 hover:cursor-pointer">${c}</label>
      </div>
    `;
  });
}
mapCategTxt();

// after rendering checkboxes, update reference
function allCheckboxes() {
  return document.querySelectorAll(".checkCateg")
}

// ======================= Find User Selected Category =======================

let filterCategory = (category , isChecked) => {

  if (isChecked) {
    if (!selectedCateg.includes(category)) selectedCateg.push(category);
  }
  else {
    selectedCateg = selectedCateg.filter(c => c !== category);
  }
  mapTopFiltCategCards();
  updateFilteredAndRender();
   
}

// ======================= Get User Filter Rating =======================

function filterRating(rating) {
  selectedRat = selectedRat === rating ? null : rating;
  mapTopFiltRatCards();
  updateFilteredAndRender();
}

// ======================= Map Filtered Category cards on top =======================

let mapTopFiltCategCards = () => {

  // Clear previous catgory cards
  allCategFiltLine.innerHTML = ""

  // Map new top catgory cards
  selectedCateg.forEach((categ) => {
    allCategFiltLine.innerHTML +=
    `
      <div class="flex flex-row items-center py-[7px] px-1.5 ml-2 gap-1 border-[2px] rounded-2xl">
        <p class="text-[15px]">${categ}</p>
        <i class="fa-solid fa-circle-xmark hover:cursor-pointer" onclick="removeFiltCategOnTop('${categ}')"></i>
      </div>
    `
  })

  mapClearBtn()

}

// ======================= Remove Filtered Category on top =======================

let removeFiltCategOnTop = (cat) => {

  selectedCateg = selectedCateg.filter(categ => categ !== cat);
  // uncheck checkboxes
  allCheckboxes().forEach(checkbox => {
    if (checkbox.checked === true) {
      checkbox.checked = false
    }
  })
  
  mapTopFiltCategCards();
  updateFilteredAndRender();
}

// ======================= MAP RATINGS =======================

let ratingCards = document.getElementById("ratingCards")
let mapRating = () => {

  let ratingArr = [5 , 4 , 3 , 2 , 1]

  ratingCards.innerHTML = ratingArr
  .map((rat) =>
    `
    <div class=" h-8 flex flex-row cursor-pointer items-center" onclick= "filterRating(${rat})">

    ${Array(5).fill()
      .map((_ , i) => 
      `<i class="fa-solid fa-star text-[14px] pr-5
        ${i < rat ? "text-yellow-400" : "text-gray-300"}
        ${rat === selectedRat ? "!text-[#e85151]" : ""}
      "></i>`
      )
      .join("")

    }
      <p class="flex items-end font-medium pl-1 text-gray-500">${rat === 5 ? "5.0" : rat.toFixed(1) + "+"}</p>
    </div>
    `
  )
  .join("")

}
mapRating()

// ======================= Map Filtered Rating cards on top =======================

let mapTopFiltRatCards = () => {

  // Clear previous catgory cards
  allRatFiltLine.innerHTML = ""

  if (selectedRat) {
    allRatFiltLine.innerHTML =
    `
      <div class="flex flex-row items-center p-1.5 ml-4 gap-2 border-[2px] rounded-2xl">
        <p class="">Rating: ${selectedRat} ★</p>
        <i class="fa-solid fa-circle-xmark hover:cursor-pointer" onclick="removeFiltRatOnTop()"></i>
      </div>
    `
  }
  mapClearBtn();
}

// ======================= Remove Filtered Rating on top =======================

let removeFiltRatOnTop = () => {

  selectedRat = null;
  mapRating()
  allRatFiltLine.innerHTML = "";
  updateFilteredAndRender();

}

// ======================= Map Min|Max Value =======================

minValue.textContent = priceRange.min;
maxValue.textContent = priceRange.max;
slider.min = priceRange.min;
slider.max = priceRange.max;
slider.value = priceRange.max;

slider.addEventListener("input", () => {

  let selected = Number(slider.value);
  maxValue.textContent = selected;

  // ======================= Map Filtered Range cards on top =======================

  allRangFiltLine.innerHTML = 
  `
    <div class="flex flex-row items-center p-1.5 ml-4 gap-2 border-[2px] rounded-2xl">
      <p class="">${priceRange.min} - ${selected}</p>
      <i class="fa-solid fa-circle-xmark hover:cursor-pointer" onclick="removeFiltRangOnTop()"></i>
    </div>
  `;
  mapClearBtn();
  updateFilteredAndRender();
});

// ======================= Remove Filtered Range on top =======================

function removeFiltRangOnTop() {

  slider.value = priceRange.max;
  maxValue.textContent = priceRange.max;
  allRangFiltLine.innerHTML = "";
  mapClearBtn();
  updateFilteredAndRender();

}

// ======================= GET FILTERED PRODUCTS =======================

function getFilterProd(data, selCateg, selRat, selRange) {
  let filtProducts = data.slice();

  // Filter by category
  if (selCateg && selCateg.length) {
    filtProducts = filtProducts.filter(prod => selCateg.includes(prod.category));
  }

  // Filter by rating
  if (selRat) {
    filtProducts = filtProducts.filter(prod => prod.rating === selRat);
  }
  mapRating()

  // Filter by Range
  if (selRange != null && selRange !== "") {
    filtProducts = filtProducts.filter(prod => prod.price <= selRange);
  }

  return filtProducts;
  
}

// ======================= RENDER + PAGINATION =======================

function renderProducts(filteredProducts) {
  
  if (!itemsPerPage || itemsPerPage <= 0) itemsPerPage = 15
  let startIndex = (currentPage - 1) * itemsPerPage
  let endIndex = startIndex + itemsPerPage
  let paginated = filteredProducts.slice(startIndex, endIndex)

  prodCards.innerHTML = "";

  paginated.forEach(prod => {
    prodCards.innerHTML +=
    `
    <div class="col-span-4 border bg-white border-gray-300 rounded-2xl hover:cursor-pointer">

      <div>
        <img src="${prod.image}" class="object-cover rounded-t-2xl z-[1] opacity-90 hover:opacity-100 transition-opacity w-full h-[250px]">
      </div>
      <div class="bg-[#fff] text-black px-3 py-3 rounded-b-2xl">
        <p class="font-semibold text-[22px] font-[Montserrat]">${prod.title}</p>
        <p class="text-yellow-400 text-[32px] h-9 flex flex-row gap-2 items-center">
          ${
            Array(5).fill().map((_, i) => 
              `<i class="fa-solid fa-star text-[14px] ${i < prod.rating ? "text-yellow-400" : "text-gray-300"}"></i>`
            ).join("")
          }
          <span class="text-black text-[15px] flex items-center mt-1">(${prod.rating})</span>
        </p>
        <p class="pb-2 max-h-24 overflow-auto">${prod.description}</p>
        <div class="flex justify-between items-center">
          <p class="text-[20px] hover:text-gray-400">$${prod.price}</p>
          <p><i class="fa-solid fa-cart-shopping text-[18px] text-black hover:text-gray-400"></i></p>
        </div>
      </div>

    </div>
    `
  });

  renderPaginationButtons(filteredProducts.length);
}

// ======================= Render Pagination Button =======================

function renderPaginationButtons(totalItems) {

  let totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  paginationContainer.innerHTML = "";
  
  // Agar itemsPerPage se kam products hain to pagination mat dikhana
  if (totalItems <= itemsPerPage) {
    return
  }
  
  // previous
  paginationContainer.innerHTML +=
  `<button onclick="changePage(${Math.max(1, currentPage-1)})" class="px-4 py-2 hover:cursor-pointer">‹ Previous</button>`
  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.innerHTML +=
    `
    <button onclick="changePage(${i})" class="px-5 py-3 m-0 ${i === currentPage ? 'bg-gray-200' : ''} border rounded-md">
        ${i}
    </button>
    `
  }
  // next
  paginationContainer.innerHTML +=
  `<button onclick="changePage(${Math.min(totalPages, currentPage + 1)})" class="px-4 py-2 hover:cursor-pointer">Next ›</button>`;
}

function changePage(pageNum) {
  currentPage = pageNum;
  renderProducts(currentFilteredData);
}

// ======================= UPDATE FILTERED DATA (call this everywhere) =======================

function updateFilteredAndRender() {
  const selRange = Number(slider.value);
  currentFilteredData = getFilterProd(products, selectedCateg, selectedRat, selRange);
  currentPage = 1;
  renderProducts(currentFilteredData);
  mapClearBtn();
}

// ======================= Clear All Button logic =======================

function mapClearBtn() {

  const rangeSelected = Number(slider.value) !== priceRange.max;
  const categorySelected = selectedCateg.length > 0;
  const ratingSelected = !!selectedRat;
  if (categorySelected || rangeSelected || ratingSelected) {
    clearAllBtnDiv.innerHTML =
    `
    <div onclick="clearAllFilt()" class="flex flex-row items-center px-3 py-[7px] ml-3 border-[2px] rounded-2xl hover:cursor-pointer">
      <p class="text-[15px]">Clear All</p>
    </div>
    `
  } else {
    clearAllBtnDiv.innerHTML = "";
  }

}

// ======================= Clear All Filter logic =======================

function clearAllFilt() {

  // Clear selected category
  selectedCateg = []
  allCheckboxes().forEach(ch => ch.checked = false)

  // Clear selected rating
  selectedRat = null

  // Reset price slider
  slider.value = priceRange.max
  maxValue.textContent = priceRange.max;

  // Clear top filter cards
  allCategFiltLine.innerHTML = ""
  allRatFiltLine.innerHTML = ""
  allRangFiltLine.innerHTML = ""
  
  // dataset and render
  updateFilteredAndRender()

}

// ======================= Sort Items Per Page =======================

itemsPerPage = parseInt(itmDropdown.value || 15);

itmDropdown.addEventListener("change", function() {

  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderProducts(currentFilteredData);

});

// ======================= Sort Rating & Price =======================

sortDropdown.addEventListener("change", function(e) {

  const sortType = e.target.value

  if (sortType === "ratLowToHigh") {
    products.sort((a,b) => a.rating - b.rating)
  }
  else if (sortType === "ratHighToLow") {
    products.sort((a,b) => b.rating - a.rating)
  }
  else if (sortType === "pricLowToHigh") {
    products.sort((a,b) => a.price - b.price)
  }
  else if (sortType === "pricHighToLow") {
    products.sort((a,b) => b.price - a.price)
  }

  // after sorting update the filtered dataset and render
  updateFilteredAndRender();

});

// ======================= Initial render =======================
updateFilteredAndRender();

// ======================= Search event listener =======================

document.getElementById("searchBox").addEventListener("input", function () {
  let searVal = this.value.trim().toLowerCase();

  // Filter products based on search text
  currentFilteredData = products.filter(prod =>
    prod.title.toLowerCase().includes(searVal)
  )

  currentPage = 1
  renderProducts(currentFilteredData)
});