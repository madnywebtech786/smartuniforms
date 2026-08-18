/**
 * Consistent horizontal max-width + gutter used across all sections.
 * Centralizing this avoids repeated max-w/px classes scattered through JSX.
 */
export default function Container({ as: Tag = "div", className = "", children }) {
  return (
    <Tag className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </Tag>
  );
}
