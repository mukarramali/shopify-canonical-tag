const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const SHOP_KEY = "SHOP_KEY";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getShopToken() {
  return localStorage.getItem(SHOP_KEY);
}

export function setShop(shop: string) {
  localStorage.setItem(SHOP_KEY, shop);
}
