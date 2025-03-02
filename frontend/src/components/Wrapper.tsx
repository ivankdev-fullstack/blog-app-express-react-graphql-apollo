import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex min-h-screen flex-col">{children}</div>;
};

export default Wrapper;
