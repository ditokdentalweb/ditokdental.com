let allProducts = []; // Tüm ürünleri burada tutarız

function renderProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-category", product.category);

    card.innerHTML = /*`
      <p style="font-size: 13px; color: #999;">ID: ${product.id}</p>*/
      `<img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price} TL</p>

      <div class="button-group">
        <a href="detay.html?id=${product.id}" class="detail-button">Detayları Gör</a>
        <a href="${product.link}" target="_blank" class="buy-button">Satın Al</a>
      </div>
    `;

    container.appendChild(card);
  });
}

// Kategori filtreleme
function filterProducts(category) {
  document.getElementById("search-input").value = "";

  const buttons = document.querySelectorAll("#filter-buttons button");
  buttons.forEach(btn => {
    if (btn.textContent === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (category === "Hepsi") {
    allProducts.sort((a, b) => a.category.localeCompare(b.category));
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Arama kutusuna göre filtreleme
function searchProducts() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();

  const filtered = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  const buttons = document.querySelectorAll("#filter-buttons button");
  buttons.forEach(btn => btn.classList.remove("active"));

  renderProducts(filtered);
}

// JSON'dan ürünleri al ve başlat
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    allProducts = data;
    allProducts.sort((a, b) => a.category.localeCompare(b.category));
    renderProducts(allProducts);
  })
  .catch(error => {
    console.error("Ürün verileri yüklenemedi:", error);
  });

// Scroll to Top görünürlüğü
window.onscroll = function () {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Yukarı kaydır
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
