import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  message: Message;
};

function Message({ message }: Props) {
  const isAI = message.fromBot;

  return (
    <div className={`py-5 text-white ${isAI && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 mx-auto mx-w-2xl items-top">
        <img
          className="h-10 w-10"
          src={
            isAI
              ? "https://drive.google.com/thumbnail?id=12g5KhKTU5jja3fR7EN-HZ3iq1S62njMu"
              : "https://drive.google.com/thumbnail?id=1-VpjN2cYjmE35LHjrDpD7d0T2vl3kYln"
          }
          alt=""
        ></img>
        { isAI 
          ? 
          <SyntaxHighlighter language="swift" style={docco}>
            {message.text}
            </SyntaxHighlighter>
          : <p className="pt-1 text-sm whitespace-break-spaces">{message.text}</p>
        }
      </div>
    </div>
  );
}

export default Message;
