import { environment } from "../environment";

export function buildInstallationURL(shop: string) {
  return `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${environment.API_KEY}&scope=${environment.SCOPES}&redirect_uri=${environment.REDIRECT_URI}&state=1`;
}

export function buildConfirmationURL(shop: string) {
  return `https://${shop}.myshopify.com/admin/oauth/access_token`;
}
