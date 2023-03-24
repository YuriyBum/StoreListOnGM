export const dataUrl : string = "data/state.json" // Example of api response, replace it on api url

export const mobileWidth: number = 650 // Max screen width for mobile layout

export const defaultMapCenter = {
    latitude: 51.251321,
    longitude: 4.421528
}

export type itemData = {
    address: string,
    budgets: string[],
    latitude: number,
    longitude: number
}

export type itemsList = itemData[]