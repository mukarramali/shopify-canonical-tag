# Shopify App

## Development

Follow documentation: https://shopify.dev/apps/getting-started/create

## Theme Extension

https://github.com/Shopify/product-reviews-sample-app
https://shopify.dev/apps/online-store/theme-app-extensions/getting-started

### Link to install the block

https://duskylory-store.myshopify.com/admin/themes/current/editor?context=apps&template=product&activateAppId=47bdd50d-78ab-488d-8cc3-1593ea342f33/canonicalTag

### Link to verify the block installation is done

https://shopify.dev/api/admin-graphql/2022-01/objects/scripttag#top

Or settings_data.json

```json
{
  "current": {
    "blocks": {
      "SOME_ID": {
        "type": "String to search theme-extension uuid into",
        "disabled": true
      }
    }
  }
}
```

Theme:

https://duskylory-store.myshopify.com/admin/api/2021-10/themes.json

https://duskylory-store.myshopify.com/admin/api/2021-10/themes/121256017943/assets.json

https://duskylory-store.myshopify.com/admin/themes/121256017943/assets.json?asset[key]=config/settings_data.json
