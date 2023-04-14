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
 * Link to an image, which is used as a thumbnail
 */
export interface Thumbnail { 
    /**
     * Image to display
     */
    url: string;
    /**
     * Caption of the image
     */
    title: string;
}