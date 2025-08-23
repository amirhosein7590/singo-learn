/**
 * Formats a price number with Persian locale formatting
 * 
 * Converts a numeric value to a locale-aware string with Persian digit formatting
 * and proper thousand separators according to Persian/Afghanistan locale conventions
 * 
 * @param {number|string} price - The price value to format. Can be a number or numeric string
 * @returns {string} The formatted price string with Persian digits and locale-specific separators
 * 
 * @example
 * PriceToPersian(1234567) // returns "۱٬۲۳۴٬۵۶۷"
 * PriceToPersian("9876.54") // returns "۹٬۸۷۶٫۵۴"
 * PriceToPersian(1000) // returns "۱٬۰۰۰"
 * 
 * @note
 * Uses 'FA' locale (Farsi/Persian) which formats numbers with:
 * - Persian digits (۰-۹)
 * - Thousand separators: ٬ (Arabic comma)
 * - Decimal separator: ٫ (Arabic decimal point)
 */

function PriceToPersian(price){
    return Number(price).toLocaleString('FA');
}
export default PriceToPersian