import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import ColorThief from "colorthief";
import "./Palitra.scss";

const Palitra = () => {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [dominantColor, setDominantColor] = useState("");
  const [numColors, setNumColors] = useState(5);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const rgbToHex = ([r, g, b]) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const extractDominantColor = () => {
    const img = document.createElement("img");
    img.src = image;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const colorThief = new ColorThief();
      setDominantColor(rgbToHex(colorThief.getColor(img)));
    };
  };

  const extractPalette = () => {
    const img = document.createElement("img");
    img.src = image;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const colorThief = new ColorThief();
      setPalette(colorThief.getPalette(img, numColors).map(rgbToHex));
    };
    extractDominantColor();
  };

  const sortPaletteByBrightness = () => {
    const sortedPalette = [...palette].sort((a, b) => {
      const brightnessA = a
        .substring(1)
        .match(/.{2}/g)
        .map((hex) => parseInt(hex, 16))
        .reduce((acc, val) => acc + val) / 3;
      const brightnessB = b
        .substring(1)
        .match(/.{2}/g)
        .map((hex) => parseInt(hex, 16))
        .reduce((acc, val) => acc + val) / 3;
      return brightnessA - brightnessB;
    });
    setPalette(sortedPalette);
  };

  const createGradient = () => {
    return `linear-gradient(to right, ${palette.join(", ")})`;
  };

  const downloadPalette = () => {
    const paletteData = JSON.stringify(palette, null, 2);
    const blob = new Blob([paletteData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "palette.json";
    link.click();
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    alert(`Цвет ${hex} скопирован в буфер обмена!`);
  };

  const clearImage = () => {
    setImage(null);
    setPalette([]);
    setDominantColor("");
  };

  return (
    <div className="Palitra">
      <div className="container">
        <div className="Palitra__content">
          <Typography variant="h4" className="Palitra__title">
            Извлечь цветовую палитру из фотографии
          </Typography>
          <Typography variant="body1" className="Palitra__description">
            Загрузите изображение, и наш инструмент определит ключевые цвета для
            создания палитры. Это поможет вам понять, какие цвета подходят для
            вашего проекта или вдохновит на новые идеи.
          </Typography>

          <Box {...getRootProps()} className="Palitra__dropzone">
            <input {...getInputProps()} />
            {image ? (
              <img
                src={image}
                alt="Uploaded preview"
                className="Palitra__uploadedImage"
              />
            ) : (
              <Typography variant="body1">
                Перетащите файл или щелкните, чтобы загрузить изображение
              </Typography>
            )}
          </Box>

          {image && (
            <div className="Palitra__flex">
              <FormControl className="Palitra__colorCount">
                <InputLabel>Количество цветов</InputLabel>
                <Select
                  value={numColors}
                  onChange={(e) => setNumColors(e.target.value)}
                >
                  {[3, 5, 7, 10].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={extractPalette}
                variant="contained"
                className="Palitra__button"
              >
                Определить Палитру
              </Button>
              <Button
                onClick={sortPaletteByBrightness}
                variant="outlined"
                className="Palitra__button"
              >
                Сортировать по яркости
              </Button>
              <Button onClick={clearImage} variant="outlined" color="secondary">
                Очистить изображение
              </Button>
              <Button
                onClick={downloadPalette}
                variant="outlined"
                className="Palitra__button"
              >
                Скачать палитру
              </Button>
            </div>
          )}

          {dominantColor && (
            <Box className="Palitra__dominantColor">
              <Typography variant="h6">Доминирующий цвет:</Typography>
              <Tooltip title="Нажмите, чтобы скопировать HEX-код" arrow>
                <Box
                  className="Palitra__colorBox"
                  style={{ backgroundColor: dominantColor }}
                  onClick={() => copyToClipboard(dominantColor)}
                />
              </Tooltip>
              <Typography variant="caption">{dominantColor}</Typography>
            </Box>
          )}

          {palette.length > 0 && (
            <Box className="Palitra__palette" style={{ background: createGradient() }}>
              {palette.map((color, index) => (
                <Tooltip title="Нажмите, чтобы скопировать HEX-код" arrow key={index}>
                  <Box
                    className="Palitra__colorWrapper"
                    onClick={() => copyToClipboard(color)}
                  >
                    <Box
                      className="Palitra__colorBox"
                      style={{ backgroundColor: color }}
                    />
                    <Typography
                      variant="caption"
                      className="Palitra__colorCode"
                      sx={{ fontSize: "18px", color:'#fff' }}
                    >
                      {color}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default Palitra;
