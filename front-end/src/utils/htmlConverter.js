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