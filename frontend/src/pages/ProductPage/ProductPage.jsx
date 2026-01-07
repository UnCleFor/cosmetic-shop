// import React, { useState, useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
// import PaginationComponent from "../../components/PaginationComponent";
// import CosmeticsService from "../../services/cosmetic.service";

// import {
//   PageContainer,
//   Title,
//   ProductGrid,
//   FilterSortBar,
//   FilterGroup,
//   SortSelect
// } from "./ProductPage.styles";

// const ProductPage = () => {
//   const [page, setPage] = useState(1);
//   const [priceFilter, setPriceFilter] = useState(null);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [order, setOrder] = useState("asc");
//   const limit = 8;

//   // Build params (memo để tránh render dư)
//   const queryParams = useMemo(() => {
//     const params = {
//       page,
//       limit,
//     };


//     if (sortBy && order) {
//       params.sortBy = sortBy;
//       params.order = order;
//     }

//     if (priceFilter === "under200") {
//       params.maxPrice = 200000;
//     }
//     if (priceFilter === "200to400") {
//       params.minPrice = 200000;
//       params.maxPrice = 400000;
//     }
//     if (priceFilter === "over400") {
//       params.minPrice = 400000;
//     }

//     return params;
//   }, [page, limit, sortBy, order, priceFilter]);

//   // 👉 useQuery thay cho useEffect + useState
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["cosmetics", queryParams],
//     queryFn: () => CosmeticsService.getCosmetics(queryParams),
//     keepPreviousData: true,
//   });

//   const products = data?.cosmetics || [];
//   const total = data?.total || 0;

//   return (
//     <PageContainer>
//       <Title>Danh mục sản phẩm</Title>

//       {/* Filter & Sort */}
//       <FilterSortBar>
//         <FilterGroup>
//           <label>
//             <input
//               type="radio"
//               name="price"
//               onChange={() => {
//                 setPage(1);
//                 setPriceFilter("under200");
//               }}
//             />
//             Dưới 200k
//           </label>

//           <label>
//             <input
//               type="radio"
//               name="price"
//               onChange={() => {
//                 setPage(1);
//                 setPriceFilter("200to400");
//               }}
//             />
//             200k - 400k
//           </label>

//           <label>
//             <input
//               type="radio"
//               name="price"
//               onChange={() => {
//                 setPage(1);
//                 setPriceFilter("over400");
//               }}
//             />
//             Trên 400k
//           </label>
//         </FilterGroup>

//         <SortSelect>
//           <label>Sắp xếp:</label>
//           <select
//             onChange={(e) => {
//               const value = e.target.value;
//               setPage(1);

//               if (value === "default") {
//                 setSortBy("createdAt");
//                 setOrder("asc");
//                 return;
//               }

//               const [field, direction] = value.split("-");
//               setSortBy(field);
//               setOrder(direction);
//             }}
//           >
//             <option value="default">Mặc định</option>
//             <option value="price-asc">Giá tăng dần</option>
//             <option value="price-desc">Giá giảm dần</option>
//             <option value="name-asc">Tên A-Z</option>
//             <option value="name-desc">Tên Z-A</option>
//           </select>
//         </SortSelect>
//       </FilterSortBar>

//       {/* Loading / Error */}
//       {isLoading && <p>Đang tải sản phẩm...</p>}
//       {error && <p>Không thể tải sản phẩm</p>}

//       {/* Product Grid */}
//       <ProductGrid>
//         {products.map((item) => (
//           <ProductCardComponent key={item._id} product={item} />
//         ))}
//       </ProductGrid>

//       {/* Pagination */}
//       <PaginationComponent
//         total={total}
//         pageSize={limit}
//         current={page}
//         onChange={(p) => setPage(p)}
//       />
//     </PageContainer>
//   );
// };

// export default ProductPage;

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import PaginationComponent from "../../components/PaginationComponent";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import CosmeticsService from "../../services/cosmetic.service";

import {
  PageContainer,
  Title,
  ProductGrid,
  FilterSortBar,
  SortSelect
} from "./ProductPage.styles";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const limit = 8;

  const queryParams = useMemo(() => ({
    page,
    limit,
    sortBy,
    order,
  }), [page, limit, sortBy, order]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["cosmetics", queryParams],
    queryFn: () => CosmeticsService.getCosmetics(queryParams),
    keepPreviousData: true,
  });

  const products = data?.cosmetics || [];
  const total = data?.total || 0;

  return (
    <PageContainer>
      <Title>Danh mục sản phẩm</Title>

      <FilterSortBar>
        <SortSelect>
          <label>Sắp xếp:</label>
          <select
            onChange={(e) => {
              setPage(1);
              const value = e.target.value;

              if (value === "default") {
                setSortBy("createdAt");
                setOrder("asc");
                return;
              }

              const [field, direction] = value.split("-");
              setSortBy(field);
              setOrder(direction);
            }}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
          </select>
        </SortSelect>
      </FilterSortBar>

      {isLoading && <SpinnerComponent />}

      {isError && (
        <p style={{ textAlign: "center", color: "red" }}>
          Không thể tải sản phẩm
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {isFetching && <SpinnerComponent />}

          <ProductGrid style={{ opacity: isFetching ? 0.6 : 1 }}>
            {products.map((item) => (
              <ProductCardComponent
                key={item._id}
                product={item}
              />
            ))}
          </ProductGrid>

          {products.length === 0 && (
            <p style={{ textAlign: "center" }}>
              Không có sản phẩm
            </p>
          )}
        </>
      )}

      <PaginationComponent
        total={total}
        pageSize={limit}
        current={page}
        onChange={(p) => setPage(p)}
      />
    </PageContainer>
  );
};

export default ProductPage;
