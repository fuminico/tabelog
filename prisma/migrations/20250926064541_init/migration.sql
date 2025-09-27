-- CreateTable
CREATE TABLE "Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "photo_url" TEXT,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "store_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
