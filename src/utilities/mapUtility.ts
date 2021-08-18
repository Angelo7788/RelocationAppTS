


export function toRad(Value: number): number {
    return (Value * Math.PI) / 180 }


    // Returns distance between two coords
export function getDistanceBetweenCoords(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
    const R = 6371 // km
    const dLat = toRad(latitude2 - latitude1) 
    const dLon = toRad(longitude2 - longitude1) 
    const lat1 = toRad(latitude1)

    const lat2 = toRad(latitude2)
    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) 
    const d = R * c
    return d
    }