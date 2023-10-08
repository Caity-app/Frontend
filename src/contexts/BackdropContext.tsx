import * as React from 'react';
import { Backdrop, BackdropContextType } from '../@types/backdrop';

export const BackdropContext = React.createContext<BackdropContextType | null>(null);

const BackdropProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [backdropOpacity, setBackdropOpacity] = React.useState<Backdrop>(0);
    return (
        <BackdropContext.Provider value={{ backdrop:backdropOpacity, setBackdrop:setBackdropOpacity }}>
            {children}
            {backdropOpacity > 0 && <div className='backdrop' onDragStart={e => e.preventDefault()} style={{ opacity: backdropOpacity }}></div>}
        </BackdropContext.Provider>
    );
};

export default BackdropProvider;