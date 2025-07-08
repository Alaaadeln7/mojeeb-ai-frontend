import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationTableProps {
  totalPages: number;
  page: number;
  handlePageChange: (page: number) => void;
}

export default function PaginationTable({
  totalPages,
  page,
  handlePageChange,
}: PaginationTableProps) {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 mt-5 mb-20">
      <div className="flex-1 flex items-center justify-center sm:justify-end gap-1">
        {/* Previous Page Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                variant={page === pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
                aria-label={`Page ${pageNumber}`}
                aria-current={page === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </Button>
            )
          )}
        </div>

        {/* Next Page Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
