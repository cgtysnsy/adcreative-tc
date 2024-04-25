const HighlightCharacterName: React.FC<{ text: string; highlight: string }> = ({
  text,
  highlight,
}) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <strong key={index} style={{ fontWeight: "bold" }}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </span>
  );
};

export default HighlightCharacterName;
