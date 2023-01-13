/**
 * Basic JSON Response for Controllers
 */ 
export type BasicResponse = {
    message: string
}

/**
 * Basic JSON Response with Date for Controllers
 */
export type BasicResponseWithDate = {
    message: string,
    date: Date
}

/**
 * Error JSON Response for Controllers
 */
export type ErrorResponse = {
    error: string,
    message: string
}