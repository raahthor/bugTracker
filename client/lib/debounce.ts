export default function <T extends (...args: any[]) => void>(
  fn: T,
  delay = 1000
) {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
