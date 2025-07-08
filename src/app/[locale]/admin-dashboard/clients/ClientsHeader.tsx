"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchClientQuery } from "@/store/api/clientApiSlice";
import { useFormik } from "formik";
import { Plus, Search } from "lucide-react";
import * as yup from "yup";
import { debounce } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ClientsHeader({ setIsModalOpen, isModalOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const t = useTranslations("ClientsHeader");
  const {
    data: searchResults,
    isLoading: isSearching,
    error,
  } = useSearchClientQuery({ query: searchQuery });

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 500),
    []
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: yup.object({
      search: yup.string().max(100, t("errors.searchTooLong")),
    }),
    onSubmit: (values) => {
      setSearchQuery(values.search);
    },
  });

  // Handle search input changes
  const handleSearchChange = (e) => {
    formik.handleChange(e);
    debouncedSearch(e.target.value);
  };

  // Clean up debounce on unmount
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <header className="space-y-4">
      {/* Title + Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsModalOpen(!isModalOpen)}
          aria-label={t("buttons.addClient.ariaLabel")}
        >
          <Plus className="size-5" />
          <span>{t("buttons.addClient.label")}</span>
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col md:flex-row gap-4 w-full"
        >
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="flex items-center bg-background rounded-md px-3 py-2 w-full shadow-sm border border-input focus-within:border-primary">
              <Search className="size-5 text-muted-foreground" />
              <input
                type="text"
                name="search"
                placeholder={t("search.placeholder")}
                className="ml-2 w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                onChange={handleSearchChange}
                onBlur={formik.handleBlur}
                value={formik.values.search}
                aria-label={t("search.ariaLabel")}
              />
              {(isSearching || formik.isSubmitting) && (
                <span className="loading loading-spinner loading-xs absolute right-3"></span>
              )}
            </div>
            {formik.touched.search && formik.errors.search && (
              <p className="text-destructive text-xs mt-1">
                {formik.errors.search}
              </p>
            )}
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-64">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
              aria-label={t("filter.ariaLabel")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("filter.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filter.options.all")}</SelectItem>
                <SelectItem value="active">
                  {t("filter.options.active")}
                </SelectItem>
                <SelectItem value="inactive">
                  {t("filter.options.inactive")}
                </SelectItem>
                <SelectItem value="trial">
                  {t("filter.options.trial")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">{t("buttons.search")}</Button>
        </form>
      </div>

      {/* Search Status Indicator */}
      {searchQuery && (
        <div className="text-sm text-muted-foreground">
          {isSearching
            ? t("search.status.searching")
            : searchResults?.length > 0
            ? t("search.status.resultsFound", { count: searchResults.length })
            : t("search.status.noResults")}
        </div>
      )}
    </header>
  );
}
