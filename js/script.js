// const categorySide = document.getElementById("category");
// const categoryCenterSide = document.getElementById("greenTreeAllData");
// const rightSide = document.getElementById("rightSide");

// let cart = [];

// // Fetch All Categories
// const allCategory = async () => {
//   const res = await fetch(
//     "https://openapi.programming-hero.com/api/categories"
//   );
//   const data = await res.json();
//   categoryLeftSide(data.categories);
// };

// const categoryLeftSide = (categories) => {
//   categories.forEach((item) => {
//     categorySide.innerHTML += `
//           <li onclick="leftSideCategory(${item.id})" class='text-xl font-semibold hover:text-white py-2 w-full hover:bg-green-600 rounded-md pl-4 cursor-pointer'>
//             ${item.category_name}
//           </li>
//         `;
//   });
// };

// const leftSideCategory = async (categoryId) => {
//   const res = await fetch(
//     `https://openapi.programming-hero.com/api/category/${categoryId}`
//   );
//   const data = await res.json();
//   centerGreenData(data.plants);
// };

// // Fetch All Plants
// const greenAllData = async () => {
//   const res = await fetch("https://openapi.programming-hero.com/api/plants");
//   const data = await res.json();
//   centerGreenData(data.plants);
// };

// // Render Center Plants
// const centerGreenData = (plants) => {
//   categoryCenterSide.innerHTML = "";
//   plants.forEach((item) => {
//     const { category, name, price, id, description, image } = item;
//     categoryCenterSide.innerHTML += `
//           <div class='bg-white p-4 rounded-md shadow-md space-y-4'>
//             <img class='h-44 w-full rounded bg-gray-500 object-cover' src="${image}" alt="${name}">
//             <h2 class='text-2xl font-semibold cursor-pointer' onclick="openModal('${name}', ${price}, '${category}', '${id}', '${image}', '${description}')">
//               ${category}
//             </h2>
//             <p>${description}</p>
//             <div class='flex justify-between items-center'>
//                <p class='text-green-600 rounded-full py-2 px-4 bg-green-100 font-medium'>${name}</p>
//                <p class='text-sm font-semibold'>$${price}</p>
//             </div>
//             <button onclick="rightSideBtn('${id}', '${category}', ${price})" class='py-2 cursor-pointer font-medium bg-green-600 text-white w-full rounded-full'>Add To Cart</button>
//           </div>
//         `;
//   });
// };

// // Cart Functions
// const rightSideBtn = (id, category, price) => {
//   const existingItem = cart.find((item) => item.id === id);
//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     cart.push({ id, category, price, quantity: 1 });
//   }
//   renderCart();
// };

// const removeFromCart = (id) => {
//   cart = cart.filter((item) => item.id !== id);
//   renderCart();
// };

// const renderCart = () => {
//   rightSide.innerHTML = "<h2 class='text-2xl font-bold mb-2'>Cart</h2>";
//   let total = 0;

//   cart.forEach((item) => {
//     total += item.price * item.quantity;
//     rightSide.innerHTML += `
//           <div class='flex justify-between items-center p-4 bg-[#f0fdf4] rounded-md'>
//             <div>
//               <p class='text-xl font-medium mb-2'>${item.category}</p>
//               <p class='text-sm font-medium'>$${item.price} * ${item.quantity}</p>
//             </div>
//             <button onclick="removeFromCart('${item.id}')" class='text-xl font-bold cursor-pointer text-red-500'>X</button>
//           </div>
//           <hr class='bg-gray-300 mt-1'/>
//         `;
//   });

//   rightSide.innerHTML += `
//         <div class='flex justify-between items-center mt-2'>
//           <span class='text-xl font-medium'>Total:</span>
//           <span class='text-xl font-medium'>$${total}</span>
//         </div>
//       `;
// };

// // Open Modal
// const openModal = (name, price, categoryItem, id, image, description) => {
//   const modalContainer = document.getElementById("modal_container");
//   modalContainer.innerHTML = `
//         <div class="space-y-3">
//           <h4 class="text-xl font-bold">${name}</h4>
//           <img class="w-full rounded-lg h-50 object-cover" src="${image}" alt="${name}">
//           <p class="font-bold">Category: <span class="font-normal">${categoryItem}</span></p>
//           <p class="font-bold">Price: <span class="font-normal">$${price}</span></p>
//           <p class="font-bold">Description: <span class="font-normal">${description}</span></p>
//         </div>
//       `;
//   document.getElementById("my_modal_5").showModal();
// };

// // Initialize
// greenAllData();
// allCategory();

const categorySide = document.getElementById("category");
const categoryCenterSide = document.getElementById("greenTreeAllData");
const rightSide = document.getElementById("rightSide");

let cart = [];

// Fetch All Categories
const allCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();
  categoryLeftSide(data.categories);
};

const categoryLeftSide = (categories) => {
  categorySide.innerHTML = "";

  // আলাদা করে All li যোগ করলাম
  categorySide.innerHTML += `
    <li data-id="all" class="category-item text-xl font-semibold hover:text-white py-2 w-full hover:bg-green-600 rounded-md pl-4 cursor-pointer">
      All
    </li>
  `;

  categories.forEach((item) => {
    categorySide.innerHTML += `
      <li data-id="${item.id}" class="category-item text-xl font-semibold hover:text-white py-2 w-full hover:bg-green-600 rounded-md pl-4 cursor-pointer">
        ${item.category_name}
      </li>
    `;
  });

  // সব li এ event listener
  // সব li এ event listener
  const allLi = document.querySelectorAll(".category-item");
  allLi.forEach((li, index) => {
    li.addEventListener("click", function () {
      const categoryId = this.getAttribute("data-id");

      if (categoryId === "all") {
        // "All" এ সবসময় data load হবে
        greenAllData();

        // active ক্লিয়ার না করেও কাজ করবে
        allLi.forEach((el) => el.classList.remove("active"));
        this.classList.add("active");
      } else {
        // অন্য category case
        allLi.forEach((el) => el.classList.remove("active"));
        this.classList.add("active");
        leftSideCategory(categoryId);
      }
    });

    // Default active = "All"
    if (index === 0) {
      li.classList.add("active");
      greenAllData();
    }
  });
};

const leftSideCategory = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`
  );
  const data = await res.json();
  centerGreenData(data.plants);
};

// Fetch All Plants
const greenAllData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  centerGreenData(data.plants);
};

// Render Center Plants
const centerGreenData = (plants) => {
  categoryCenterSide.innerHTML = "";
  plants.forEach((item) => {
    const { category, name, price, id, description, image } = item;
    categoryCenterSide.innerHTML += `
      <div class='bg-white p-4 rounded-md shadow-md space-y-4'>
        <img class='h-44 w-full rounded bg-gray-500 object-cover' src="${image}" alt="${name}">
        <h2 class='text-2xl font-semibold cursor-pointer' onclick="openModal('${name}', ${price}, '${category}', '${id}', '${image}', '${description}')">
          ${category}
        </h2>
        <p>${description}</p>
        <div class='flex justify-between items-center'>
          <p class='text-green-600 rounded-full py-2 px-4 bg-green-100 font-medium'>${name}</p>
          <p class='text-sm font-semibold'>$${price}</p>
        </div>
        <button onclick="rightSideBtn('${id}', '${category}', ${price})" class='py-2 cursor-pointer font-medium bg-green-600 text-white w-full rounded-full'>Add To Cart</button>
      </div>
    `;
  });
};

// Cart Functions
const rightSideBtn = (id, category, price) => {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, category, price, quantity: 1 });
  }
  renderCart();
};

const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
};

const renderCart = () => {
  rightSide.innerHTML = "<h2 class='text-2xl font-bold mb-2'>Cart</h2>";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    rightSide.innerHTML += `
      <div class='flex justify-between items-center p-4 bg-[#f0fdf4] rounded-md'>
        <div>
          <p class='text-xl font-medium mb-2'>${item.category}</p>
          <p class='text-sm font-medium'>$${item.price} * ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart('${item.id}')" class='text-xl font-bold cursor-pointer text-red-500'>X</button>
      </div>
      <hr class='bg-gray-300 mt-1'/>
    `;
  });

  rightSide.innerHTML += `
    <div class='flex justify-between items-center mt-2'>
      <span class='text-xl font-medium'>Total:</span>
      <span class='text-xl font-medium'>$${total}</span>
    </div>
  `;
};

// Open Modal
const openModal = (name, price, categoryItem, id, image, description) => {
  const modalContainer = document.getElementById("modal_container");
  modalContainer.innerHTML = `
    <div class="space-y-3">
      <h4 class="text-xl font-bold">${name}</h4>
      <img class="w-full rounded-lg h-50 object-cover" src="${image}" alt="${name}">
      <p class="font-bold">Category: <span class="font-normal">${categoryItem}</span></p>
      <p class="font-bold">Price: <span class="font-normal">$${price}</span></p>
      <p class="font-bold">Description: <span class="font-normal">${description}</span></p>
    </div>
  `;

  const modal = document.getElementById("my_modal_5");
  modal.showModal();

  document.getElementById("closeModalBtn").onclick = () => {
    modal.close();
  };
};

// Initialize
greenAllData();
allCategory();
