import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { seeker, company } from ".";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["seeker", "company"] }).notNull(), // Enum for roles
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(user, ({ one }) => ({
  seeker: one(seeker, {
    fields: [user.id],
    references: [seeker.user_id],
  }),
  company: one(company, {
    fields: [user.id],
    references: [company.user_id],
  }),
}));
