import { Pagination } from "@mui/material";
import { memo, useCallback } from "react";

function PaginationComponent({ count, page, setPage, pageSize }) {
  const handleChangePage = useCallback((_event, value) => {
    setPage(value);
  });

  return (
    <Pagination
      count={(count < pageSize
        ? 0
        : Number(count / pageSize) + Number(count % pageSize !== 0 ? 1 : 0)
      ).toFixed(0)}
      showFirstButton
      showLastButton
      page={page}
      onChange={handleChangePage}
      color="primary"
    />
  );
}

const PaginationComp = memo(PaginationComponent);

export default PaginationComp;
