"use client";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { PdfPageThumbnail } from "@/components/PdfPageThumbnail";
import {
  type OrganizerPage,
  rotateClockwise,
} from "@/lib/pdf/organizer-types";

/** 미리보기 확대/축소 단계 — 카드 크기와 렌더 해상도를 함께 조절 */
const PREVIEW_ZOOM: Record<number, { cardWidth: number; renderWidth: number }> = {
  1: { cardWidth: 140, renderWidth: 120 },
  2: { cardWidth: 200, renderWidth: 180 },
  3: { cardWidth: 280, renderWidth: 260 },
  4: { cardWidth: 380, renderWidth: 360 },
};

function getPreviewZoom(level: number) {
  return PREVIEW_ZOOM[level] ?? PREVIEW_ZOOM[2];
}

type PageThumbnailGridProps = {
  pages: OrganizerPage[];
  pdfData: ArrayBuffer;
  cacheKey: string;
  zoom: number;
  onChange: (pages: OrganizerPage[]) => void;
};

function SortablePageCard({
  page,
  displayIndex,
  pdfData,
  cacheKey,
  cardWidth,
  renderWidth,
  onDelete,
  onRotate,
}: {
  page: OrganizerPage;
  displayIndex: number;
  pdfData: ArrayBuffer;
  cacheKey: string;
  cardWidth: number;
  renderWidth: number;
  onDelete: () => void;
  onRotate: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width: cardWidth }}
      className="group relative flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-2 shadow-sm"
    >
      <button
        type="button"
        className="absolute left-2 top-2 z-10 cursor-grab rounded bg-white/90 px-1.5 py-0.5 text-xs text-zinc-500 shadow active:cursor-grabbing"
        aria-label="드래그하여 순서 변경"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>

      <div className="pointer-events-none pt-6">
        <PdfPageThumbnail
          key={`${page.id}-${renderWidth}`}
          data={pdfData}
          cacheKey={cacheKey}
          pageIndex={page.sourcePageIndex}
          displayIndex={displayIndex}
          width={renderWidth}
          rotation={page.rotation}
        />
      </div>

      <div className="flex justify-center gap-1 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          onClick={onRotate}
          className="rounded bg-zinc-100 px-2 py-1 text-xs hover:bg-zinc-200"
          title="90° 회전"
        >
          ↻
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded bg-red-50 px-2 py-1 text-xs text-red-600 hover:bg-red-100"
          title="삭제"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

function PageCardPreview({
  page,
  displayIndex,
  pdfData,
  cacheKey,
  cardWidth,
  renderWidth,
}: {
  page: OrganizerPage;
  displayIndex: number;
  pdfData: ArrayBuffer;
  cacheKey: string;
  cardWidth: number;
  renderWidth: number;
}) {
  return (
    <div
      style={{ width: cardWidth }}
      className="flex flex-col gap-1 rounded-xl border border-zinc-300 bg-white p-2 shadow-lg"
    >
      <PdfPageThumbnail
        key={`${page.id}-${renderWidth}`}
        data={pdfData}
        cacheKey={cacheKey}
        pageIndex={page.sourcePageIndex}
        displayIndex={displayIndex}
        width={renderWidth}
        rotation={page.rotation}
      />
    </div>
  );
}

export function PageThumbnailGrid({
  pages,
  pdfData,
  cacheKey,
  zoom,
  onChange,
}: PageThumbnailGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { cardWidth, renderWidth } = getPreviewZoom(zoom);
  const activeIndex = pages.findIndex((p) => p.id === activeId);
  const activePage = activeIndex >= 0 ? pages[activeIndex] : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const oldIndex = pages.findIndex((p) => p.id === active.id);
    const newIndex = pages.findIndex((p) => p.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onChange(arrayMove(pages, oldIndex, newIndex));
  }

  function deletePage(id: string) {
    onChange(pages.filter((p) => p.id !== id));
  }

  function rotatePage(id: string) {
    onChange(
      pages.map((p) =>
        p.id === id ? { ...p, rotation: rotateClockwise(p.rotation) } : p,
      ),
    );
  }

  if (pages.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        모든 페이지가 삭제되었습니다. PDF를 다시 선택하세요.
      </p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={pages.map((p) => p.id)} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {pages.map((page, index) => (
            <SortablePageCard
              key={page.id}
              page={page}
              displayIndex={index + 1}
              pdfData={pdfData}
              cacheKey={cacheKey}
              cardWidth={cardWidth}
              renderWidth={renderWidth}
              onDelete={() => deletePage(page.id)}
              onRotate={() => rotatePage(page.id)}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activePage ? (
          <PageCardPreview
            page={activePage}
            displayIndex={activeIndex + 1}
            pdfData={pdfData}
            cacheKey={cacheKey}
            cardWidth={cardWidth}
            renderWidth={renderWidth}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export { PREVIEW_ZOOM, getPreviewZoom };
