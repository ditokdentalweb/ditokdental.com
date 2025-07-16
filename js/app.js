let allProducts = []; // Tüm ürünleri burada tutarız

// Ürünleri yükle
async function loadProducts() {
  try {
    const response = await fetch('data/products.json');
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Ürünler yüklenirken hata oluştu:', error);
    document.getElementById('product-container').innerHTML = '<p class="error-message">Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>';
  }
}

// Ürünleri görüntüle
function renderProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';

  products.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description || 'Ürün açıklaması bulunmamaktadır.'}</p>
          <div class="product-price">${formatPrice(product.price)} TL</div>
          <div class="product-actions">
            <a href="detay.html?id=${product.id}" class="view-details">Detaylar</a>
            <a href="${product.link}" target="_blank" class="buy-now">Satın Al</a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += productCard;
  });
}

// Fiyat formatla
function formatPrice(price) {
  return price.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Ürünleri filtrele
function filterProducts(category) {
  const buttons = document.querySelectorAll('#filter-buttons button');
  buttons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent === category) {
      button.classList.add('active');
    }
  });

  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const filteredProducts = category === 'Hepsi' 
        ? products 
        : products.filter(product => product.category === category);
      renderProducts(filteredProducts);
    })
    .catch(error => {
      console.error('Ürünler filtrelenirken hata oluştu:', error);
    });
}

// Ürün ara
function searchProducts() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase();

  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
      renderProducts(filteredProducts);
    })
    .catch(error => {
      console.error('Ürün araması sırasında hata oluştu:', error);
    });
}

// Yukarı çık butonu
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Scroll olayını dinle
window.onscroll = function() {
  const scrollButton = document.getElementById('scrollTopBtn');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = 'flex';
  } else {
    scrollButton.style.display = 'none';
  }
};

// Sayfa yüklendiğinde ürünleri getir
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  
  // URL'den kategori parametresini kontrol et
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  if (category) {
    filterProducts(category);
  }
});
