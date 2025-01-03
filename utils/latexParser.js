const parseLatexCommands = (text) => {
    const commands = {
      title: (content) => ({ type: 'title', content }),
      author: (content) => ({ type: 'author', content }),
      date: (content) => ({ type: 'date', content }),
      section: (content) => ({ type: 'heading', content }),
      textbf: (content) => ({ type: 'bold', content }),
      begin: (content, body) => {
        switch (content) {
          case 'itemize':
            return {
              type: 'list',
              items: body.split('\\item').filter(Boolean).map(item => item.trim())
            };
          case 'tabular':
            return {
              type: 'table',
              rows: body.split('\\\\').map(row => 
                row.split('&').map(cell => cell.trim())
              )
            };
          default:
            return { type: 'text', content: body };
        }
      }
    };
  
    let parsed = text;
  
    // <PDFContent proposal={proposalTemplate} />
    // Parse commands like \command{content}
    Object.keys(commands).forEach(cmd => {
      const regex = new RegExp(`\\\\${cmd}{([^}]*)}`, 'g');
      parsed = parsed.replace(regex, (_, content) => {
        return JSON.stringify(commands[cmd](content));
      });
    });
  
    // Parse \begin{env}...\end{env} blocks
    const beginRegex = /\\begin{(\w+)}([\s\S]*?)\\end{\1}/g;
    parsed = parsed.replace(beginRegex, (_, env, body) => {
      return JSON.stringify(commands.begin(env, body));
    });
  
    try {
      return JSON.parse(parsed);
    } catch {
      return { type: 'text', content: text };
    }
  };
  
  export const parseLatexContent = (jsonContent) => {
    const metadata = {
      title: parseLatexCommands(jsonContent.metadata.title),
      author: parseLatexCommands(jsonContent.metadata.author),
      date: parseLatexCommands(jsonContent.metadata.date)
    };
  
    const sections = jsonContent.sections.map(section => ({
      type: section.type,
      heading: parseLatexCommands(section.content),
      content: parseLatexCommands(section.body)
    }));
  
    return { metadata, sections };
  };