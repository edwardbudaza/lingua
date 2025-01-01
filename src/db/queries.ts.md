# 📄 API Utilities Documentation

This document provides a detailed explanation of utility functions used for interacting with the database. These functions leverage **Drizzle ORM**, **Clerk authentication**, and **React's cache** to fetch and normalize data for efficient server-side operations.

---

## 📋 **Function Overview**

### 1. `getUserProgress`

Fetches the progress of the currently authenticated user.

### 2. `getUnits`

Retrieves all units associated with the authenticated user's active course and normalizes lesson data.

### 3. `getCourses`

Fetches a list of all available courses from the database.

### 4. `getCourseById`

Fetches a specific course by its ID (future functionality includes populating related units and lessons).

## 🔍 **Function Details**

### 1. 🚦 **`getUserProgress`**

```javascript
export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});
```

#### **Purpose:**

- Fetches the progress of the currently logged-in user.
- Includes details of the user's active course, if any.

#### **Steps:**

1. Retrieve the authenticated user's ID using **Clerk's `auth` function**.
2. Return `null` if no `userId` is available (e.g., unauthenticated users).
3. Query the `userProgress` table for the user's progress:
   - Filters by `userId`.
   - Includes the `activeCourse` relationship.
4. Return the retrieved progress data.

#### **Caching:**

- Uses React's `cache` for efficient server-side data reuse.

---

### 2. 📚 **`getUnits`**

```javascript
export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: true,
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });

      return { ...lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});
```

#### **Purpose:**

- Fetches all units for the authenticated user's active course.
- Normalizes lesson data to include a `completed` status.

#### **Steps:**

1. Call `getUserProgress` to fetch the current user's progress.
2. If no `activeCourseId` exists, return an empty array.
3. Query the `units` table for all units linked to the `activeCourseId`:
   - Includes nested relationships: `lessons`, `challenges`, and `challengeProgress`.
4. Normalize the fetched data:
   - For each lesson, determine whether all challenges are completed.
   - Add a `completed` flag to each lesson.
5. Return the normalized data.

#### **Caching:**

- Ensures efficient reuse of the computed units data.

---

### 3. 🏫 **`getCourses`**

```javascript
export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});
```

#### **Purpose:**

- Fetches all available courses from the `courses` table.

#### **Steps:**

1. Query the `courses` table using `findMany`.
2. Return the retrieved list of courses.

#### **Caching:**

- Caches the list of courses to reduce redundant database calls.

---

### 4. 🔍 **`getCourseById`**

```javascript
export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons
  });

  return data;
});
```

#### **Purpose:**

- Fetches a specific course by its ID.

#### **Steps:**

1. Accept `courseId` as a parameter.
2. Query the `courses` table for the specified course ID using `findFirst`.
   - Currently, additional relationships (units, lessons) are not populated but are planned as part of a future enhancement.
3. Return the course data.

#### **Caching:**

- Ensures the course details are efficiently fetched and reused.

---

## 🎯 **Key Features**

1. **Authentication-Aware Queries**: Functions like `getUserProgress` and `getUnits` are tied to the authenticated user's context.
2. **Data Normalization**: The `getUnits` function processes and enhances raw database data with computed fields (e.g., lesson completion status).
3. **Efficient Caching**: React's `cache` optimizes database interactions and minimizes redundant queries.
4. **Future Extendability**: Functions like `getCourseById` are designed to support enhancements like populating related units and lessons.

---

## 🚀 **Potential Enhancements**

1. **Populate Relationships in `getCourseById`:**
   - Fetch related units, lessons, and challenges to provide comprehensive course details.
2. **Dynamic User Subscription Status:**
   - Enhance `getUserProgress` to include subscription-related data (e.g., `hasActiveSubscription`).
3. **Error Handling:**
   - Add robust error handling to manage database or authentication failures gracefully.

---

## 🔑 **Code Highlights**

- **Type-Safe Queries**: Leveraging **Drizzle ORM**'s type-safe database interaction.
- **Normalized Data**: Streamlined data structures for lessons and units.
- **Reusability**: Shared caching mechanisms ensure consistency across different parts of the application.

```

```
