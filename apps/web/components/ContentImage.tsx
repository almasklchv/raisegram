'use client';

import React from "react";
import Image from "next/image";
import styles from "../styles/ContentImage.module.scss";

const ContentImage = () => {
  const handleDownload = () => {
    const posterImage: HTMLImageElement = document.querySelector(".poster");
    const imageUrl = posterImage.src;
    const imageName = "post-image.png";

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Создаем ссылку на Blob
        const url = URL.createObjectURL(blob);
        // Создаем временный ссылочный элемент
        const link = document.createElement("a");
        // Устанавливаем атрибуты для скачивания файла
        link.href = url;
        link.download = imageName;
        // Эмулируем клик на ссылке
        link.click();
        // Освобождаем ресурсы после скачивания
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Ошибка при скачивании файла:", error);
      });
  };

  return (
    <div className={styles.message__content}>
      <Image
        className="poster"
        src={"/assets/images/post-img-example.png"}
        alt="post image"
        width={500}
        height={508.214}
      />
      <Image
        onClick={handleDownload}
        className={styles.icon}
        src={"/assets/icons/download.svg"}
        alt="download icon"
        width={40}
        height={40}
      />
    </div>
  );
};

export default ContentImage;
