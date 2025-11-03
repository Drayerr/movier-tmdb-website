import { useState } from "react";
import { motion } from "framer-motion";
import {
  formatDateAndTimeBR,
  formatDateAndTimeEN,
} from "../utils/formatDateAndTime";
import type { Review } from "../types/movieServiceTypes";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";

export default function ReviewCard({
  author,
  created_at,
  content,
  author_details,
}: Review) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const MAX_LINES = 2;
  const [isExpanded, setIsExpanded] = useState(false);
  const showSeeMore = content.length > 200;

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  const baseAvatarPath = "https://image.tmdb.org/t/p/w300_and_h300_face/";

  const contentVariants = {
    collapsed: {
      height: `${MAX_LINES * 20}px`,
      opacity: 1,
      overflow: "hidden",
    },
    expanded: {
      height: "auto",
      opacity: 1,
      overflow: "visible",
    },
  };

  const buttonVariants = {
    arrowDow: {
      transform: "rotate(0deg)",
    },
    arrowUp: {
      transform: "rotate(180deg)",
    },
  };

  let avatarPath = "";
  if (author_details.avatar_path) {
    avatarPath = baseAvatarPath + author_details.avatar_path;
  }

  return (
    <div className="z-20 liquid-glass flex w-full overflow-hidden rounded-sm">
      <div className="flex gap-2">
        <div className="hidden sm:flex justify-center items-center size-19 min-w-19 m-2 border-2 border-slate-400 rounded-sm ">
          {avatarPath !== "" ? (
            <img
              src={avatarPath}
              className="inset-0 h-full w-full object-cover rounded-sm "
            />
          ) : (
            <PersonIcon fontSize="large" />
          )}
        </div>
        <div className="flex flex-col justify-start items-start p-2 pr-4 relative">
          <div className="flex gap-4 items-center ">
            <div className="text-xl font-bold">{author}</div>
            <div className="text-sm hidden sm:flex">
              {currentLanguage === "en"
                ? formatDateAndTimeEN(created_at)
                : formatDateAndTimeBR(created_at)}
            </div>
          </div>
          <motion.div
            variants={contentVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-sm"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isExpanded || !showSeeMore ? "unset" : MAX_LINES,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {content}
          </motion.div>
          {showSeeMore && (
            <motion.button
              variants={buttonVariants}
              onClick={toggleExpansion}
              initial="arrowDown"
              animate={isExpanded ? "arrowUp" : "arrowDown"}
              className="liquid-glass hover:brightness-150 rounded-full text-sm  focus:outline-none  top-0 right-0 absolute mr-2 mt-2 hover:cursor-pointer"
            >
              <ArrowDropDownIcon fontSize="small" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
