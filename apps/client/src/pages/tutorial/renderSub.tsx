export function renderSub(text: string, highlight: boolean) {
  if (!highlight) return <span>{text}</span>;
  const parts = text.split(/(\d+번(?:\s문제)?)/);
  return (
    <>
      {parts.map((part, i) =>
        /^\d+번/.test(part)
          ? <span key={i} className="text-inbrain-lightblue">{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}
