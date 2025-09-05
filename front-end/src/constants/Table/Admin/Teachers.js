/**
 * Base table configuration template for teacher/instructor management
 * 
 * Provides a standardized structure for tables displaying teacher/instructor information
 * and management options. Serves as a template for dynamic data population from server API responses
 * Specifically designed for administrator interfaces managing instructor accounts and permissions
 * 
 * @constant {Object} BASE_TABLE_DATAS - Table configuration template for teacher management
 * @property {Array<Object>} thead - Static table header configuration for teacher-related columns
 * @property {number} thead[].id - Unique identifier for each column
 * @property {string} thead[].title - Display title for the column header
 * @property {Array} tbody - Empty array placeholder for dynamic teacher/instructor data from server
 * 
 * @example
 * // Expected server data structure for tbody:
 * const serverData = [
 *   {
 *     id: 1,
 *     username: "teacher_john",
 *     fullname: "امیرحسین",
 *     phonenumber: "09123456789",
 *     email: "john@example.com",
 *     courseIds: ["courseId", "courseId"],
 *     courses: ["React مقدماتی", "Node.js پیشرفته"],
 *     // ... other fields matching thead columns
 *   }
 * ];
 * 
 * @note
 * - Specifically designed for teacher/instructor management in admin panels
 * - Includes comprehensive teacher profile information and management actions
 * - Management actions: Edit teacher details, ban/suspend account, delete account
 * - Tbody is intentionally empty and will be populated dynamically from API
 * - Ensures consistent table formatting across teacher management features
 */


const BASE_TABLE_DATAS = {
  thead: [
    { id: 1, title: "نام کاربری" },
    { id: 2, title: "نام و نام خانوادگی" },
    { id: 3, title: "شماره تلفن" },
    { id: 4, title: "ایمیل" },
    { id: 5, title: "تخصص" },
    { id: 6, title: "دوره ها" },
    { id: 7, title: "ویرایش مدرس" },
    { id: 8, title: "بن مدرس" },
    { id: 9, title: "حذف مدرس" },
  ],
  tbody: []  // Will be populated with dynamic data from server API,
};

export default BASE_TABLE_DATAS;
