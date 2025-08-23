/**
 * Base table configuration template for course season/chapter management
 * 
 * Provides a standardized structure for tables displaying course chapter/season information
 * Serves as a template for dynamic data population from server API responses
 * Specifically designed for managing course curriculum structure and chapter details
 * 
 * @constant {Object} BASE_SEASION_TABLE_DATAS - Table configuration template for season management
 * @property {Array<Object>} thead - Static table header configuration for chapter-related columns
 * @property {number} thead[].id - Unique identifier for each column
 * @property {string} thead[].title - Display title for the column header
 * @property {Array} tbody - Empty array placeholder for dynamic chapter/season data from server
 * 
 * @example
 * // Expected server data structure for tbody:
 * const serverData = [
 *   {
 *     id: 1,
 *     seasion: "فصل ۱",
 *     title: "مقدمه ای بر React",
 *     courseName: "React از صفر تا پیشرفته",
 *     isFree: "true | false",
 *     // ... other fields matching thead columns
 *   }
 * ];
 * 
 * @note
 * - Specifically designed for course chapter/season management interfaces
 * - Focuses on curriculum structure and chapter organization
 * - Includes payment status column for monetization tracking
 * - Tbody is intentionally empty and will be populated dynamically from API
 * - Ensures consistent table formatting across curriculum management features
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
