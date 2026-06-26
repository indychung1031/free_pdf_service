"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ListedFile = { id: string; file: File };

type FileListDnDProps = {
  items: ListedFile[];
  onReorder: (items: ListedFile[]) => void;
  onRemove: (id: string) => void;
};

function SortableFileItem({
  item,
  index,
  onRemove,
}: {
  item: ListedFile;
  index: number;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-sm"
    >
      <button
        type="button"
        className="cursor-grab touch-none px-1 text-zinc-400 active:cursor-grabbing"
        aria-label="드래그하여 순서 변경"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>
      <span className="min-w-0 flex-1 truncate">
        {index + 1}. {item.file.name}
      </span>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="rounded px-2 py-1 text-red-600 hover:bg-red-50"
        aria-label="삭제"
      >
        ✕
      </button>
    </li>
  );
}

export function FileListDnD({ items, onReorder, onRemove }: FileListDnDProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onReorder(arrayMove(items, oldIndex, newIndex));
  }

  if (items.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <ol className="flex flex-col gap-2">
          {items.map((item, index) => (
            <SortableFileItem
              key={item.id}
              item={item}
              index={index}
              onRemove={onRemove}
            />
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  );
}

export function toListedFiles(files: File[]): ListedFile[] {
  return files.map((file) => ({
    id: crypto.randomUUID(),
    file,
  }));
}
