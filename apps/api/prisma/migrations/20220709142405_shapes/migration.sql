/*
  Warnings:

  - Added the required column `name` to the `Layer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Shape" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "layerId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "scaleX" REAL NOT NULL,
    "scaleY" REAL NOT NULL,
    CONSTRAINT "Shape_layerId_fkey" FOREIGN KEY ("layerId") REFERENCES "Layer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Layer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Layer" ("id") SELECT "id" FROM "Layer";
DROP TABLE "Layer";
ALTER TABLE "new_Layer" RENAME TO "Layer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
