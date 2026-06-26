type ProgressBarProps = {
  current: number;
  total: number;
  label?: string;
};

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-sm text-zinc-600">{label}</p>}
      <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-zinc-900 transition-all duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-zinc-500">
        {current} / {total} ({percent}%)
      </p>
    </div>
  );
}
