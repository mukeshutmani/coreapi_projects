
const dateUtils = (time) => {
  
   return new Date(time).toLocaleString("en-US" , {
      year: "numeric",
      month: "long",
      dat: "numeric",
      hour: "2-digit",
      minute: "2-digit"
  })

}

export default dateUtils