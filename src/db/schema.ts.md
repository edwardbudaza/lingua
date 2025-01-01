# 📚 Database Schema Documentation

This document explains the schema of a database designed for a Lingua learning platform. The schema uses **Drizzle ORM** for defining tables and their relationships. Below is a step-by-step breakdown of each table and its relations.

---

## 1. 🎓 Courses Table

### Definition:

The `courses` table represents the courses available in the platform.

### Schema:

```javascript
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(), // Primary key (auto-incrementing)
  title: text('title').notNull(), // Title of the course (required)
  imageSrc: text('image_src').notNull(), // URL of the course image (required)
});
```

### Relationships:

```javascript
export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress), // Links to the progress of users in this course
  units: many(units), // Links to units in the course
}));
```

---

## 2. 📦 Units Table

### Definition:

The `units` table represents the units within a course.

### Schema:

```javascript
export const units = pgTable('units', {
  id: serial('id').primaryKey(), // Primary key
  title: text('title').notNull(), // Unit title (required)
  description: text('description').notNull(), // Unit description (required)
  courseId: integer('course_id')
    .references(() => courses.id, { onDelete: 'cascade' }) // Foreign key to `courses`
    .notNull(),
  order: integer('order').notNull(), // Display order of the unit
});
```

### Relationships:

```javascript
export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id], // Relates to the course
  }),
  lesson: many(lessons), // Links to lessons in the unit
}));
```

---

## 3. 📖 Lessons Table

### Definition:

The `lessons` table represents lessons within a unit.

### Schema:

```javascript
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(), // Primary key
  title: text('title').notNull(), // Lesson title (required)
  unitId: integer('unit_id')
    .references(() => units.id, { onDelete: 'cascade' }) // Foreign key to `units`
    .notNull(),
  order: integer('order').notNull(), // Display order of the lesson
});
```

### Relationships:

```javascript
export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id], // Links to the parent unit
  }),
  challenges: many(challenges), // Links to challenges in the lesson
}));
```

---

## 4. 🏆 Challenges Table

### Definition:

The `challenges` table stores challenges for lessons.

### Schema:

```javascript
export const challenges = pgTable('challenges', {
  id: serial('id').primaryKey(), // Primary key
  lessonId: integer('lesson_id')
    .references(() => lessons.id, { onDelete: 'cascade' }) // Foreign key to `lessons`
    .notNull(),
  type: challengesEnum('type').notNull(), // Enum for challenge type
  question: text('question').notNull(), // Challenge question (required)
  order: integer('order').notNull(), // Display order of the challenge
});
```

### Relationships:

```javascript
export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id], // Links to the parent lesson
  }),
  challengeOptions: many(challengeOptions), // Links to challenge options
  challengeProgress: many(challengeProgress), // Links to user progress in challenges
}));
```

---

## 5. 📝 Challenge Options Table

### Definition:

The `challenge_options` table stores possible answers for challenges.

### Schema:

```javascript
export const challengeOptions = pgTable('challenge_options', {
  id: serial('id').primaryKey(), // Primary key
  challengeId: integer('challenge_id')
    .references(() => challenges.id, { onDelete: 'cascade' }) // Foreign key to `challenges`
    .notNull(),
  text: text('text').notNull(), // Option text
  correct: boolean('correct').notNull(), // Whether the option is correct
  imageSrc: text('image_src'), // Optional image for the option
  audioSrc: text('audio_src'), // Optional audio for the option
});
```

### Relationships:

```javascript
export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id], // Links to the parent challenge
    }),
  })
);
```

---

## 6. 🚀 User Progress Table

### Definition:

The `user_progress` table tracks user progress in courses.

### Schema:

```javascript
export const userProgress = pgTable('user_progress', {
  userId: text('user_id').primaryKey(), // Unique user ID
  userName: text('user_name').notNull().default('User'), // User's name (default: "User")
  userImageSrc: text('user_image_src').notNull().default('/mascort.svg'), // User's avatar
  activeCourseId: integer('active_course_id').references(() => courses.id, {
    onDelete: 'cascade',
  }), // Active course ID
  hearts: integer('hearts').notNull().default(5), // Hearts (lives) remaining
  points: integer('points').notNull().default(0), // Points accumulated
});
```

### Relationships:

```javascript
export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id], // Links to the active course
  }),
}));
```

---

## 7. 📊 Challenge Progress Table

### Definition:

The `challenge_progress` table tracks users' progress in challenges.

### Schema:

```javascript
export const challengeProgress = pgTable('challenge_progress', {
  id: serial('id').primaryKey(), // Primary key
  userId: text('user_id').notNull(), // User ID
  challengeId: integer('challenge_id')
    .references(() => challenges.id, { onDelete: 'cascade' }) // Foreign key to `challenges`
    .notNull(),
  completed: boolean('completed').notNull().default(false), // Completion status
});
```

### Relationships:

```javascript
export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id], // Links to the parent challenge
    }),
  })
);
```

---

### 🎯 **Key Notes:**

- All foreign key references use `onDelete: 'cascade'` to ensure referential integrity.
- Relationships are explicitly defined for clarity and ease of querying.
- Enum `challengesEnum` is used to define challenge types (`SELECT`, `ASSIST`).

```

```
