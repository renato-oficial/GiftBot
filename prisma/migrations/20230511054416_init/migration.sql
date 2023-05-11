-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatId" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT,
    "orderId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "user_chatId_key" ON "user"("chatId");
