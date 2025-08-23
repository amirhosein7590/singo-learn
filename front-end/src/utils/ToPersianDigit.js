/**
 * Converts Western/Arabic digits to Persian digits
 * 
 * This utility function transforms numbers from Western (0-9) to Persian (۰-۹) numeral system
 * Useful for displaying numbers in Persian/Arabic interfaces while maintaining internal numeric operations
 * 
 * @param {number|string} num - The number to convert. Can be actual number or string representation
 * @returns {string} The number converted to Persian digits
 * 
 * @example
 * toPersianDigits(123) // returns "۱۲۳"
 * toPersianDigits("45.67") // returns "۴۵.۶۷"
 * toPersianDigits(1000) // returns "۱۰۰۰"
 */

function toPersianDigits(num) {
  return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}
export default toPersianDigits