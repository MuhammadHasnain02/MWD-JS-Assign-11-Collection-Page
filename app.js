// ======================= PRODUCTS DATA =======================

let products = [
    {
      id: 1,
      image: "Images/burger.png",
      title: "Burger 1",
      description:
        "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
      price: 100,
      category: "Burger",
      rating: 5,
    },
    {
      id: 2,
      image: "Images/shawarma.jpg",
      title: "Shawarma1",
      description:
        "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
      price: 200,
      category: "Shawarma",
      rating: 4,
    },
    {
      id: 3,
      image: "Images/piz.jpg",
      title: "Pizza 1",
      description: "Crispy zinger with crispy rolled into paratha",
      price: 300,
      category: "Pizza",
      rating: 3,
    },
    {
      id: 4,
      image: "Images/burger.png",
      title: "Burger 2",
      description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
      price: 400,
      category: "Burger",
      rating: 2,
    },
    {
      id: 5,
      image: "Images/shawarma.jpg",
      title: "Shawarma 2",
      description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
      price: 500,
      category: "Shawarma",
      rating: 1,
    },
    {
      id: 6,
      image: "Images/piz.jpg",
      title: "Pizza 2",
      description: "Crispy zinger with crispy rolled into paratha",
      price: 600,
      category: "Pizza",
      rating: 5,
    },
    {
      id: 7,
      image: "Images/burger.png",
      title: "Burger 3",
      description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
      price: 700,
      category: "Burger",
      rating: 4,
    },
    {
      id: 8,
      image: "Images/shawarma.jpg",
      title: "Shawarma 3",
      description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
      price: 800,
      category: "Shawarma",
      rating: 3,
    },
    {
      id: 9,
      image: "Images/piz.jpg",
      title: "Pizza 3",
      description: "Crispy zinger with crispy rolled into paratha",
      price: 900,
      category: "Pizza",
      rating: 2,
    }
  ];
  
  // ======================= Find Categories in Data =======================
  
  let category = []
  products.forEach(product => {
    
    if (!category.includes(product.category)) {
      category.push(product.category)
    }
    
  });
  
  // ======================= MAP CATEGORIES =======================
  
  let mapCategTxt = () => {
  
    category.forEach(categ => {
      
      let categCards = document.getElementById("categCards")
      categCards.innerHTML +=
      `
      <div class="flex flex-row space-y-3">
        <div><input type="checkbox" onchange="filterCategory('${categ}', this.checked)" class="checkCateg w-4 h-4 hover:cursor-pointer"></div>
        <label class="pl-2 hover:cursor-pointer">${categ}</label>
      </div>
      `
    })
  }
  mapCategTxt()
  
  // ======================= Find Selected Category =======================
  
  let allCheckboxes = document.querySelectorAll(".checkCateg")
  let allCategFiltLine = document.getElementById("allCategFiltLine")
  let selectedCateg = []
  let checked = false
  
  let filterCategory = (category , isChecked) => {
  
    if (isChecked) {
      selectedCateg.push(category)
      checked = true
    }
    else {
      selectedCateg = selectedCateg.filter((cat) => cat !== category);
    }
    
    console.log("selectedCategory -->", selectedCateg);
    mapTopFiltCategCards()
    mapProdCards();
  }
  
  // ======================= Map Filtered Category cards on top =======================
  
  let mapTopFiltCategCards = () => {
  
    // Clear previous catgory cards
    allCategFiltLine.innerHTML = ""
    
    // Map new top catgory cards
    selectedCateg.forEach((categ) => {
      allCategFiltLine.innerHTML +=
      `
        <div class="flex flex-row items-center p-1.5 ml-4 gap-2 border-[2px] rounded-2xl">
          <p class="">${categ}</p>
          <i class="fa-solid fa-circle-xmark hover:cursor-pointer" onclick="removeFiltCategOnTop('${categ}')"></i>
        </div>
      `
    })
  
    clearAllBtn()
  }
  
  // ======================= Remove Filtered Category on top =======================
  
  let removeFiltCategOnTop = (category) => {
  
    selectedCateg = selectedCateg.filter(cat => cat !== category)
  
    allCheckboxes.forEach(checkbox => {
  
      if (checkbox.checked === true) {
        checkbox.checked = false
      }
  
    })
    mapTopFiltCategCards()
    mapProdCards();
  }
  
  // ======================= Get Filter Product =======================
  
  let userSelectCateg = []
  
  let getFilterProd = (data , selectedCategory , selectedRating , selectedRange) => {
  
    let filtProducts = data;
  
    // Filter by category
    if (selectedCateg.length) {
  
      filtProducts = filtProducts.filter((product) => {
        let selCateg =  selectedCategory.includes(product.category)
        userSelectCateg.push(selCateg)
        return selCateg
      })
  
    }
    
    // Filter by rating
    if (selectedRat) {
  
      filtProducts = filtProducts.filter((product) => {
        return product.rating === selectedRating
      })
    
    }
    
    // Filter by Range
    if (selectedRange) {
  
      filtProducts = filtProducts.filter((product) => {
        return product.price <= selectedRange
      });
  
    }
  
    return filtProducts
  }
  
  // ======================= MAP RATINGS =======================
  
  let selectedRat = ""
  
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
        <p class="flex items-end font-extralight pl-1 text-gray-300">${rat === 5 ? "5.0" : rat.toFixed(1) + " +"}</p>
      </div>
      `
    )
    .join("")
  
  }
  mapRating()
  
  // ======================= Get Filter Rating =======================
  
  let filterRating = (rating) => {
    
    selectedRat = selectedRat === rating ? "" : rating
    console.log("selectedRating => " , selectedRat);
  
    mapRating()
    mapProdCards()
    mapTopFiltRatCards()
  }
  
  // ======================= Map Filtered Rating cards on top =======================
  
  let allRatFiltLine = document.getElementById("allRatFiltLine")
  
  let mapTopFiltRatCards = () => {
  
    // Clear previous catgory cards
    allRatFiltLine.innerHTML = ""
    
    // Map new top catgory cards
    if (selectedRat) {
      allRatFiltLine.innerHTML +=
      `
        <div class="flex flex-row items-center p-1.5 ml-4 gap-2 border-[2px] rounded-2xl">
          <p class="">Rating: ${selectedRat} ★</p>
          <i class="fa-solid fa-circle-xmark hover:cursor-pointer" onclick="removeFiltRatOnTop()"></i>
        </div>
      `
    }
  }
  
  // ======================= Remove Filtered Rating on top =======================
  
  let removeFiltRatOnTop = () => {
  
    selectedRat = ""
    allRatFiltLine.innerHTML = ""
    mapRating();
    mapProdCards()
  
  }
  
  // ======================= Find Min|Max Value =======================
  
  let findPriceRange = () => {
  
    let min = products[0].price
    let max = 0
  
    products.forEach(product => {
      if (product.price < min) min = product.price;
      if (product.price > max) max = product.price;
    })
  
    return {min , max} 
  
  }
  let priceRange = findPriceRange()

  // ======================= Map Min|Max Value =======================
  
  let slider      = document.getElementById("priceSlider")
  let minValue    = document.getElementById("minValue")
  let maxValue    = document.getElementById("maxValue")
  let productCont = document.getElementById("prodCards")
  let allRangFiltLine = document.getElementById("allRangFiltLine")
  
  minValue.textContent = priceRange.min
  maxValue.textContent = priceRange.max
  
  slider.min = priceRange.min
  slider.max = priceRange.max
  
  slider.value = priceRange.max
  
  slider.addEventListener("input", () => {
  
    let selected = Number(slider.value);
    maxValue.textContent = selected;
  
    // Find lower or equal price manually
    let targetPrice = 0;
    products.forEach(product => {
      product.price <= selected && product.price > targetPrice ? targetPrice = product.price : ""
    });
  
    // Set Max Value
    maxValue.textContent = targetPrice

    // ======================= Map Filtered Range on top =======================

    // Clear previous catgory cards
    allRangFiltLine.innerHTML = ""

    // Add new price card
    allRangFiltLine.innerHTML += 
    `
    <div class="flex flex-row items-center p-1.5 ml-4 gap-2 border-[2px] rounded-2xl priceFilterCard">
      <p class="">${priceRange.min} - ${targetPrice}$</p>
      <i class="fa-solid fa-circle-xmark hover:cursor-pointer" onclick="removeFiltRangOnTop()"></i>
    </div>
    `
  
    // Filter matched products
    let matched = [];
    products.forEach(product => {
      product.price <= targetPrice ? matched.push(product) : ""
    })
  
    // Render cards
    productCont.innerHTML = "";
    matched.forEach(prod => {
  
      productCont.innerHTML +=
      `
      <div class="col-span-3 bg-[#5b7b7a] rounded-2xl hover:cursor-pointer">
  
            <div>
                <img src="${prod.image}" class="object-cover rounded-t-2xl z-[1] opacity-90 hover:opacity-100 transition-opacity w-full h-[250px]">
            </div>
            <div class="bg-[#5b7b7a] text-white px-3 py-3 rounded-b-2xl">
                <p class="font-medium text-[25px]">${prod.title}</p>
                  <p class="text-yellow-400 text-[32px] h-9 flex flex-row gap-2  items-center">
                  ${
                    Array(5).fill()
                    .map((_ , i) => 
                      `
                      <i class="fa-solid fa-star text-[14px]
                      ${
                        i < prod.rating ? "text-yellow-400" : "text-gray-300"
                      }
                      "></i>                    
                      `
                    )
                    .join("")
                  }                
                  <span class="text-white text-[15px] flex items-center mt-1">(${prod.rating})</span>
                  </p>
                <p class="pb-2 max-h-24 overflow-auto">${prod.description}</p>
                <div class="flex justify-between items-center">
                    <p class="text-[20px] hover:text-gray-300">$${prod.price}</p>
                    <p><i class="fa-solid fa-cart-shopping text-white hover:text-gray-300"></i></p>
                </div>
            </div>
  
        </div>
      `
  
    })
    mapProdCards()
  
  })

  // ======================= Remove Filtered Range on top =======================
  
  let removeFiltRangOnTop = () => {
  
    slider.value = priceRange.max
    maxValue.textContent = priceRange.max
  
    allRangFiltLine.innerHTML = ""
    mapProdCards()
    
  }
  
  // ======================= MAP PRODUCT CARDS =======================
  
  let mapProdCards = () => {
  
    let selectedRang = Number(slider.value);
    let visibProducts = getFilterProd(products , selectedCateg , selectedRat , selectedRang)
  
    let cardDiv = document.getElementById("prodCards")
    cardDiv.innerHTML = visibProducts
    .map((prod) =>
      `
        <div class="col-span-3 bg-[#5b7b7a] rounded-2xl hover:cursor-pointer">
  
            <div>
                <img src="${prod.image}" class="object-cover rounded-t-2xl z-[1] opacity-90 hover:opacity-100 transition-opacity w-full h-[250px]">
            </div>
            <div class="bg-[#5b7b7a] text-white px-3 py-3 rounded-b-2xl">
                <p class="font-medium text-[25px]">${prod.title}</p>
                  <p class="text-yellow-400 text-[32px] h-9 flex flex-row gap-2  items-center">
                  ${
                    Array(5).fill()
                    .map((_ , i) => 
                      `
                      <i class="fa-solid fa-star text-[14px]
                      ${
                        i < prod.rating ? "text-yellow-400" : "text-gray-300"
                      }
                      "></i>                    
                      `
                    )
                    .join("")
                  }                
                  <span class="text-white text-[15px] flex items-center mt-1">(${prod.rating})</span>
                  </p>
                <p class="pb-2 max-h-24 overflow-auto">${prod.description}</p>
                <div class="flex justify-between items-center">
                    <p class="text-[20px] hover:text-gray-300">$${prod.price}</p>
                    <p><i class="fa-solid fa-cart-shopping text-white hover:text-gray-300"></i></p>
                </div>
            </div>
  
        </div>
      `
    )
    .join("")
  }
  mapProdCards()
  
  // ======================= Sort Rating & Price =======================
  
  let sortDropdown = document.getElementById("sortDropdown")
  sortDropdown.addEventListener("change" , (e) => {
  
    let sortType = e.target.value
    console.log("sort Type => " , sortType)
  
    if (sortType === "ratLowToHigh") {
      products.sort((a , b) => a.rating - b.rating)
    }
    else if (sortType === "ratHighToLow") {
      products.sort((a , b) => b.rating - a.rating)
    }
    else if (sortType === "pricLowToHigh") {
      products.sort((a , b) => a.price - b.price)
    }
    else if (sortType === "pricHighToLow") {
      products.sort((a , b) => b.price - a.price)
    }
    mapProdCards()
  
  })

  let clearAllBtn = () => {

    let clearAllBtnDiv = document.getElementById("clearAllBtnDiv")
    clearAllBtnDiv.innerHTML +=
    `
    <div onclick="clearAllFilters()" class="flex flex-row items-center p-1.5 ml-4 gap-2 border-[2px] rounded-2xl hover:cursor-pointer">
      <p class="">Clear All</p>
    </div>
    `
  }

  let clearAllFilters = () => {

    let allFiltLine = document.getElementById("allFiltLine")

    // Clear selected category
    selectedCateg = [];

    // Uncheck all category checkboxes
    document.querySelectorAll(".checkCateg").forEach(checkbox => {
      checkbox.checked = false;
    });

    // Clear selected rating
    selectedRat = "";
    mapRating();

    // Reset price slider
    slider.value = priceRange.max;
    maxValue.textContent = priceRange.max;

    // Clear top filter cards
    allFiltLine.innerHTML = "";

    // Show all products again
    mapProdCards();

  }