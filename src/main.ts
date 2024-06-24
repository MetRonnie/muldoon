/**
 * Returns the nth number in the Fibonacci sequence.
 *
 * @param {number} n
 * @returns {number}
 */
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
