-- CreateTable
CREATE TABLE "visitor_days" (
    "day" DATE NOT NULL,
    "visitorHash" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 1,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_days_pkey" PRIMARY KEY ("day","visitorHash")
);

-- CreateIndex
CREATE INDEX "visitor_days_day_idx" ON "visitor_days"("day");
