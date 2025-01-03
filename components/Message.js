const Message = ({ content, isUser }) => (
    <div className={`mb-4 rounded-lg p-4 ${isUser ? 'bg-gray-50' : 'bg-white'}`}>
      <p>{content}</p>
    </div>
  );
  
  export default Message;