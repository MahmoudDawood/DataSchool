import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const markdownToHTML = (markdown: string) => {
	// Content is received as a multiline md joined by a \\n using the regex (/\n/g, "\\n")
	const multiLineContent = markdown.replace(/\\n/g, "\n");
	const htmlContent = marked.parse(multiLineContent);
	const cleanHTML = DOMPurify.sanitize(htmlContent);
	return cleanHTML;
};

export default markdownToHTML;
