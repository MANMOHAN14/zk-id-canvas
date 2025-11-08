import { Loader2 } from "lucide-react";

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = "Loading..." }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default Loader;
