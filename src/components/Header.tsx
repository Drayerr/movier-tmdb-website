import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SearchBar } from "./SearchBar";

export function Header() {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  function handleClickLanguageSelect(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseLanguageSelect() {
    setAnchorEl(null);
  }

  function changeLanguage(lng: "pt" | "en") {
    i18n.changeLanguage(lng);
    handleCloseLanguageSelect();
  }

  return (
    <div className="min-w-screen flex sm:grid sm:grid-cols-3 justify-center items-center px-4 h-20 z-10">
      <Link to={"/"} className="w-40">
        <div className="flex justify-start items-center hover:cursor-pointer px-4 hover:opacity-70 transition-opacity   ">
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/m_collection_png/512x512/plain/movie.png"
            width={40}
            height={40}
            className="rotate-16"
          />
          <h2 className="font-bold text-2xl ">MOVIER</h2>
        </div>
      </Link>
      <div className="hidden sm:flex">
        <SearchBar />
      </div>

      <div className="hidden sm:flex justify-end">
        <div className="flex gap-4 items-center justify-end  pr-2 ">
          <IconButton
            id="language-button"
            aria-controls={open ? "language-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickLanguageSelect}
            sx={{ color: "white" }}
          >
            <PublicIcon />
          </IconButton>

          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseLanguageSelect}
          >
            <MenuItem
              onClick={() => changeLanguage("pt")}
              selected={i18n.language === "pt"}
            >
              🇧🇷 Português
            </MenuItem>
            <MenuItem
              onClick={() => changeLanguage("en")}
              selected={i18n.language === "en"}
            >
              🇺🇸 English
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
