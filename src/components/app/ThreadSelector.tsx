import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ThreadSelectorProps extends React.HTMLAttributes<HTMLElement> {}

export function ThreadSelector({ className, ...props }: ThreadSelectorProps) {
  return (
    <aside
      id="thread-selector"
      className={cn("h-full w-16 border-r-3 border-amber-600", className)}
      {...props}
    >
      <ScrollArea className="mt-2 h-full w-full">
        <div className="flex flex-col items-center gap-3 pb-4">
          <Avatar>
            <AvatarImage src="https://github.com/jukelyn.png" alt={"first"} />
            <AvatarFallback>FR</AvatarFallback>
          </Avatar>
          {Array.from({ length: 30 }).map((_, i) => {
            const isEven = i % 2 === 0;

            return (
              <Avatar key={i}>
                <AvatarImage
                  src={
                    isEven
                      ? "https://github.com/shadcn.png"
                      : "https://github.com/evilrabbit.png"
                  }
                  alt={isEven ? "@shadcn" : "@evilrabbit"}
                />
                <AvatarFallback>{isEven ? "CN" : "ER"}</AvatarFallback>
              </Avatar>
            );
          })}
          <Avatar>
            <AvatarImage src="https://github.com/raeki.png" alt={"extra"} />
            <AvatarFallback>EX</AvatarFallback>
          </Avatar>
        </div>
      </ScrollArea>
    </aside>
  );
}
