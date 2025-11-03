import type { ReactNode } from "react";
import Footer from "../components/Footer";
import { Header } from "../components/Header";

interface DefaultLayoutProps {
  children: ReactNode;
  backgroundImg?: string;
  isImgLoading?: boolean;
}

export default function DefaultLayout({
  children,
  backgroundImg,
  isImgLoading,
}: DefaultLayoutProps) {
  return (
    <div className="flex flex-col z-10 justify-between min-h-screen">
      <Header />
      <div className="flex flex-col items-center">
        {isImgLoading ? (
          <> </>
        ) : (
          <img
            src={backgroundImg}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover z-0 transition-opacity duration-5000 opacity-20
            )}`}
          />
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
}
