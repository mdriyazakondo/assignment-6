const categorySide = document.getElementById("category");
const categoryCenterSide = document.getElementById("greenTreeAllData");
const rightSide = document.getElementById("rightSide");

const allCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const categories = await res.json();
  categoryLefttSide(categories.categories);
};

const categoryLefttSide = (categories) => {
  categories?.forEach((item) => {
    categorySide.innerHTML += `
        <li onclick="leftSideCategory(${item.id})" class='text-xl  font-semibold hover:text-white py-2 w-full hover:bg-green-600 rounded-md pl-4 cursor-pointer'>${item.category_name}</li>
    `;
  });
};

const leftSideCategory = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => centerGreenData(data.plants));
};

const greenAllData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  centerGreenData(data.plants);
};

let cart = [];

// Add to Cart Function
const rightSideBtn = (id, category, price) => {
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      category,
      price,
      quantity: 1,
    });
  }

  renderCart();
};

// Remove Item
const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
};

// Render Cart
const renderCart = () => {
  rightSide.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    rightSide.innerHTML += `
      <div class="bg-green-100 p-2 mb-2 rounded flex justify-between items-center">
        <div>
          <p class="font-semibold">${item.category}</p>
          <p>৳${item.price} × ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart('${item.id}')" 
          class="text-red-500 font-bold text-lg">×</button>
      </div>
    `;
  });

  rightSide.innerHTML += `
    <div class="border-t pt-2 mt-2 font-semibold flex justify-between">
      <span>Total:</span>
      <span>৳${total}</span>
    </div>
  `;
};

// const rightSideBtn = (id, category, price) => {
//   rightSide.innerHTML += `
//            <div>
//            <p>${id}</p>
//               <h4>${category}</h4>
//               <p>${price}</p>
//            </div>
//   `;
// };

// const filterCategory = (filterCategoryItem) => {
//   categoryCenterSide.innerHTML = "";
//   filterCategoryItem.forEach((item) => {
//     categoryCenterSide.innerHTML += `
//       <div class=' bg-white p-4 rounded-md shadow-md space-y-4'>
//           <img class='h-44 w-full rounded bg-gray-500' src=${item.image} alt="image paowa jayni">
//           <h2 class='text-2xl font-semibold '>${item.category}</h2>
//           <p>${item.description}</p>
//           <div class='flex justify-between items-center'>
//              <p class='text-green-600 rounded-full py-2 px-4 bg-green-100 font-medium'>${item.name}</p>
//              <p class='text-sm font-semibold'>$${item.price}</p>
//           </div>
//           <button onclick="rightSideBtn()" class='py-2 cursor-pointer font-medium  bg-green-600 text-white w-full rounded-full'>Add To Cart</button>
//       </div>
//   `;
//   });
// };

// let dataBox = [];
// console.log(dataBox);

const centerGreenData = (categoryId) => {
  categoryCenterSide.innerHTML = "";
  categoryId.forEach((item) => {
    // console.log(item);
    const categoryItem = item.category;
    const price = item.price;
    const id = item.id;
    categoryCenterSide.innerHTML += `
      <div class=' bg-white p-4 rounded-md shadow-md space-y-4'>
          <img class='h-44 w-full rounded bg-gray-500' src=${item.image} alt="image paowa jayni">
          <h2 class='text-2xl font-semibold '>${item.category}</h2>
          <p>${item.description}</p>
          <div class='flex justify-between items-center'>
             <p class='text-green-600 rounded-full py-2 px-4 bg-green-100 font-medium'>${item.name}</p>
             <p class='text-sm font-semibold'>$${item.price}</p>
          </div>
          <button onclick="rightSideBtn('${id}', '${categoryItem}', ${price})"  class='py-2 cursor-pointer font-medium  bg-green-600 text-white w-full rounded-full'>Add To Cart</button>
      </div>
  `;
  });
};
greenAllData();
allCategory();
