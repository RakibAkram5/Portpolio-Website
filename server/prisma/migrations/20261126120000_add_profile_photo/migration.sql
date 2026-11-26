-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "photoData" BYTEA,
ADD COLUMN     "photoMime" TEXT,
ADD COLUMN     "photoUpdatedAt" TIMESTAMP(3);
