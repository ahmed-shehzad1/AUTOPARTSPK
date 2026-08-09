-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "partBrand" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "wholesalePrice" INTEGER NOT NULL,
    "wholesaleMinQty" INTEGER NOT NULL,
    "moq" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "rfqThreshold" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoryId", "condition", "createdAt", "description", "id", "moq", "name", "partBrand", "partNo", "price", "rfqThreshold", "stock", "unit", "updatedAt", "wholesaleMinQty", "wholesalePrice") SELECT "categoryId", "condition", "createdAt", "description", "id", "moq", "name", "partBrand", "partNo", "price", "rfqThreshold", "stock", "unit", "updatedAt", "wholesaleMinQty", "wholesalePrice" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_partNo_key" ON "Product"("partNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
