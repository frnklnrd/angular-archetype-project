/**
 * BookMonkey 4 API
 * **DEMO**  This is a demo backend for serving books. All data is erased after some inactivity.
 *
 * OpenAPI spec version: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * An object with a rating value (1...5)
 */
export interface Rating { 
    /**
     * Rating value for a book from one star (bad) to five stars (great)
     */
    rating: number;
}