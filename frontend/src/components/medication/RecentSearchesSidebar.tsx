import { Clock, History, Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export interface RecentSearch {
  id: string;
  query: string;
  timestamp: Date;
}

interface RecentSearchesSidebarProps {
  searches: RecentSearch[];
  onSelectSearch: (query: string) => void;
  onClearHistory: () => void;
}

export function RecentSearchesSidebar({
  searches,
  onSelectSearch,
  onClearHistory,
}: RecentSearchesSidebarProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2 font-semibold">
          <History className="h-4 w-4 text-muted-foreground" />
          <span>Recent Checks</span>
        </div>
        {searches.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={onClearHistory}
          >
            Clear
          </Button>
        )}
      </div>
      <Separator />
      <ScrollArea className="flex-1 p-2">
        {searches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-sm text-muted-foreground">
            <Clock className="mb-2 h-8 w-8 opacity-20" />
            <p>No recent checks</p>
            <p className="mt-1 text-xs">Your history will appear here</p>
          </div>
        ) : (
          <div className="space-y-1">
            {searches.map((search) => (
              <Button
                key={search.id}
                variant="ghost"
                className="w-full justify-start font-normal"
                onClick={() => onSelectSearch(search.query)}
              >
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="truncate capitalize">{search.query}</span>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
