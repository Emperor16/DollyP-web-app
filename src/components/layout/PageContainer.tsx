import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageContainer = ({ children }: Props) => {
  return (
    <div className="bg-dp-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
