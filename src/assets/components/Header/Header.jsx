import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import "./Header.scss";

import ru from "../../images/ru.png";
import en from "../../images/en.png";
import kg from "../../images/kg.png";
import profile from "../../images/profile.svg";

const flags = {
  ru: ru,
  en: en,
  kg: kg,
};

const Header = () => {
  const [language, setLanguage] = useState("ru"); 

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="Header">
      <div className="container">
        <div className="Header__content">
          <div className="Header__logo">
            <h2>MindMesh</h2>
            <FormControl 
              sx={{
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent", // прозрачный фон
                  color: "#ffffff", // белый цвет текста
                  borderColor: "#ffffff", // белый цвет бордера
                  "& fieldset": {
                    borderColor: "#ffffff", // белый цвет рамки
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff", // белый цвет при наведении
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff", // белый цвет при фокусе
                  },
                },
              }}
            >
              <InputLabel sx={{ color: "#ffffff" }}></InputLabel>
              <Select
                value={language}
                onChange={handleChange}
                sx={{
                  color: "#ffffff",
                  borderRadius:"20px", // белый цвет текста
                }}
                renderValue={(value) => (
                  <div style={{  display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={flags[value]} 
                      alt={`${value} flag`} 
                      style={{  width: 20, height: 15, marginRight: 8 }} 
                    />
                    <Typography>{value.toUpperCase()}</Typography>
                  </div>
                )}
              >
                <MenuItem value="ru">
                  <img src={flags.ru} alt="RU flag" style={{ width: 20, height: 15, marginRight: 8 }} />
                  RU | Русский
                </MenuItem>
                <MenuItem value="en">
                  <img src={flags.en} alt="EN flag" style={{ width: 20, height: 15, marginRight: 8 }} />
                  EN | English
                </MenuItem>
                <MenuItem value="kg">
                  <img src={flags.kg} alt="KG flag" style={{ width: 20, height: 15, marginRight: 8 }} />
                  KG | Кыргызский
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="Header__list">
            <ul>
              <li>Цвета</li>
              <li>Палитра</li>
              <li>Градиенты</li>
              <li>Меше градиенты</li>
            </ul>
          </div>
          <div className="Header__profile">
            <img src={profile} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
