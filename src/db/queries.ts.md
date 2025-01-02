# Course Progress API Documentation

## Overview

This module provides a set of cached database query functions for managing user progress, courses, units, lessons, and challenges in a learning management system. The system uses Drizzle ORM for database operations and Clerk for authentication.

## Key Features

- User progress tracking
- Course and lesson management
- Challenge completion status
- Progress calculation and normalization

## API Reference

### `getUserProgress()`

Retrieves the current user's progress including their active course.

**Returns:**

- `UserProgress | null`: User progress data with active course information
- Returns `null` if user is not authenticated

### `getUnits()`

Retrieves all units for the user's active course with normalized completion data.

**Returns:**

- `Unit[]`: Array of units with nested lessons and challenges
- Each unit includes:
  - Lesson data
  - Challenge progress
  - Normalized completion status for each lesson

**Implementation Note:**

- Requires authenticated user with an active course
- Returns empty array if conditions aren't met

### `getCourses()`

Retrieves all available courses.

**Returns:**

- `Course[]`: Array of all courses in the system

### `getCourseById(courseId: number)`

Retrieves a specific course by ID.

**Parameters:**

- `courseId`: Numeric identifier for the course

**Returns:**

- `Course | null`: Course data if found

**Note:** Currently does not populate units and lessons (marked as TODO)

### `getCourseProgress()`

Calculates and retrieves detailed progress information for the user's active course.

**Returns:**

```typescript
{
  activeLesson: Lesson | undefined,
  activeLessonId: number | undefined
}
```

**Implementation Details:**

- Finds the first uncompleted lesson across all units
- Orders units and lessons by their respective `order` fields
- Includes challenge progress for determining completion status

### `getLesson(id?: number)`

Retrieves lesson data with challenge information.

**Parameters:**

- `id` (optional): Specific lesson ID to retrieve

**Returns:**

- `Lesson | null`: Lesson data with normalized challenge completion status
- Includes:
  - Challenge details
  - Challenge options
  - User's progress for each challenge

### `getLessonPercentage()`

Calculates the completion percentage for the current active lesson.

**Returns:**

- `number`: Percentage of completed challenges (0-100)
- Returns 0 if no active lesson or lesson data is available

## Data Normalization

The API implements several normalization patterns:

1. **Lesson Completion:**

   ```typescript
   completed = allChallenges.every(
     (challenge) =>
       challenge.challengeProgress?.length > 0 &&
       challenge.challengeProgress.every((progress) => progress.completed)
   );
   ```

2. **Challenge Completion:**
   ```typescript
   completed =
     challenge.challengeProgress?.length > 0 &&
     challenge.challengeProgress.every((progress) => progress.completed);
   ```

## Performance Considerations

- All functions are wrapped with React's `cache()` to prevent redundant database queries
- Queries use efficient joins through Drizzle's query builder
- Nested relationships are handled through the `with` clause for optimal database access

## Authentication Requirements

- Most functions require an authenticated user (via Clerk)
- Functions return `null` or empty arrays when authentication is missing
- User ID is consistently checked before database operations

## Database Schema Dependencies

The module interacts with the following tables:

- `userProgress`
- `courses`
- `units`
- `lessons`
- `challengeProgress`
- `challengeOptions`

## TODOs and Future Improvements

1. Verify whether ordering is needed in the `getUnits()` function
2. Populate units and lessons in `getCourseById()`
3. Validate completion logic in `getCourseProgress()` and `getLesson()`

## Usage Example

```typescript
// Get user's current progress
const progress = await getUserProgress();

// Get all units for active course with completion status
const units = await getUnits();

// Calculate lesson completion percentage
const percentage = await getLessonPercentage();
```
