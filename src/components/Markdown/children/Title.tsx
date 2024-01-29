import { Heading } from "@radix-ui/themes";

export const H1 = ({ children }: { children: any }) => {
    return <Heading size="9">{children}</Heading>;
};
export const H2 = ({ children }: { children: any }) => {
    return <Heading size="8">{children}</Heading>;
};
export const H3 = ({ children }: { children: any }) => {
    return <Heading size="7">{children}</Heading>;
};
export const H4 = ({ children }: { children: any }) => {
    return <Heading size="6">{children}</Heading>;
};
export const H5 = ({ children }: { children: any }) => {
    return <Heading size="4">{children}</Heading>;
};
export const H6 = ({ children }: { children: any }) => {
    return <Heading size="3">{children}</Heading>;
};
