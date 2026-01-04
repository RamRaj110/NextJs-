import { LucideIcon } from "lucide-react";

interface MetricProps {
  icon: LucideIcon;
  value: number | string;
  title: string;
  href?: string;
  isAuthor?: boolean;
  textStyles?: string;
}

const Metric = ({ icon: Icon, value, title, textStyles }: MetricProps) => (
  <div className="flex items-center gap-1 justify-center flex-wrap">
    <Icon size={16} className={`text-muted-foreground ${textStyles}`} />
    <p className={`${textStyles} flex items-center gap-1`}>
      {value}
      {title && (
        <span className="small-regular line-clamp-1 text-muted-foreground">
          {title}
        </span>
      )}
    </p>
  </div>
);

export default Metric;
