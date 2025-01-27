
const asyncHanlder = (requestHanlder) => {
      return (req, res, next) => {
           Promise.resolve(requestHanlder(req, res, next))
           .catch(next);
      }
} 





// const asyncHanlder = (requestHanlder) => {
//       return (...args) => {
//          return new Promise((resolve, reject) => {
//               try {
//                  resolve (requestHanlder (...args))
//               } catch (error) {
//                  reject(error)
//               }
//          })
//       }
// }


export {asyncHanlder}