# Shopify App

## Development

Follow documentation: https://shopify.dev/apps/getting-started/create

{%- if product.metafields.custom.canonical_url != blank  -%}
<link rel="canonical" href="{{ product.metafields.custom.canonical_url }}">
{%- elsif canonical_url != blank -%}
<link rel="canonical" href="{{ canonical_url }}">
{%- endif -%}
