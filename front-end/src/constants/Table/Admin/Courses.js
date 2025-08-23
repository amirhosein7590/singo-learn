/**
 * Table configuration template for dynamic data rendering
 * 
 * Provides a structured template for table headers and serves as a placeholder
 * for dynamic table data that will be populated from server API responses
 * 
 * @constant {Object} TABLE_DATAS - Table configuration template object
 * @property {Array<Object>} thead - Table header configuration with static content
 * @property {number} thead[].id - Unique identifier for each column
 * @property {string} thead[].title - Display title for the column header
 * @property {Array} tbody - Empty array placeholder for dynamic row data from server
 * 
 * @example
 * // Expected server data structure for tbody:
 * const serverData = [
 *   {
 *     id: 1,
 *     courseTitle: "React Advanced",
 *     price: "۲۹۰,۰۰۰ تومان",
 *     duration: "۲۰ ساعت",
 *     studentsCount: ۱۵۰,
 *     isSupport: "true | false",
 *     // ... other fields matching thead columns
 *   }
 * ];
 * 
 * @note
 * - Thead contains static configuration for table columns
 * - Tbody is intentionally empty and will be populated dynamically from API
 * - Column IDs should match the property keys in the server response objects
 * - This template ensures consistent table structure across the application
 */

const TABLE_DATAS = {
  thead: [
    { id: 1, title: "عنوان دوره" },
    { id: 2, title: "قیمت" },
    { id: 3, title: "مدت زمان" },
    { id: 4, title: "دانشجویان" },
    { id: 5, title: "وضعیت پشتیبانی" },
    { id: 6, title: "ویرایش آیکون دوره" },
    { id: 7, title: "ویرایش عکس دوره" },
    { id: 8, title: "حذف دوره" },
    { id: 9, title: "ویرایش دوره" },
  ],
  tbody: [] // Will be populated with dynamic data from server API,
};

export default TABLE_DATAS;
