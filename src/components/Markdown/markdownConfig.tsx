import { MarkdownToJSX } from "markdown-to-jsx";
import { H1, H2, H3, H4, H5, H6 } from "./children/Title";
import { Link } from "@radix-ui/themes";
import { Span, P } from "./children/Text";
import LazyImage from "./children/LazyImage";

function getMarkdownConfig(isLazyLoadImage: boolean): MarkdownToJSX.Options {
    const basicConfig = {
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
    if (isLazyLoadImage) {
        (basicConfig.overrides as any).image = LazyImage;
    }
    return basicConfig;
}
export default getMarkdownConfig;
