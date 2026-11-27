export default function Spinner({ className = "" }) {
  return (
    <div
      role="status"
      aria-label="Memuat"
      className={`h-8 w-8 animate-spin rounded-full border-4 border-abata-orange border-t-transparent ${className}`}
    />
  );
}