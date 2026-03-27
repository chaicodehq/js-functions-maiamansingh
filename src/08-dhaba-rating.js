/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  const ops = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "===": (a, b) => a === b,
  };

  const compare = ops[operator];

  if (!compare) {
    return () => false;
  }

  return (obj) => {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    const fieldValue = obj[field];
    return compare(fieldValue, value);
  };
}

export function createSorter(field, order = "asc") {
  const multiplier = order === "desc" ? -1 : 1;

  return (a, b) => {
    const av = a?.[field];
    const bv = b?.[field];

    if (av === bv) {
      return 0;
    }
    if (av == null) {
      return -1 * multiplier;
    }
    if (bv == null) {
      return 1 * multiplier;
    }

    if (av > bv) {
      return 1 * multiplier;
    }
    if (av < bv) {
      return -1 * multiplier;
    }
    return 0;
  };
}

export function createMapper(fields) {
  const fieldList = Array.isArray(fields) ? fields : [];

  return (obj) => {
    if (!obj || typeof obj !== "object") {
      return {};
    }

    return fieldList.reduce((acc, key) => {
      if (key in obj) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };
}

export function applyOperations(data, ...operations) {
  if (!Array.isArray(data)) {
    return [];
  }

  return operations.reduce((current, op) => {
    if (typeof op === "function") {
      return op(current);
    }
    return current;
  }, data);
}