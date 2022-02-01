# Way to Success

To avoid getting lost in the long way, let's write it down, what we want:

1. Create a Shopify public app.
2. Fetch products with a thumbnail.
3. Clicking on the product should show all the images for the product and their file size.
4. A "Compress" button on each image card should compress images to less than 500kb.
5. Click on the image should show you preview, Before and After.
   6 Save button on the image should update that image in the store.

## Some info

- Public apps and custom apps that are embedded in the Shopify admin use OAuth and session tokens.

### Installation prompt

## Installation:

Sample:
https://{shop}.myshopify.com/admin/oauth/authorize?client_id={api_key}&scope={scopes}&redirect_uri={redirect_uri}&state={nonce}&grant_options[]={access_mode}

Custom:
https://duskylory-store.myshopify.com/admin/oauth/authorize?client_id=b280fb1ae64bc9980f2e8e1156e4627c&scope=unauthenticated_read_product_listings,write_products&redirect_uri=http://localhost:4200/login_redirect&state=1

## Confirm Installation:

Sample:
https://example.org/some/redirect/uri?code={code}&hmac=da9d83c171400a41f8db91a950508985&host={base64_encoded_hostname}&shop={shop_origin}&state={nonce}&timestamp=1409617544

Custom:
http://localhost:4200/login_redirect?code=d23ad2d639b1c36bf339702b753702c4&hmac=3dc35b71a7b7d92fc6e2c865b0f9a18787fd6afded2860d7bf04e780ae0a0abc&host=ZHVza3lsb3J5LXN0b3JlLm15c2hvcGlmeS5jb20vYWRtaW4&shop=duskylory-store.myshopify.com&state=1&timestamp=1642356068

## Get a permanent access token:

POST: https://duskylory-store.myshopify.com/admin/oauth/access_token
Params: client_id, client_secret, code

```sh
curl -X POST --data '{"client_id":"b280fb1ae64bc9980f2e8e1156e4627c", "client_secret": "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", "code": "d23ad2d639b1c36bf339702b753702c4"}' https://duskylory-store.myshopify.com/admin/oauth/access_token
```

## Access Token

```json
{
  "access_token": "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",
  "scope": "unauthenticated_read_product_listings,write_products"
}
```
