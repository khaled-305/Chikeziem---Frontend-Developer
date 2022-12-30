import * as React from 'react';

const Layout = ({ children }) => {

  return (
    <div className="bg-slate-100 md:h-full pb-10 h-full">
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
};


export default Layout;
