---
inject: true
after: ...prisma.user
to: src/library/models/user.model.ts
skip_if: login
---
  login: async (data: {
    walletAddress: string,
  }): Promise<User> => {
    return prisma.user.upsert({
      where: {
        walletAddress: data.walletAddress
      },
      update: {
        lastLoginAt: new Date(Date.now()).toISOString()
      },
      create: {
        walletAddress: data.walletAddress,
        lastLoginAt: new Date(Date.now()).toISOString()
      },
    })
  },
