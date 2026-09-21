import type { ReactNode } from "react";

const bodyFont = { fontFamily: '"Inter", system-ui, sans-serif' as const };

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[#2B2B23]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function LegalDoc({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const blocks: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (!listBuffer.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-2 list-disc space-y-1 pl-5 text-sm text-[#2B2B23]/80" style={bodyFont}>
        {listBuffer.map((item, idx) => (
          <li key={idx}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      blocks.push(
        <h1 key={blocks.length} className="mt-1 font-display text-xl font-bold text-[#2B2B23]">
          {line.slice(2)}
        </h1>,
      );
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2 key={blocks.length} className="mb-1 mt-6 font-display text-base font-bold text-[#2B2B23]">
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("> ")) {
      flushList();
      blocks.push(
        <blockquote
          key={blocks.length}
          className="my-3 rounded-xl border border-[#D6D0C4]/60 bg-[#FAF8F3] p-3 text-xs leading-relaxed text-[#2B2B23]/70"
          style={bodyFont}
        >
          {renderInline(line.slice(2))}
        </blockquote>,
      );
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else {
      flushList();
      blocks.push(
        <p key={blocks.length} className="mt-2 text-sm leading-relaxed text-[#2B2B23]/80" style={bodyFont}>
          {renderInline(line)}
        </p>,
      );
    }
  }
  flushList();

  return <div className="pb-4">{blocks}</div>;
}
