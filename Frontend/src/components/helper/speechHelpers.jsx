export const startSpeechRecognition = (onResult, onEnd) => {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser.');
        return null;
    }

    const recognition = new webkitSpeechRecognition(); // Chrome-specific
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
    };

    recognition.onerror = event => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = onEnd;

    recognition.start();
    return recognition;
};

export const speakText = text => {
    if (!window.speechSynthesis) {
        alert('Text-to-speech is not supported in this browser.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
};
