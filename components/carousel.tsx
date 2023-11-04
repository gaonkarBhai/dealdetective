"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { HeartIcon } from "./icon/HeartIcon";
// import HeartIcon from "@/components/icons/HeartIcon";

const heroImgs = [
    {
        imgUrl: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX569_.jpg",
        alt: "one plus",
    },
    {
        imgUrl: "https://m.media-amazon.com/images/I/71lG7br7k1L._SY450_.jpg",
        alt: "Apple Watch SE",
    },
    {
        imgUrl: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SX522_.jpg",
        alt: "Apple AirPods",
    },
    {
        imgUrl: "https://m.media-amazon.com/images/I/71lG7br7k1L._SY450_.jpg",
        alt: "Apple Watch SE",
    },
    {
        imgUrl: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX569_.jpg",
        alt: "one plus",
    },
];

const HeroCarousel = () => {
    const [liked, setLiked] = React.useState(false);

    return (
        <>
            <Swiper
                modules={[Pagination]}
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {heroImgs.map((prod,i) => (
                    <SwiperSlide key={i}>
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 justify-between flex space-x-3 items-start">
                                <div className="flex-col items-start">
                                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                    <small className="text-default-500">12 Tracks</small>
                                    <h4 className="font-bold text-large">Frontend Radio</h4>
                                </div>
                                <div className="flex items-start ">
                                    <Button
                                        isIconOnly
                                        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                        radius="full"
                                        variant="light"
                                        onPress={() => setLiked((v) => !v)}
                                    >
                                        <HeartIcon
                                            className={liked ? "[&>path]:stroke-transparent" : ""}
                                            fill={liked ? "red" : ""}
                                            width={24}
                                            height={24}
                                        />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={prod.imgUrl}
                                    width={270}
                                />
                            </CardBody>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default HeroCarousel;


{/* <Carousel
    showThumbs={false}
    autoPlay
    infiniteLoop
    interval={2000}
    showArrow={false}
    showStatus={false}
    >
                {heroImgs.map((prod)=>(
                    <Card className="py-4" key={prod.alt}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                         <p className="text-tiny uppercase font-bold">Daily Mix</p>
                         <small className="text-default-500">12 Tracks</small>
                         <h4 className="font-bold text-large">Frontend Radio</h4>
                        </CardHeader>
                         <CardBody className="overflow-visible py-2">
                            <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={prod.imgUrl}
                            width={270}
                            />
                        </CardBody>
                     </Card>
                ))}
          </Carousel> */}