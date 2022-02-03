# Shopify App

## Development

Follow documentation: https://shopify.dev/apps/getting-started/create

## ToDo

Follow: https://www.shopify.com/partners/blog/theme-app-extensions

Create a snippet in `snippets/canonicalTag.liquid`

```liquid
{%- if product.metafields.custom.canonical_url != blank  -%}
  <link rel="canonical" href="{{ product.metafields.custom.canonical_url }}">
{%- elsif canonical_url != blank -%}
  <link rel="canonical" href="{{ canonical_url }}">
{%- endif -%}
```

Add this snipper to `layout/theme.liquid`, just after `head` tag

```liquid
<head>{% include 'canonicalTag' %}
```
