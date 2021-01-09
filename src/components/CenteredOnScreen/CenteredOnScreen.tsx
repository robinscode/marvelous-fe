import { ReactNode } from 'react';

const CenteredOnScreen = ({children}: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      {children}
    </div>
  );
}

export default CenteredOnScreen;
