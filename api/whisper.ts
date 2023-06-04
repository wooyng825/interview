const FormData = require('form-data');

export default async function Whisper(file: File) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('model', 'whisper-1');
    formData.append('language', 'ko');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        method: 'POST',
        body: formData,
    });
    return response;
}