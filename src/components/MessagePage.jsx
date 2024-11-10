import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MessagePage.css';

const MessagePage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`https://textimagesaver.vercel.app/api/message/${id}`);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Failed to fetch message:', error);
      }
    };

    fetchMessage();
  }, [id]);

  const copyURLToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess('URL copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000); // Reset copy feedback after 3 seconds
    } catch (err) {
      setCopySuccess('Failed to copy URL.');
      console.error('Failed to copy URL: ', err);
    }
  };

  if (!message) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      {/* Render HTML content safely */}
      <div dangerouslySetInnerHTML={{ __html: message }} />
      <button onClick={copyURLToClipboard} className="copy-button">
        Copy URL
      </button>
      {copySuccess && <div className="copy-feedback">{copySuccess}</div>}
    </div>
  );
};

export default MessagePage;
    