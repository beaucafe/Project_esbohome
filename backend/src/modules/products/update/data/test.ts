// async test0() {
//   try {
//     const mongodb = await this.posdataModel
//       .find({ MonthlyRunning: '202007' })
//       .select({ POINTOFSALE: 1 })

//     const pos1 = mongodb[0].POINTOFSALE.filter((pos) => {
//       if (pos.POSID === 1) {
//         console.log('pos1 :' + pos)
//         return pos
//       }
//     })

//     const pos2 = mongodb[0].POINTOFSALE.filter((pos) => {
//       if (pos.POSID === 101) {
//         console.log('pos2 :' + pos)
//         return pos
//       }
//     })

//     const pos3 = mongodb[0].POINTOFSALE.filter((pos) => {
//       if (pos.POSID === 102) {
//         console.log('pos3 :' + pos)
//         return pos
//       }
//     })

//     const pos4 = mongodb[0].POINTOFSALE.filter((pos) => {
//       if (pos.POSID === 103) {
//         console.log('pos4 :' + pos)
//         return pos
//       }
//     })

//     return pos1[0].DailyRunning
//   } catch (error) {
//     throw new ServiceUnavailableException(error.message)
//   }
// }

//   //#region initail for daily
//   private _initialDailyRunning = async () => {
//     let result
//     let getMonthly = this._monthlyRun
//     let getDaily = '20200730' //this._dailyRun
//     let response = {
//       status: 200,
//       message: `Monthly : [${getDaily}] พร้อมใช้งาน.`,
//     }
//     try {
//       let create = false
//       let update = false
//       const posdataDB = await this.dailyModel
//         .find({})
//         .select({ _id: 1, dailyRunning: 1 })
//       const monthlydb = await this.posdataModel
//         .findOneAndUpdate({ Monthly: getMonthly })
//         .select({ _id: 1, Monthly: 1, dailyRunning: 1 })
//       // console.log(posdataDB)

//       if (!posdataDB || posdataDB.length < 1) {
//         create = true
//       } else {
//         if (posdataDB.length < 1) throw new Error('Daily : ข้อมูลผิดผลาด')

//         const found = posdataDB.filter((data) => data.dailyRunning === getDaily)
//         console.log(typeof found)
//         console.log('Found : ' + found)

//         !found[0] ? (update = true) : (result = response)
//       }

//       if (create) {
//         // สร้าง table ตัวมันเองก่อน
//         console.log('Create / update')

//         let createdb = new this.dailyModel({
//           dailyRunning: getDaily,
//         })
//         // บันทึกและ Save ref ลง Posdata
//         result = await createdb
//           .save()
//           .then(() => {
//             // console.log(monthlydb.Monthly + '/ ' + monthlydb.Daily)

//             if (!monthlydb) throw new Error('Daily : ไม่พบเดือนปัจจุบัน')

//             const { Monthly, dailyRunning } = monthlydb

//             const found = dailyRunning.filter(
//               (data) => data._id === createdb._id,
//             )
//             console.log('Create found: ' + found)

//             if (!found[0]) {
//               dailyRunning.push({
//                 date: getDaily,
//                 _id: createdb._id,
//               })
//               monthlydb.save()
//             }

//             return {
//               status: 201,
//               message: 'Created and saved, successfully.',
//               data: getDaily,
//             }
//           })
//           .catch((error) => {
//             return { status: 404, message: error.message }
//           })
//       } else {
//         if (update) {
//           let updated = new this.dailyModel.push({
//             dailyRunning: getDaily,
//           })
//           console.log(`update : ${updated}`)

//           result = await updated
//             .save()
//             .then((r) => {
//               const { Monthly, dailyRunning } = monthlydb

//               let found = dailyRunning.filter((data) => data._id === r._id)
//               console.log('Create found: ' + r.length)

//               if (!found[0]) {
//                 dailyRunning.push({
//                   date: getDaily,
//                   _id: r._id,
//                 })
//                 monthlydb.save()
//               }
//               return {
//                 status: 201,
//                 message: 'Created and saved, successfully.',
//                 data: getDaily,
//               }
//             })
//             .catch((error) => {
//               return { status: 404, message: error.message }
//             })
//           //}
//         }
//       }

//       console.log(result)

//       return result
//     } catch (error) {
//       return new ServiceUnavailableException(error.message)
//     }
//   }
//   //#endregion
