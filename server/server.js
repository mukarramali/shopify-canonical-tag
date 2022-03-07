import "@babel/polyfill";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import { receiveWebhook } from "@shopify/koa-shopify-webhooks";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import dotenv from "dotenv";
import "isomorphic-fetch";
import Koa from "koa";
import Router from "koa-router";
import next from "next";

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  API_VERSION: ApiVersion.October21,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = accessToken;

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    const shop =
      ctx.query?.shop ||
      ctx.params?.shop ||
      new URLSearchParams(ctx.req.headers.referer).get("shop");
    ctx.response.set(
      "Content-Security-Policy",
      `frame-ancestors https://${shop} https://admin.shopify.com;`
    );
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.post("/webhooks/shop_redact", webhook, (ctx, next) => {
    ctx.body = {
      success: true,
    };
  });

  router.post("/webhooks/customers_redact", webhook, (ctx, next) => {
    ctx.body = {
      success: true,
    };
  });

  router.post("/webhooks/customers_data_request", webhook, (ctx, next) => {
    ctx.body = {
      success: true,
    };
  });

  router.get("/api/theme/assets/blocks/:shop", async (ctx, next) => {
    const shop = ctx.params.shop;
    const accessToken = ACTIVE_SHOPIFY_SHOPS[shop];
    const client = new Shopify.Clients.Rest(shop, accessToken);

    const themes = (
      await client.get({
        path: "themes",
      })
    ).body.themes;

    const themeId = themes.filter(({ role }) => role === "main")[0].id;

    const asset = (
      await client.get({
        path: `themes/${themeId}/assets`,
        query: { "asset[key]": "config/settings_data.json", fields: "value" },
      })
    ).body.asset;

    ctx.body = {
      blocks: JSON.parse(asset.value).current?.blocks,
    };
  });

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
