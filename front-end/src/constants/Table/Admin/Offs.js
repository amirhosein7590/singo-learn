/**
 * Base table configuration template for discount management data
 * 
 * Provides a standardized structure for tables displaying course discount information
 * Serves as a template for dynamic data population from server API responses
 * 
 * @constant {Object} BASE_TABLE_DATAS - Table configuration template for discount management
 * @property {Array<Object>} thead - Static table header configuration for discount-related columns
 * @property {number} thead[].id - Unique identifier for each column
 * @property {string} thead[].title - Display title for the column header
 * @property {Array} tbody - Empty array placeholder for dynamic course discount data from server
 * 
 * @example
 * // Expected server data structure for tbody:
 * const serverData = [
 *   {
 *     id: 1,
 *     courseName: "React Advanced Course",
 *     discount: "۲۰٪",
 *     originalPrice: "۵۰۰,۰۰۰ تومان",
 *     price (dicountedPrice): "۴۰۰,۰۰۰ تومان",
 *     // ... other fields matching thead columns
 *   }
 * ];
 * 
 * @note
 * - Specifically designed for course discount management interfaces
 * - Thead contains static configuration for discount-related columns
 * - Tbody is intentionally empty and will be populated dynamically from API
 * - Column structure focuses on pricing and discount calculations
 * - Ensures consistent table formatting across discount management features
*/

const BASE_TABLE_DATAS = {
  thead: [
    { id: 1, title: "نام دوره" },
    { id: 2, title: "درصد تخفیف" },
    { id: 3, title: "قیمت واقعی" },
    { id: 4, title: "قیمت با تخفیف" },
    { id: 5, title: "ویرایش" },
    { id: 6, title: "حذف" },
  ],
  tbody: [] // Will be populated with dynamic data from server API,
};

export default BASE_TABLE_DATAS;
