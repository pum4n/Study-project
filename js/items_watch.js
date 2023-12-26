document.addEventListener('DOMContentLoaded', function () {
  const products = [
    { photo: 'img/jpg/watch1.jpg', name: 'Apple Watch 3 series', price: '$250',},
    { photo: 'img/jpg/watch2.jpg', name: 'Apple Watch 5 series', price: '$500'},
    { photo: 'img/jpg/watch3.jpg', name: 'Apple Watch 9 series', price: '$1000'},
    { photo: 'img/jpg/watch4.jpg', name: 'Apple Watch 2 series', price: '$150' },
    { photo: 'img/jpg/watch5.jpg', name: 'Apple Watch 1 series', price: '$95',},
    { photo: 'img/jpg/watch6.jpg', name: 'Apple Watch 7 series', price: '$555'},
    { photo: 'img/jpg/watch7.jpg', name: 'Apple Watch 7 series', price: '$555'},
    { photo: 'img/jpg/watch8.jpg', name: 'Apple Watch 4 series', price: '$255' },
    { photo: 'img/jpg/watch9.jpg', name: 'Apple Watch 1 series', price: '$125',},
    { photo: 'img/jpg/watch10.jpg', name: 'Apple Watch 2 series', price: '$170'},
    { photo: 'img/jpg/watch11.jpg', name: 'Apple Watch 4 series', price: '$355'},
    { photo: 'img/jpg/watch12.jpg', name: 'Apple Watch 6 series', price: '$455' },
    
  ];

  const itemsPerPage = 4;
  let currentPage = 1;
  let cartItems = [];
  let totalAmount = 0;

  function renderProductList() {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    currentProducts.forEach(product => {
      const listItem = document.createElement('li');
      listItem.classList.add('item');

      const itemImageWrap = document.createElement('div');
      itemImageWrap.classList.add('item-image-wrap');

      const productImage = document.createElement('img');
      productImage.src = product.photo;
      productImage.alt = product.name;
      productImage.style.width = '280px';
      productImage.style.height = '250px';

      const addToCartLink = document.createElement('a');
      addToCartLink.classList.add('object-action-buy');
      addToCartLink.href = 'basket.html';

      const addToCartSpan = document.createElement('span');
      addToCartSpan.textContent = 'Add to Cart';

      addToCartLink.appendChild(addToCartSpan);
      itemImageWrap.appendChild(productImage);
      itemImageWrap.appendChild(addToCartLink);

      const priceBlock = document.createElement('div');
      priceBlock.classList.add('price-block');

      const productLink = document.createElement('a');
      productLink.href = '#';

      const productName = document.createElement('h3');
      productName.classList.add('item-title');
      productName.textContent = product.name;

      const buttonPc = document.createElement('button');
      buttonPc.classList.add('buttonPc');
      buttonPc.textContent = 'Buy';
      buttonPc.addEventListener('click', () => {
        addToCart(product);
        updateCartTotal();
      });

      const productPrice = document.createElement('span');
      productPrice.classList.add('price');
      productPrice.textContent = product.price;

      productLink.appendChild(productName);
      priceBlock.appendChild(productLink);
      priceBlock.appendChild(productPrice);

      listItem.appendChild(itemImageWrap);
      listItem.appendChild(priceBlock);
      listItem.appendChild(buttonPc);

      productListContainer.appendChild(listItem);
    });

    document.getElementById('page-num').innerText = `Page ${currentPage}`;
  }

  function renderPagination() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.classList.add('page-button');
      pageButton.innerText = i;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderProductList();
        renderPagination();
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  function nextPage() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderProductList();
      renderPagination();
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderProductList();
      renderPagination();
    }
  }

  function addToCart(product) {
    cartItems.push(product);
  }

  function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    cartItemContainer.innerHTML = '';

    cartItems.forEach(item => {
      const cartRow = document.createElement('tr');
      cartRow.classList.add('cart-row');
      const cartRowContents = `
        <td class="cart-item cart-column">
          <span class="cart-item-title">${item.name}</span>
        </td>
        <td class="cart-item cart-column">
          <span class="cart-price cart-column">${item.price}</span>
        </td>
        <td class="cart-item cart-column">
          <input class="cart-quantity-input" type="number" value="1" style="width: 50px">
          <button class="btn btn-danger" type="button">Remove</button>
        </td>
      `;
      cartRow.innerHTML = cartRowContents;
      cartItemContainer.appendChild(cartRow);

      cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
      cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    });

    updateCartTotalAmount();
  }

  function removeCartItem(event) {
    const buttonClicked = event.target;
    const index = Array.from(buttonClicked.closest('.cart-items').children).indexOf(buttonClicked.closest('.cart-row'));
    cartItems.splice(index, 1);
    updateCartTotal();
  }

  function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotalAmount();
  }

  function updateCartTotalAmount() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
  
    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      const priceElement = cartRow.getElementsByClassName('cart-price')[0];
      const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
      const price = parseFloat(priceElement.innerText.replace('$', ''));
      const quantity = parseInt(quantityElement.value, 10);
      total += price * quantity;
    }
  
    // Використовуємо toFixed для округлення до двох знаків після коми
    totalAmount = parseFloat(total.toFixed(2));
  
    // Використовуємо toLocaleString для форматування числа
    const formattedTotalAmount = totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    document.getElementsByClassName('cart-total-price')[0].innerText = `$${formattedTotalAmount}`;
  }
  
  

  let priceSortDirection = 1; // 1 для зростання, -1 для спадання

  function sortProductsByPrice() {
    priceSortDirection *= -1; // Змінюємо напрямок сортування
    products.sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      return (priceA - priceB) * priceSortDirection;
    });
    renderProductList();
  }
  document.getElementById('sort-by-price').addEventListener('click', sortProductsByPrice);

  let typeSortDirection = 1; 

  function sortProductsByType() {
    typeSortDirection *= -1; 
    products.sort((a, b) => {
      const typeA = a.name.toUpperCase();
      const typeB = b.name.toUpperCase();
      return typeA.localeCompare(typeB) * typeSortDirection;
    });
    renderProductList();
  }

  
  document.getElementById('sort-by-type').addEventListener('click', sortProductsByType);

  let popularitySortDirection = 1; 

  function sortProductsByPopularity() {
    popularitySortDirection *= -1; 
    products.sort((a, b) => {
      const popularityA = a.popularity || 0;
      const popularityB = b.popularity || 0;
      return (popularityA - popularityB) * popularitySortDirection;
    });
    renderProductList();
  }

 
  document.getElementById('sort-by-popularity').addEventListener('click', sortProductsByPopularity);

  // Initial render
  renderProductList();
  renderPagination();
  
});