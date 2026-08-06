-- CreateTable
CREATE TABLE "CompanyInfo" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "phone1Label" TEXT NOT NULL,
    "phone1Number" TEXT NOT NULL,
    "phone2Label" TEXT NOT NULL,
    "phone2Number" TEXT NOT NULL,
    "address" TEXT,
    "regionWholesale" TEXT NOT NULL,
    "regionRetail" TEXT NOT NULL,
    "deliveryNote" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SiteStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);
