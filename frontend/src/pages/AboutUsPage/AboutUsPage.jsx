import React from "react";
import { Card, Typography, Divider, List } from "antd";
import {
    ShopOutlined,
    HeartOutlined,
    SafetyCertificateOutlined,
    SkinOutlined,
    TeamOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import "./AboutUsPage.css";

const { Title, Paragraph } = Typography;

const AboutUsPage = () => {
    return (
        <div className="about-page">
            <Card className="about-card">
                {/* HEADER */}
                <div className="about-header">
                    <ShopOutlined style={{ fontSize: 48, color: "#E15404" }} />
                    <Title level={2} className="about-title">
                        VỀ NGỌC NHƯ MEDICAL SPA
                    </Title>
                    <div className="about-subtitle">
                        MEDICAL SPA & MỸ PHẨM CHÍNH HÃNG CHUẨN Y KHOA
                    </div>
                </div>

                <Divider />

                {/* GIỚI THIỆU */}
                <Divider orientation="left">
                    <ShopOutlined style={{ color: "#E15404", marginRight: 8 }} />
                    GIỚI THIỆU CHUNG
                </Divider>

                <Paragraph>
                    <strong>Ngọc Như Medical Spa</strong> là mô hình kết hợp giữa chăm sóc
                    da chuẩn y khoa và phân phối mỹ phẩm chính hãng, mang đến giải pháp
                    làm đẹp toàn diện và an toàn cho khách hàng.
                </Paragraph>

                <List
                    size="small"
                    dataSource={[
                        "Cung cấp mỹ phẩm chính hãng, có nguồn gốc rõ ràng và được kiểm định an toàn",
                        "Ứng dụng công nghệ và liệu trình chăm sóc da chuẩn y khoa",
                        "Tư vấn cá nhân hóa theo từng tình trạng da và nhu cầu thực tế",
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <CheckCircleOutlined
                                style={{ color: "#E15404", marginRight: 8 }}
                            />
                            {item}
                        </List.Item>
                    )}
                />

                {/* MỸ PHẨM */}
                <Divider orientation="left">
                    <SkinOutlined style={{ color: "#E15404", marginRight: 8 }} />
                    MỸ PHẨM CHÍNH HÃNG TẠI NGỌC NHƯ
                </Divider>

                <Paragraph>
                    Hệ thống website là kênh mua sắm trực tuyến giúp khách hàng dễ dàng
                    tiếp cận các dòng mỹ phẩm chuyên biệt, phù hợp với nhiều loại da và
                    mục tiêu chăm sóc khác nhau.
                </Paragraph>

                <List
                    size="small"
                    dataSource={[
                        "Sản phẩm làm sạch, dưỡng da, phục hồi và chống lão hóa",
                        "Mỹ phẩm hỗ trợ điều trị mụn, nám, tăng sắc tố và da nhạy cảm",
                        "Các dòng mỹ phẩm được khuyến nghị sử dụng trước, trong và sau liệu trình spa",
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <CheckCircleOutlined
                                style={{ color: "#E15404", marginRight: 8 }}
                            />
                            {item}
                        </List.Item>
                    )}
                />

                {/* KẾT NỐI SPA & SẢN PHẨM */}
                <Divider orientation="left">
                    <HeartOutlined style={{ color: "#E15404", marginRight: 8 }} />
                    KẾT NỐI LIỆU TRÌNH SPA & CHĂM SÓC DA TẠI NHÀ
                </Divider>

                <Paragraph>
                    Việc kết hợp giữa điều trị chuyên sâu tại spa và chăm sóc da đúng cách
                    tại nhà đóng vai trò quan trọng trong việc duy trì và tối ưu hiệu quả
                    làm đẹp.
                </Paragraph>

                <List
                    size="small"
                    dataSource={[
                        "Xây dựng chu trình chăm sóc da khép kín, khoa học",
                        "Hướng dẫn sử dụng mỹ phẩm phù hợp sau mỗi liệu trình",
                        "Theo dõi và điều chỉnh sản phẩm theo tiến trình cải thiện da",
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <CheckCircleOutlined
                                style={{ color: "#E15404", marginRight: 8 }}
                            />
                            {item}
                        </List.Item>
                    )}
                />

                {/* GIÁ TRỊ CỐT LÕI */}
                <Divider orientation="left">
                    <SafetyCertificateOutlined
                        style={{ color: "#E15404", marginRight: 8 }}
                    />
                    GIÁ TRỊ CỐT LÕI
                </Divider>

                <List
                    size="small"
                    dataSource={[
                        "An toàn & Hiệu quả: Ưu tiên sức khỏe và hiệu quả lâu dài của làn da",
                        "Chính hãng & Minh bạch: Cam kết nguồn gốc và thông tin sản phẩm rõ ràng",
                        "Đồng hành lâu dài: Theo sát hành trình chăm sóc da của khách hàng",
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <CheckCircleOutlined
                                style={{ color: "#E15404", marginRight: 8 }}
                            />
                            {item}
                        </List.Item>
                    )}
                />

                {/* CAM KẾT */}
                <Divider orientation="left">
                    <HeartOutlined style={{ color: "#E15404", marginRight: 8 }} />
                    CAM KẾT CỦA CHÚNG TÔI
                </Divider>

                <List
                    size="small"
                    dataSource={[
                        "Cung cấp mỹ phẩm chính hãng, được kiểm định và cấp phép lưu hành",
                        "Tư vấn trung thực, minh bạch về sản phẩm và liệu trình",
                        "Giá cả rõ ràng, chính sách đổi trả và hỗ trợ khách hàng minh bạch",
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <CheckCircleOutlined
                                style={{ color: "#E15404", marginRight: 8 }}
                            />
                            {item}
                        </List.Item>
                    )}
                />

                {/* FOOTER */}
                <div className="about-footer">
                    © 2026 NGỌC NHƯ MEDICAL SPA. ALL RIGHTS RESERVED.
                </div>
            </Card>
        </div>
    );
};

export default AboutUsPage;
