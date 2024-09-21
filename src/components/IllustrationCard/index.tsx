import React, { useState } from 'react';
import './IllustrationCard.css';


interface IllustrationCardProps {
  imageUrl: string;
  title: string;
  height?: number;
  width?: number;
}

const IllustrationCard = ({ imageUrl, title, height = 128, width = 128 }: IllustrationCardProps) => {
  const [hovered, setHovered] = useState<string>("");

  const handleMouseEnter = () => {
    setHovered("hovered");
  };

  const handleMouseLeave = () => {
    setHovered("");
  };

  return (
    <div
      className={`illustration-card ${hovered}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img srcSet={imageUrl}
        alt={title}
        height={height}
        width={width}
      />
      <p className="illustration-title">{title}</p>
    </div>
  );
};

export default IllustrationCard;
