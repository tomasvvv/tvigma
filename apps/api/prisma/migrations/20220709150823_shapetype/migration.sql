-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shape" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "layerId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "scaleX" REAL NOT NULL,
    "scaleY" REAL NOT NULL,
    "shape" TEXT NOT NULL DEFAULT 'rect',
    CONSTRAINT "Shape_layerId_fkey" FOREIGN KEY ("layerId") REFERENCES "Layer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shape" ("id", "layerId", "scaleX", "scaleY", "x", "y") SELECT "id", "layerId", "scaleX", "scaleY", "x", "y" FROM "Shape";
DROP TABLE "Shape";
ALTER TABLE "new_Shape" RENAME TO "Shape";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
