import { ReactNode } from "react";

const PageHeading = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-xl font-bold my-8 text-gray-500">{children}</h3>;
};

export default PageHeading;
