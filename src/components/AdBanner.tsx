interface AdBannerProps {
  className?: string;
  label?: string;
}

export function AdBanner({ className = "", label = "Publicidade" }: AdBannerProps) {
  return (
    <div className={`ad-slot p-4 ${className}`}>
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 text-[10px] text-muted-foreground/60">Espaço reservado para anúncio</p>
      </div>
    </div>
  );
}
