import { Text } from "@radix-ui/themes";

export const Span = ({ children }: { children: any }) => {
  return (
    <Text align={"left"} className="inline-block">
      {children}
    </Text>
  );
};

export const P = ({ children }: { children: any }) => {
  return (
    <Text align={"left"} className="!mt-3 block">
      {children}
    </Text>
  );
};
