import { useLayoutEffect, useState } from "react"

export const usePagination = (initialPage, initialRowsPerPage) => {
  const [page, setPage] = useState(initialPage || 0)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage || 5)
  useLayoutEffect(() => {
    setPage(0)
  }, [rowsPerPage])
  return [page, setPage, rowsPerPage, setRowsPerPage]
}