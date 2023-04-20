export async function getCategories() {
  const urlAPI = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(urlAPI);
  const data = result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlAPI = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const result = await fetch(urlAPI);
  const data = result.json();
  return data;
}

export async function getProductById(productId) {
  const urlAPI = `https://api.mercadolibre.com/items/${productId}`;
  const result = await fetch(urlAPI);
  const data = result.json();
  return data;
}

export async function getProductByQuery(query) {
  const urlAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const result = await fetch(urlAPI);
  const data = result.json();
  return data;
}

export async function getProductByCategory(categoryId) {
  const urlAPI = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const result = await fetch(urlAPI);
  const data = result.json();
  return data;
}
