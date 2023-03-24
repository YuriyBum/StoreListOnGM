import { dataUrl, itemData } from "../config"

//Receive and standartize data
export async function RequestItems () {

   const list : itemData[] = []
   const request = await fetch(dataUrl)
   const response = await request.json()
   const points = response.pickPoints
   if (points) {

      points.forEach((point: any) => {
         const budgets : string[] = []
         if (point.budgets) {
            point.budgets.forEach((b: any) => {
             budgets.push(String(b))
           })
         }

         list.push({
            address: point.address,
            budgets: budgets,
            latitude: Number(point.latitude),
            longitude:Number(point.longitude)
          })
      })
   }

   return list
}