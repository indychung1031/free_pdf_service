"use client";

import { useEffect, useRef, useState } from "react";
import { renderPageThumbnail } from "@/lib/pdf/pdfjs-client";

type PdfPageThumbnailProps = {
  data: ArrayBuffer;
  cacheKey: string;
  pageIndex: number;
  displayIndex: number;
  width: number;
  rotation: number;
};

export function PdfPageThumbnail({
  data,
  cacheKey,
  pageIndex,
  displayIndex,
  width,
  rotation,
}: PdfPageThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let cancelled = false;
    loadingRef.current = false;
    setSrc(null);
    setError(false);

    function loadThumbnail() {
      if (loadingRef.current || cancelled) return;

      loadingRef.current = true;
      renderPageThumbnail(data, cacheKey, pageIndex, width)
        .then((url) => {
          if (!cancelled) {
            setSrc(url);
            setError(false);
          }
        })
        .catch(() => {
          if (!cancelled) setError(true);
        })
        .finally(() => {
          loadingRef.current = false;
        });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        loadThumbnail();
      },
      { rootMargin: "120px" },
    );

    observer.observe(element);

    // 이미 화면에 보이는 경우 observer 콜백이 늦게 올 수 있어 즉시 1회 시도
    if (element.getBoundingClientRect().height > 0) {
      loadThumbnail();
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [data, cacheKey, pageIndex, width]);

  return (
    <div
      ref={containerRef}
      className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-100"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`페이지 ${displayIndex}`}
          className="max-h-full max-w-full object-contain shadow-sm"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      ) : (
        <span className="text-xs text-zinc-400">
          {error ? "미리보기 실패" : "로딩…"}
        </span>
      )}
      <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
        {displayIndex}
      </span>
    </div>
  );
}
