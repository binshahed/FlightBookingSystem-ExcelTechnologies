import { ReactNode } from "react";

const HomeCard = ({ children, bg }: { children: ReactNode; bg: string }) => {
  return <div className={`p-6  rounded-3xl ${bg}`}>{children}</div>;
};

export default HomeCard;
