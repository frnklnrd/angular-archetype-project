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
import { Thumbnail } from './thumbnail';


/**
 * The main entity of this API
 */
export interface Book { 
    /**
     * ISBN, which is used as identifier - only numbers are allowed (no hyphens)
     */
    isbn: string;
    /**
     * Title of the book
     */
    title: string;
    /**
     * List of all authors of the book
     */
    authors?: Array<string>;
    /**
     * Subtitle of the book
     */
    subtitle?: string;
    /**
     * Rating 'in starts' of the book, from one star (bad) to five stars (great)
     */
    rating?: number;
    /**
     * date-time as defined by RFC3339 (http://www.ietf.org/rfc/rfc3339.txt) - like new Date().toISOString();
     */
    published?: Date;
    /**
     * Short description of the book
     */
    description?: string;
    /**
     * Images of the book, which are used as thumbnails
     */
    thumbnails?: Array<Thumbnail>;
}