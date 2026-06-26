type ClearWorkButtonProps = {
  onClear: () => void;
  disabled?: boolean;
};

export function ClearWorkButton({ onClear, disabled }: ClearWorkButtonProps) {
  return (
    <div className="flex flex-col items-stretch gap-1 sm:items-end">
      <button
        type="button"
        onClick={onClear}
        disabled={disabled}
        title="선택한 작업 파일만 화면에서 비웁니다. 기기에 저장된 원본 파일은 삭제되지 않습니다."
        className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        작업 파일 비우기
      </button>
      <p className="text-center text-[11px] text-zinc-400 sm:text-right">
        목록만 초기화합니다. 원본 파일은 삭제되지 않습니다.
      </p>
    </div>
  );
}
