import { cn } from "@/utils/cn";

type Props = {};

export default function Container(
  containerProps: React.HTMLProps<HTMLDivElement>,
) {
  return (
    <div
      {...containerProps}
      className={cn(
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        containerProps.className,
      )}
    />
  );
}
