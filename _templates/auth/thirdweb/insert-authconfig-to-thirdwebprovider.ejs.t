---
inject: true
after: activeChain=
to: src/pages/_app.tsx
skip_if: authConfig
---
      authConfig={{
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
        authUrl: "/api/auth",
      }}
