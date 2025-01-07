/**
 * Class representing a Legal Entity Identifier (LEI) validator.
 * Implements validation according to ISO 17442 standard.
 */
class LEIValidator {
    /**
     * @typedef {Object} ValidationResult
     * @property {boolean} isValid - Whether the LEI is valid
     * @property {string[]} errors - Array of validation error messages
     */

    /**
     * Creates a new LEI validator instance
     * @param {string} lei - The LEI to validate
     * @throws {TypeError} If lei is not a string
     */
    constructor(lei) {
        if (typeof lei !== 'string') {
            throw new TypeError('LEI must be a string');
        }
        this.lei = lei.toUpperCase();
        this.errors = [];
    }

    /**
     * Validates the format of the LEI
     * @private
     * @returns {boolean} Whether the format is valid
     */
    #validateFormat() {
        if (this.lei.length !== 20) {
            this.errors.push('LEI must be exactly 20 characters long');
            return false;
        }

        if (!/^[A-Z0-9]{20}$/.test(this.lei)) {
            this.errors.push('LEI must contain only uppercase alphanumeric characters');
            return false;
        }

        // Validate LOU (Local Operating Unit) prefix - first 4 characters
        if (!/^[A-Z0-9]{4}$/.test(this.lei.slice(0, 4))) {
            this.errors.push('Invalid LOU prefix format');
            return false;
        }

        // Validate entity-specific part - characters 5-18
        if (!/^[A-Z0-9]{14}$/.test(this.lei.slice(4, 18))) {
            this.errors.push('Invalid entity-specific part format');
            return false;
        }

        // Validate check digits - last 2 characters
        if (!/^[0-9]{2}$/.test(this.lei.slice(18))) {
            this.errors.push('Check digits must be numeric');
            return false;
        }

        return true;
    }

    /**
     * Calculates the check digits for an LEI
     * @private
     * @returns {string} The calculated check digits
     */
    #calculateCheckDigits() {
        const base = this.lei.slice(0, 18);
        const rearranged = base + '00';
        
        const numericLEI = rearranged
            .split('')
            .map(char => isNaN(char) ? (char.charCodeAt(0) - 55).toString() : char)
            .join('');

        const remainder = (98 - (BigInt(numericLEI) % 97n));
        return remainder.toString().padStart(2, '0');
    }

    /**
     * Validates the check digits of the LEI
     * @private
     * @returns {boolean} Whether the check digits are valid
     */
    #validateChecksum() {
        const rearrangedLEI = this.lei.slice(18) + this.lei.slice(0, 18);

        const numericLEI = rearrangedLEI
            .split('')
            .map(char => isNaN(char) ? (char.charCodeAt(0) - 55).toString() : char)
            .join('');

        const mod97 = BigInt(numericLEI) % 97n;

        if (mod97 !== 1n) {
            this.errors.push('Invalid check digits');
            return false;
        }

        return true;
    }

    /**
     * Gets the parts of the LEI
     * @returns {Object} Object containing the LEI parts
     */
    getParts() {
        return {
            louPrefix: this.lei.slice(0, 4),
            entityPart: this.lei.slice(4, 18),
            checkDigits: this.lei.slice(18)
        };
    }

    /**
     * Performs complete validation of the LEI
     * @returns {ValidationResult} Validation result with status and errors
     */
    validate() {
        this.errors = [];
        const formatValid = this.#validateFormat();
        const checksumValid = formatValid ? this.#validateChecksum() : false;

        return {
            isValid: formatValid && checksumValid,
            errors: this.errors
        };
    }

    /**
     * Checks if the LEI is valid
     * @returns {boolean} Whether the LEI is valid
     */
    isValid() {
        return this.validate().isValid;
    }

    /**
     * Generates valid check digits for a partial LEI (first 18 characters)
     * @param {string} partialLei - First 18 characters of an LEI
     * @returns {string} The complete LEI with valid check digits
     * @throws {Error} If the partial LEI format is invalid
     */
    static generateCheckDigits(partialLei) {
        if (typeof partialLei !== 'string' || partialLei.length !== 18) {
            throw new Error('Partial LEI must be a string of 18 characters');
        }

        const validator = new LEIValidator(partialLei + '00');
        return validator.#calculateCheckDigits();
    }
}