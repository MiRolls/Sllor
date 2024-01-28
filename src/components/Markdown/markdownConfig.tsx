import { MarkdownToJSX } from "markdown-to-jsx";
import { H1, H2, H3, H4, H5, H6 } from "./children/Title";
import { Link } from "@radix-ui/themes";
import { Span, P } from "./children/Text";

const markdownConfig: MarkdownToJSX.Options = {
    overrides: {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        a: Link,
        span: Span,
        p: P,
    },
};
export default markdownConfig;
