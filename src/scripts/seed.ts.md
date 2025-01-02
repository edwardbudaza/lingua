# Database Seeding Script Documentation

## Overview

This script initializes a language learning platform's database with sample data using Drizzle ORM and Neon Database. It sets up courses, units, lessons, challenges, and their associated options.

## Configuration

### Dependencies

```typescript
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
```

### Environment Variables

- `DATABASE_URL`: Neon database connection string (required)

## Database Connection Setup

```typescript
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
```

## Seeding Process

### 1. Data Cleanup

The script first removes existing data in the following order:

```typescript
await db.delete(schema.courses);
await db.delete(schema.userProgress);
await db.delete(schema.units);
await db.delete(schema.lessons);
await db.delete(schema.challengeOptions);
await db.delete(schema.challengeProgress);
```

### 2. Data Insertion

#### Courses

```typescript
{
  id: number,
  title: string,     // Language name
  imageSrc: string   // Path to language flag SVG
}
```

Available courses:

- Spanish (id: 1)
- Italian (id: 2)
- French (id: 3)
- Croatian (id: 4)

#### Units

```typescript
{
  id: number,
  courseId: number,    // References courses.id
  title: string,
  description: string,
  order: number
}
```

Current setup:

- Unit 1: Basic Spanish (courseId: 1)

#### Lessons

```typescript
{
  id: number,
  unitId: number,     // References units.id
  order: number,      // Determines lesson sequence
  title: string
}
```

Available lessons for Unit 1:

1. Nouns
2. Verbs
3. Adjectives
4. Adverbs
5. Prepositions

#### Challenges

```typescript
{
  id: number,
  lessonId: number,   // References lessons.id
  type: 'SELECT',     // Challenge type
  order: number,
  question: string
}
```

Sample challenge:

- ID: 1
- Lesson: Nouns
- Question: "Which one of these is 'the man'?"

#### Challenge Options

```typescript
{
  id: number,
  challengeId: number,  // References challenges.id
  imageSrc: string,     // Path to option image
  correct: boolean,     // Whether this is the correct answer
  text: string,         // Option text (in target language)
  audioSrc: string      // Path to audio file
}
```

Available options for "the man" challenge:

1. "el hombre" (correct)
2. "la mujer"
3. "el robot"

## Asset Requirements

### Images

- Language flags: `/es.svg`, `/it.svg`, `/fr.svg`, `/hr.svg`
- Challenge images: `/main.svg`, `/woman.svg`, `/robot.svg`

### Audio

- Spanish pronunciations: `/es_man.mp3`, `/es_woman.mp3`, `/es_robot.mp3`

## Error Handling

The script includes basic error handling:

```typescript
try {
  // Seeding operations
} catch (error) {
  console.error(error);
  throw new Error('Failed to seed the database');
}
```

## Usage

### Running the Script

```bash
npm run db:seed

```

### Adding New Data

To add new courses:

```typescript
await db.insert(schema.courses).values([
  {
    id: [next_id],
    title: [language_name],
    imageSrc: [flag_path],
  },
]);
```

To add new lessons:

```typescript
await db.insert(schema.lessons).values([
  {
    id: [next_id],
    unitId: [parent_unit_id],
    order: [sequence_number],
    title: [lesson_title],
  },
]);
```

## Best Practices

1. **ID Management**

   - Use sequential IDs for easy reference
   - Maintain ID consistency across related entities

2. **Asset Organization**

   - Keep all images in a public directory
   - Follow consistent naming patterns for assets

3. **Data Order**

   - Follow the established insertion order to maintain referential integrity
   - Clean up data in reverse order of dependencies

4. **Error Handling**
   - Always wrap seeding operations in try-catch blocks
   - Log detailed error information for debugging

## Maintenance

When updating the seed script:

1. Ensure new entities respect existing relationships
2. Update cleanup operations if adding new tables
3. Verify all required assets exist
4. Test the complete seeding process in a development environment

## Future Improvements

1. Add more language courses
2. Include more varied challenge types
3. Add difficulty levels to challenges
4. Implement progress tracking seeds
5. Add more comprehensive error handling
