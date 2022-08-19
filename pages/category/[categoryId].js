import React from 'react';
import {useRouter} from "next/router";

const Category = () => {
  const router = useRouter()
  const { categoryId } = router.query

  return (
    <div>

    </div>
  );
};

export default Category;
