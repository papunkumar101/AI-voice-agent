import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Mic, MicOff, X } from 'lucide-react';
import axios from 'axios';
import Button from './components/ui/button';
import { startSpeechRecognition, speakText } from '../src/components/helper/speechHelpers';

export default function HelpDeskChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [dimensions, setDimensions] = useState({ width: 320, height: 384 }); // default: 80x96 (tailwind w-80 h-96)
    const resizingRef = useRef(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async e => {
        if (e?.preventDefault) e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await axios.post('http://localhost:3000/chat', {
                message: input,
            });

            const botText = response.data || 'Sorry, something went wrong.';
            setMessages(prev => [...prev, { text: botText, sender: 'bot' }]);
            speakText(botText); // Make bot speak
        } catch (error) {
            console.error('API Error:', error);
            const errorMsg = 'Oops! Could not reach the server.';
            setMessages(prev => [...prev, { text: errorMsg, sender: 'bot' }]);
            speakText(errorMsg);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            recognitionRef.current = startSpeechRecognition(
                transcript => {
                    setInput(transcript);
                    sendMessage(); // Optional: auto send after speech
                },
                () => setIsListening(false)
            );
            setIsListening(true);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // Drag to resize logic
    const startResizing = e => {
        e.preventDefault();
        resizingRef.current = true;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResizing);
    };

    const resize = e => {
        if (!resizingRef.current) return;
        setDimensions(prev => ({
            width: Math.max(280, e.clientX - chatBoxRef.current.getBoundingClientRect().left),
            height: Math.max(300, e.clientY - chatBoxRef.current.getBoundingClientRect().top),
        }));
    };

    const stopResizing = () => {
        resizingRef.current = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResizing);
    };

    const chatBoxRef = useRef(null);

    return (
        <div className='fixed bottom-6 right-6 flex flex-col items-end z-50'>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatBoxRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        style={{ width: dimensions.width, height: dimensions.height }}
                        className='bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden relative'>
                        {/* Drag handle */}
                        <div onMouseDown={startResizing} className='absolute bottom-0 right-0 w-4 h-4 bg-transparent cursor-nwse-resize z-10' />

                        <div className='bg-blue-600 text-white p-4 flex justify-between items-center'>
                            <h2 className='text-lg font-semibold'>Help Desk</h2>
                            <X className='cursor-pointer' onClick={toggleChat} />
                        </div>

                        <div className='flex-1 p-4 overflow-y-auto space-y-3'>
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`max-w-[75%] p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start mr-auto'}`}>
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && <div className='bg-gray-100 text-gray-500 px-3 py-2 rounded-lg w-fit text-sm'>Typing...</div>}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className='p-3 flex items-center border-t'>
                            <input
                                type='text'
                                className='flex-1 p-2 border rounded-lg focus:outline-none'
                                value={input}
                                onKeyDown={handleKeyPress}
                                onChange={e => setInput(e.target.value)}
                                placeholder='Type your message...'
                            />
                            <Button className='ml-2' onClick={toggleListening}>
                                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                            </Button>
                            <Button className='ml-2' onClick={sendMessage}>
                                <Send size={18} />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button className='rounded-full p-3 bg-blue-600 text-white shadow-lg' onClick={toggleChat}>
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </Button>
        </div>
    );
}
