// Basic JSON Response for Controllers
export type BasicResponse = {
    message: string
}

export type BasicResponseWithDate = {
    message: string,
    date: Date
}

// Error JSON Response for Controllers
export type ErrorResponse = {
    error: string,
    message: string
}