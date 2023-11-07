export default async function streamData(res: any, state: any) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      const chunkValue = decoder.decode(value);
      state((prev: any) => prev + chunkValue);
    }
  }
}