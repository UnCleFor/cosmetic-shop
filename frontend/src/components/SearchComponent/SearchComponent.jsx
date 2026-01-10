import React, { useState } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./SearchComponent.css";

const { Search } = Input;

const SearchComponent = ({ placeholder }) => {
    const navigate = useNavigate();
    const [value, setValue] = useState("");

    const handleSearch = (searchValue) => {
        if (!searchValue.trim()) return;

        navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    };

    return (
        <div className="search-wrapper">
            <Search
                placeholder={placeholder || "Tìm kiếm sản phẩm..."}
                allowClear
                className="search-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onSearch={handleSearch}
                enterButton
            />
        </div>
    );
};

export default SearchComponent;