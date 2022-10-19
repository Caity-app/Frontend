import { ComponentType } from "react";

interface IconProps {
    className?: string;
}

interface SideBarItemProps {
    Icon: ComponentType<IconProps>;
    children?: React.ReactNode;
    className?: string;
}

const SideBarItem = ({ Icon, children, className } : SideBarItemProps) => {
    return (
        <li className={'flex gap-3 hover:bg-zinc-600 px-4 py-2 transition-color hover:cursor-pointer' + (className == null ? '' : ' ' + className)}><Icon />{children}</li>
    )
}

export default SideBarItem;