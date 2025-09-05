/**
 * Base table configuration template for session/lesson management within chapters
 * 
 * Provides a standardized structure for tables displaying individual session/lesson details
 * within course chapters. Serves as a template for dynamic data population from server API responses
 * Specifically designed for managing individual lessons within course chapters/curriculum
 * 
 * @constant {Object} BASE_SESSION_TABLE_DATAS - Table configuration template for session management
 * @property {Array<Object>} thead - Static table header configuration for session-related columns
 * @property {number} thead[].id - Unique identifier for each column
 * @property {string} thead[].title - Display title for the column header
 * @property {Array} tbody - Empty array placeholder for dynamic session/lesson data from server
 * 
 * @example
 * // Expected server data structure for tbody:
 * const serverData = [
 *   {
 *     id: 1,
 *     duration: "۴۵:۳۰",
 *     title: "آشنایی با کامپوننت‌ها در React",
 *     seasionName: "فصل ۲ - مباحث پیشرفته",
 *     videoUrl : "https://example-video.mp4"
 *     // ... other fields matching thead columns
 *   }
 * ];
 * 
 * @note
 * - Specifically designed for individual session/lesson management within chapters
 * - Focuses on lesson-level details including duration and hierarchical organization
 * - Hierarchical structure: Course → Chapter → Session
 * - Tbody is intentionally empty and will be populated dynamically from API
 * - Ensures consistent table formatting across session management features
 * - Duration format expected: "HH:MM" or localized time format
 */

const BASE_SEASION_TABLE_DATAS = {
  thead: [
    { id: 1, title: "شماره سرفصل" },
    { id: 2, title: "عنوان سرفصل" },
    { id: 3, title: "نام دوره" },
    { id: 4, title: "وضعیت پرداخت" },
    { id: 5, title: "ویرایش" },
    { id: 6, title: "حذف" },
  ],
  tbody: [] // Will be populated with dynamic data from server API,
};

export default BASE_SEASION_TABLE_DATAS;