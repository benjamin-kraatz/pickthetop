import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTableCreator,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ptt_${name}`);

export const quizAnswerState = pgEnum("quiz_answer_state", [
  "correct",
  "incorrect",
]);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),

  completedSetup: boolean("completed_setup").default(false),
});

export const usersRelations = relations(users, ({ many }) => ({
  quizAnswers: many(quizAnswers),
}));

export const quizAnswers = createTable(
  "quiz_answer",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    timestamp: timestamp("timestamp", {
      mode: "date",
      withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),

    roundId: varchar("round_id", { length: 255 }).notNull(),
    questionId: varchar("question_id", { length: 255 }).notNull(),
    state: quizAnswerState("state").notNull(),
    timeLeft: integer("time_left").notNull().default(0),

    userId: varchar("user_id", { length: 255 })
      .references(() => users.id)
      .notNull(),
  },
  (tbl) => ({
    uniq_answer: uniqueIndex("uniq_answer").on(
      tbl.userId,
      tbl.roundId,
      tbl.questionId,
    ),
  }),
);

export const quizAnswersRelations = relations(quizAnswers, ({ one }) => ({
  user: one(users, { fields: [quizAnswers.userId], references: [users.id] }),
}));
