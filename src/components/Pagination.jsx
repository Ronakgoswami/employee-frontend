import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, totalPages, onChange }) => {
  console.log('Pagination props:', { page, totalPages });
  
  const validPage = page && page > 0 ? page : 1;
  const validTotalPages = totalPages && totalPages > 0 ? totalPages : 1;
  
  return (
    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
      <MuiPagination
        count={validTotalPages}
        page={validPage}
        onChange={(e, value) => onChange(value)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default Pagination;