/**
 * A replacement function for the regular modulo operator that never gives out
 * negative numbers.
 *
 * @param n Left number for the modulo operator.
 * @param m Right number for the modulo operator.
 * @return The division remainder, which can never be negative.
 */
export function modulo(n: number, m: number): number {
    return ((n % m) + m) % m;
}
