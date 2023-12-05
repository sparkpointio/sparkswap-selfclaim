---
inject: true
after: <ConnectWallet
to: src/resources/components/Navbar/Navbar.tsx
skip_if: loginOptional
---
              auth={{
                loginOptional: false
              }}
