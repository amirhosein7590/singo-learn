/**
 * Base table configuration template for user/student management
 * 
 * Provides a standardized structure for tables displaying user/student information
 * and management options. Serves as a template for dynamic data population from server API responses
 * Specifically designed for administrator interfaces managing user accounts, permissions, and course enrollments
 * 
 * @constant {Object} BASE_TABLE_DATAS - Table configuration template for user management
 * @property {Array<Object>} thead - Static table header configuration for user-related columns
 * @property {number} thead[].id - Unique identifier for each column (note: non-sequential IDs)
 * @property {string} thead[].title - Display title for the column header
 * @property {Array} tbody - Empty array placeholder for dynamic user/student data from server
 * 
 * @example
 * // Expected server data structure for tbody:
 * const serverData = [
 *   {
 *     id: 1,
 *     username: "student_maryam",
 *     fullname: "مریم محمدی",
 *     phonenumber: "09123456789",
 *     email: "maryam@example.com",
 *     purchaseCourses: ["courseId", "courseId"],
 *     // ... other fields matching thead columns
 *   }
 * ];
 * 
 * @note
 * - Specifically designed for user/student management in admin panels
 * - Focuses on student accounts and their course enrollments
 * - Management actions: Edit user details, ban/suspend account, delete account
 * - Tbody is intentionally empty and will be populated dynamically from API
 * - Ensures consistent table formatting across user management features
 * - Note: Non-sequential column IDs (missing IDs: 5, 7) - ensure this matches backend data structure
 * - Note: "تخصص" column removed compared to teacher table, focusing on student-specific data
 */

const BASE_TABLE_DATAS = {
  thead: [
    { id: 1, title: "نام کاربری" },
    { id: 2, title: "نام و نام خانوادگی" },
    { id: 3, title: "شماره تلفن" },
    { id: 4, title: "ایمیل" },
    { id: 6, title: "دوره ها" },
    { id: 8, title: "ویرایش کاربر" },
    { id: 9, title: "بن کاربر" },
    { id: 10, title: "حذف کاربر" },
  ],
  tbody: [] // Will be populated with dynamic data from server API,
};

export default BASE_TABLE_DATAS;
