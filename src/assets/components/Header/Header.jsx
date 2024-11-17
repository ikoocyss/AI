import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
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
          </div>
          <div className="Header__profile">

            <img src={profile} alt="" />
            <FormControl
              sx={{
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent",
                  color: "#ffffff", 
                  borderColor: "#ffffff", 
                  "& fieldset": {
                    borderColor: "#ffffff", 
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff", 
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
                  borderRadius: "3px", 
                }}
                renderValue={(value) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={flags[value]}
                      alt={`${value} flag`}
                      style={{ width: 13, height: 12, marginRight: 8 }}
                    />
                    <Typography>{value.toUpperCase()}</Typography>
                  </div>
                )}
              >
                <MenuItem value="ru">
                  <img
                    src={flags.ru}
                    alt="RU flag"
                    style={{ width: 20, height: 15, marginRight: 8 }}
                  />
                  RU | Русский
                </MenuItem>
                <MenuItem value="en">
                  <img
                    src={flags.en}
                    alt="EN flag"
                    style={{ width: 20, height: 15, marginRight: 8 }}
                  />
                  EN | English
                </MenuItem>
                <MenuItem value="kg">
                  <img
                    src={flags.kg}
                    alt="KG flag"
                    style={{ width: 20, height: 15, marginRight: 8 }}
                  />
                  KG | Кыргызский
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
