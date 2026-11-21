CREATE TABLE "Facility" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "capacity" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Monitoring" (
  "id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "parameter" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "activity" TEXT NOT NULL,
  CONSTRAINT "Monitoring_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Report" (
  "id" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "status" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "CommunityNote" (
  "id" INTEGER NOT NULL,
  "userId" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  CONSTRAINT "CommunityNote_pkey" PRIMARY KEY ("id")
);
