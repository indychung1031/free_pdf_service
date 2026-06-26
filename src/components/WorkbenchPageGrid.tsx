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
import { useMemo, useState } from "react";
import { PdfPageThumbnail } from "@/components/PdfPageThumbnail";
import { getPreviewZoom } from "@/components/PageThumbnailGrid";
import {
  bytesToArrayBuffer,
  rotateClockwise,
  type WorkbenchPage,
  type WorkbenchSource,
} from "@/lib/pdf/workbench-types";

type WorkbenchPageGridProps = {
  pages: WorkbenchPage[];
  sources: WorkbenchSource[];
  zoom: number;
  insertAfterPageId: string | null;
  onInsertAfterChange: (pageId: string | null) => void;
  onChange: (pages: WorkbenchPage[]) => void;
};

function SortableWorkbenchCard({
  page,
  displayIndex,
  source,
  cardWidth,
  renderWidth,
  isInsertTarget,
  onSelectInsertAfter,
  onDelete,
  onRotate,
}: {
  page: WorkbenchPage;
  displayIndex: number;
  source: WorkbenchSource;
  cardWidth: number;
  renderWidth: number;
  isInsertTarget: boolean;
  onSelectInsertAfter: () => void;
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

  const pdfData = useMemo(
    () => bytesToArrayBuffer(source.bytes),
    [source.bytes],
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width: cardWidth }}
      className={`group relative flex flex-col gap-1 rounded-xl border bg-white p-2 shadow-sm ${
        isInsertTarget
          ? "border-blue-500 ring-2 ring-blue-200"
          : "border-zinc-200"
      }`}
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

      <p
        className="truncate pt-1 text-[10px] text-zinc-400"
        title={source.fileName}
      >
        {source.fileName}
      </p>

      <div
        className="pointer-events-auto cursor-pointer"
        onClick={onSelectInsertAfter}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onSelectInsertAfter();
        }}
        role="button"
        tabIndex={0}
        title="클릭하면 다음 추가 PDF가 이 페이지 뒤에 삽입됩니다"
      >
        <PdfPageThumbnail
          key={`${page.id}-${renderWidth}`}
          data={pdfData}
          cacheKey={source.cacheKey}
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

export function WorkbenchPageGrid({
  pages,
  sources,
  zoom,
  insertAfterPageId,
  onInsertAfterChange,
  onChange,
}: WorkbenchPageGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const sourceById = useMemo(
    () => new Map(sources.map((s) => [s.id, s])),
    [sources],
  );

  const { cardWidth, renderWidth } = getPreviewZoom(zoom);
  const activeIndex = pages.findIndex((p) => p.id === activeId);
  const activePage = activeIndex >= 0 ? pages[activeIndex] : null;
  const activeSource = activePage
    ? sourceById.get(activePage.sourceId)
    : undefined;

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
    if (id === insertAfterPageId) onInsertAfterChange(null);
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
        PDF를 추가하면 페이지가 여기에 표시됩니다.
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
          {pages.map((page, index) => {
            const source = sourceById.get(page.sourceId);
            if (!source) return null;
            return (
              <SortableWorkbenchCard
                key={page.id}
                page={page}
                displayIndex={index + 1}
                source={source}
                cardWidth={cardWidth}
                renderWidth={renderWidth}
                isInsertTarget={page.id === insertAfterPageId}
                onSelectInsertAfter={() =>
                  onInsertAfterChange(
                    insertAfterPageId === page.id ? null : page.id,
                  )
                }
                onDelete={() => deletePage(page.id)}
                onRotate={() => rotatePage(page.id)}
              />
            );
          })}
        </div>
      </SortableContext>

      <DragOverlay>
        {activePage && activeSource ? (
          <div
            style={{ width: cardWidth }}
            className="rounded-xl border border-zinc-300 bg-white p-2 shadow-lg"
          >
            <PdfPageThumbnail
              data={bytesToArrayBuffer(activeSource.bytes)}
              cacheKey={activeSource.cacheKey}
              pageIndex={activePage.sourcePageIndex}
              displayIndex={activeIndex + 1}
              width={renderWidth}
              rotation={activePage.rotation}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
