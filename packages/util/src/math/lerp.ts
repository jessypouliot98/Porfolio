export function lerp(value: number, input: [min: number, max: number], output: [min: number, max: number] = [0, 1]): number {
  const slope = (output[1] - output[0]) / (input[1] - input[0]);
  return (value - input[0]) * slope + output[0];
}