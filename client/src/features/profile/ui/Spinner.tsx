export default function Spinner({ size = "sm", color = "white" }) {
  const sizeClass = size === "sm" ? "w-4 h-4 border-2" : "w-8 h-8 border-4";
  const colorClass = color === "teal"
    ? "border-teal-500 border-t-transparent"
    : "border-white border-t-transparent";
  return (
    <span className={`inline-block rounded-full animate-spin ${sizeClass} ${colorClass}`} />
  );
}