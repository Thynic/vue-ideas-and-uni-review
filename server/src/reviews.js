// const reviews = [
//     {
//         name: 'Eğitim',
//         subCtgs: [
//           {
//             name: 'Öğretmen Kalitesi',
//             percentage: '',
//             rating: '',
//             total: '',
//             setRating: function() {
//               this.percentage = Math.floor(Math.random() * 100),
//                 this.rating = this.percentage/20,
//                 this.total = Math.floor(Math.random() * 1000)
//             }
//           },
//           {
//             name: 'Eğitim Yöntemi',
//             percentage: '',
//             rating: '',
//             total: '',
//             setRating: function() {
//               this.percentage = Math.floor(Math.random() * 100),
//                 this.rating = this.percentage/20,
//                 this.total = Math.floor(Math.random() * 1000)
//             }
//           }
//         ],
//         percentage: '',
//         rating: '',
//         total: 0,
          
//       },
//       {
//         name: 'Yurtlar',
//         subCtgs: [
//           {name: 'Genel Yurt Puanlaması', percentage: '',
//             rating: '',
//             total: '',
//             setRating: function() {
//               this.percentage = Math.floor(Math.random() * 100),
//                 this.rating = this.percentage/20,
//                 this.total = Math.floor(Math.random() * 1000)
//             }}
//         ],
//         percentage: '',
//             rating: '',
//             total: 0,
//       },
//       {
//         name: 'Etkinlikler',
//         subCtgs: [
//           {name: 'Genel Klüp Puanlaması', percentage: '',
//             rating: '',
//             total: '',
//             setRating: function() {
//               this.percentage = Math.floor(Math.random() * 100),
//                 this.rating = this.percentage/20,
//                 this.total = Math.floor(Math.random() * 1000)
//             }}
//         ],
//         percentage: '',
//         rating: '',
//         total: 0,
//       },
//       {
//         name: 'Yemekhane',
//         subCtgs: [
//           {name: 'Lezzet', percentage: '',
//             rating: '',
//             total: '',
//             setRating: function() {
//               this.percentage = Math.floor(Math.random() * 100),
//                 this.rating = this.percentage/20,
//                 this.total = Math.floor(Math.random() * 1000)
//             }},
//           {name: 'Hijyen', percentage: '',
//             rating: '',
//             total: '',
//             setRating: function() {
//               this.percentage = Math.floor(Math.random() * 100),
//                 this.rating = this.percentage/20,
//                 this.total = Math.floor(Math.random() * 1000)
//             }}
//         ],
//         percentage: '',
//             rating: '',
//             total: 0,
//       },
//       {
//         name: 'Şehir',
//         subCtgs: [
//           {name: 'İmkanlar', percentage: '',
//             rating: '',
//             total: '',
//             setRating: function() {
//               this.percentage = Math.floor(Math.random() * 100),
//                 this.rating = this.percentage/20,
//                 this.total = Math.floor(Math.random() * 1000)
//             }},
//           {name: 'Maliyet', percentage: '',
//             rating: '',
//             total: '',
//             setRating: function() {
//               this.percentage = Math.floor(Math.random() * 100),
//                 this.rating = this.percentage/20,
//                 this.total = Math.floor(Math.random() * 1000)
//             }}
//         ],
//         percentage: '',
//             rating: '',
//             total: 0,
//       }
// ]

// reviews.forEach((categorie) => {
//   let subCtgCount = 0
//   let avgPercentage = 0
  
//   categorie.subCtgs.forEach((subCtg, index) => {
//       subCtg.setRating()
//       categorie.total += subCtg.total
//       avgPercentage += subCtg.percentage
//       subCtgCount = index+1
//   })
//   categorie.percentage = avgPercentage / subCtgCount
//   categorie.rating = categorie.percentage / 20
// })








const reviews = [
    {
        name: 'Eğitim',
        subCtgs: [
          {
            name: 'Öğretmen Kalitesi',
            percentage: '',
            rating: '',
            total: '',
          },
          {
            name: 'Eğitim Yöntemi',
            percentage: '',
            rating: '',
            total: '',
          }
        ],
    },
      // {
      //   name: 'Yurtlar',
      //   subCtgs: [
      //     {name: 'Genel Yurt Puanlaması',
      //       percentage: '',
      //       rating: '',
      //       total: '',
      //     }
      //   ],
      // },
      // {
      //   name: 'Etkinlikler',
      //   subCtgs: [
      //     {name: 'Genel Klüp Puanlaması',
      //       percentage: '',
      //       rating: '',
      //       total: '',
      //     }
      //   ],
      // }
      // {
      //   name: 'Yemekhane',
      //   subCtgs: [
      //     {name: 'Lezzet',
      //       percentage: '',
      //       rating: '',
      //       total: '',
      //     },
      //     {name: 'Hijyen',
      //       percentage: '',
      //       rating: '',
      //       total: '',
      //     }
      //   ],

      // },
      // {
      //   name: 'Şehir',
      //   subCtgs: [
      //     {name: 'İmkanlar',
      //       percentage: '',
      //       rating: '',
      //       total: '',
      //     },
      //     {name: 'Maliyet',
      //       percentage: '',
      //       rating: '',
      //       total: '',
      //     }
      //   ],
      // }
]

module.exports = reviews