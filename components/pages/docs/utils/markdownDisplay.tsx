'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const syntaxTheme = vscDarkPlus;


/* --------------------------------- */
const _markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |


\`\`\`ts
// Code block
function add(a: number, b: number): number {
    return a + b;
}
\`\`\`
`;
/* --------------------------------- */

type Props = {
    markdown: string;
};

export default function MarkdownDisplay({ markdown }: Props): JSX.Element {
    return (
        <div className='flex flex-col'>
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={syntaxTheme as any}
                                language={match[1]}
                                PreTag='div'
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
                remarkPlugins={[remarkGfm]}
            >
            {_markdown}
            </ReactMarkdown>
        </div>
    );
}
