-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "accountType" TEXT NOT NULL DEFAULT 'individual',
    "businessName" TEXT,
    "avatar" TEXT,
    "address" TEXT,
    "bio" TEXT,
    "profileComplete" BOOLEAN NOT NULL DEFAULT false,
    "authProvider" TEXT NOT NULL DEFAULT 'password',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
