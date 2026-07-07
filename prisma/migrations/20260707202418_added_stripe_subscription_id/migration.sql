/*
  Warnings:

  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripe_subscription_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "stripe_subscription_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripe_subscription_id_key" ON "subscriptions"("stripe_subscription_id");
