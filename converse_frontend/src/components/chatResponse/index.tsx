import React from 'react';

const ChatResponse: React.FC<{ response: string }> = ({ response }) => {
  const sections = response.split(/\*{2,}/);
  

  return (
    <div>
      {sections.map((section, index) => {
        if (section.trim() === '') return null;

        const Element = index % 2 === 0 ? 'p' : 'strong';

        return <Element key={index}>{section}</Element>;
      })}
    </div>
  );
};

export default ChatResponse;
