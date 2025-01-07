# LEI Validator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A robust JavaScript library for validating Legal Entity Identifiers (LEIs) according to the ISO 17442 standard.

## Features

- ✅ Complete LEI validation according to ISO 17442
- 🔍 Detailed error reporting
- 🧩 LEI component breakdown
- 🔢 Check digit generation
- 💪 TypeScript-friendly with JSDoc annotations

## Installation

```html
<script src="//cdn.jsdelivr.net/gh/mczen-technologies/lei-validator@latest/index.js"></script>
```

## Usage

### Basic Validation

```javascript
const validator = new LEIValidator("213800D1L3R2MWV39G88");
const isValid = validator.isValid();

console.log(isValid ? "Valid LEI" : "Invalid LEI");
```

### Detailed Validation with Error Messages

```javascript
const validator = new LEIValidator("213800D1L3R2MWV39G88");
const result = validator.validate();

if (result.isValid) {
    console.log("Valid LEI");
} else {
    console.log("Invalid LEI:", result.errors);
}
```

### Get LEI Components

```javascript
const validator = new LEIValidator("213800D1L3R2MWV39G88");
const parts = validator.getParts();

console.log(parts);
// Output:
// {
//     louPrefix: "2138",
//     entityPart: "00D1L3R2MWV39G",
//     checkDigits: "88"
// }
```

### Generate Check Digits

```javascript
const checkDigits = LEIValidator.generateCheckDigits("213800D1L3R2MWV39G");
console.log("Check digits:", checkDigits);
```

## LEI Structure

An LEI is a 20-character identifier that consists of:

1. **LOU Prefix** (Characters 1-4):
   - Identifies the Local Operating Unit that issued the LEI
   - Alphanumeric characters only

2. **Entity-Specific Part** (Characters 5-18):
   - Unique to the entity
   - Alphanumeric characters only

3. **Check Digits** (Characters 19-20):
   - Two numeric characters
   - Calculated using ISO 17442 algorithm

## Validation Rules

The validator checks:

- Length (must be exactly 20 characters)
- Character set (uppercase alphanumeric only)
- LOU prefix format
- Entity-specific part format
- Check digits using MOD 97-10 algorithm

## API Reference

### Class: LEIValidator

#### Constructor

```javascript
const validator = new LEIValidator(lei: string)
```

Throws `TypeError` if the input is not a string.

#### Methods

##### `isValid(): boolean`
Returns whether the LEI is valid.

##### `validate(): ValidationResult`
Returns detailed validation results.
```typescript
interface ValidationResult {
    isValid: boolean;
    errors: string[];
}
```

##### `getParts(): Object`
Returns the components of the LEI.
```typescript
{
    louPrefix: string;
    entityPart: string;
    checkDigits: string;
}
```

##### `static generateCheckDigits(partialLei: string): string`
Generates valid check digits for a partial LEI (first 18 characters).

## Error Handling

The validator provides detailed error messages for:
- Invalid input types
- Incorrect length
- Invalid characters
- Invalid LOU prefix
- Invalid entity-specific part
- Invalid check digits

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[McZEN Technologies](https://mczen-technologies.com)

## Acknowledgments

- ISO 17442 standard for LEI structure
- GLEIF (Global Legal Entity Identifier Foundation) for LEI specifications

## Change Log

### Version 1.0.0
- Initial release
- Basic LEI validation
- Component breakdown
- Check digit generation
- Detailed error reporting