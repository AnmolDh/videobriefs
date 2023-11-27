export default async function streamData(
  res: any,
  state: any,
  bullets: boolean
) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let buffer = "";

  while (!done) {
    if (bullets) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        buffer += decoder.decode(value);
        let lastNewlineIndex = buffer.lastIndexOf("\n");

        if (lastNewlineIndex !== -1) {
          let chunkValue = buffer.slice(0, lastNewlineIndex);
          buffer = buffer.slice(lastNewlineIndex + 1);

          chunkValue = chunkValue
            .split("\n-")
            .map((bullet) => `<li>${bullet}</li>`)
            .join("");

          state((prev: any) => prev + chunkValue);
        }
      }
    } else {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunkValue = decoder.decode(value);
        state((prev: any) => prev + chunkValue);
      }
    }
  }

  if (buffer && bullets) {
    let chunkValue = buffer;
    chunkValue = chunkValue
      .split("\n-")
      .map((bullet) => `<li>${bullet}</li>`)
      .join("");

    state((prev: any) => prev + chunkValue);
  }
}
