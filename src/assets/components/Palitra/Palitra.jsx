import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import ColorThief from "colorthief";
import "./Palitra.scss";

const Palitra = () => {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState([]);
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

  const extractPalette = () => {
    const img = document.createElement("img");
    img.src = image;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const colorThief = new ColorThief();
      setPalette(colorThief.getPalette(img, numColors));
    };
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
            <Typography variant="body1">
            Перетащите файл или щелкните, чтобы загрузить изображение
            </Typography>
          </Box>
          {image && (
            <>
              <Box className="Palitra__preview">
                <img src={image} alt="Uploaded preview" />
              </Box>

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
              </div>
            </>
          )}
          {palette.length > 0 && (
            <Box className="Palitra__palette">
              {palette.map((color, index) => (
                <Box
                  key={index}
                  className="Palitra__colorBox"
                  style={{ backgroundColor: `rgb(${color.join(",")})` }}
                />
              ))}
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default Palitra;
