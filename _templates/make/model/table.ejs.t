---
inject: true
append: true
to: src/database/schema.prisma
skip_if: model <%= h.capitalize(name) %>
sh: "npx prisma generate"
---
// customize your new table, please delete this comment after
model <%= h.capitalize(name) %> {
  id            Int       @id @default(autoincrement())
  <%= name %>Column String    @unique
  createdAt     DateTime? @default(now())
  updatedAt     DateTime? @updatedAt
}
