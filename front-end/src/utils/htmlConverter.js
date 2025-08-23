/**
 * Converts an array of content objects into HTML string for rich text editors
 * 
 * Transforms structured content data from server into HTML markup suitable for
 * embedding in rich text editor components (like TinyMCE, Quill, etc.)
 * 
 * @param {Array<Object>} arr - Array of content objects from server API
 * @param {string} arr[].title - Section title text
 * @param {string} arr[].description - Section content/body text
 * @returns {string} Combined HTML string with all content sections
 * 
 * @example
 * // Input data structure from server:
 * const serverData = [
 *   { title: "Introduction", description: "Welcome to our platform..." },
 *   { title: "Features", description: "Our main features include..." }
 * ];
 * 
 * // Returns: "<h2>Introduction</h2><p>Welcome to our platform...</p><h2>Features</h2><p>Our main features include...</p>"
 * 
 * @note
 * - Designed for seamless integration with rich text editor components
 * - Preserves content structure for proper rendering in editing environments
 * - Expects consistent object structure from server API response
 */

function convertToHtml(arr){
    let newArray = arr.reduce((acc,curr)=>{
      let {title , description} = curr;
      let h2 = `<h2>${title}</h2>`
      let p = `<p>${description}</p>`
      return acc+= `${h2}${p}`
    },'')
    return newArray
  }

  export default convertToHtml