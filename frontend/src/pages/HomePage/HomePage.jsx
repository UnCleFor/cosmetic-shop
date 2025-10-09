import { Col, Row } from 'antd';
import React from 'react'
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent';
import SliderComponent from '../../components/SliderComponent/SliderComponent';

const HomePage = () => {
  // Mảng tĩnh sản phẩm
  const products = [
    {
      id: 1,
      name: "Nước hoa Guerlain",
      price: "2.500.000",
      image: "/assets/images/sample.png"
    },
    {
      id: 2,
      name: "Son môi Rouge",
      price: "950.000",
      image: "/assets/images/sample.png"
    },
    {
      id: 3,
      name: "Kem dưỡng Orchidée",
      price: "3.200.000",
      image: "/assets/images/sample.png"
    },
    {
      id: 4,
      name: "Kem dưỡng Orchidée",
      price: "3.200.000",
      image: "/assets/images/sample.png"
    }
  ];

  return (
    <div>
      <SliderComponent 
        slides={[
          "/assets/images/slide1.png",
          "/assets/images/slide2.png",
          "/assets/images/slide3.png"
        ]}
      />

      <h2>Sản phẩm nổi bật</h2>
      <Row gutter={[16, 16]} style={{ padding: "2rem" }}>
        {products.map((item) => (
          <Col xs={24} sm={12} md={6} key={item.id} >
            <ProductCardComponent product={item} />
          </Col>
        ))}
      </Row>
    </div>
      
  );
}

export default HomePage