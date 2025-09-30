import React from "react";
import { Input } from "antd";
import { SearchWrapper } from "./SearchComponent.styles";

const { Search } = Input;

const SearchComponent = ( props) =>  {
    const {placeholder} = props;
    return (
        <SearchWrapper>
            <Search
                placeholder={placeholder || "Tìm kiếm sản phẩm..."}
                allowClear
            />
        </SearchWrapper>
    );
}

export default SearchComponent;