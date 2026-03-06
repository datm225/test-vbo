load("voice_list.js");

function execute(text, voice) {
    // Sử dụng URL mà bạn đã tìm thấy từ Sangtacviet
    let url = "https://sangtacviet.com/io/s1213/tiktoktts?text=";

    let response = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://sangtacviet.com/', // Bắt buộc để không bị 403
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
            "text": text,
            "voice": voice
        })
    });

    if (response.ok) {
        // QUAN TRỌNG: Sangtacviet thường trả về Binary. 
        // vBook cần Base64 để phát nhạc, hàm .base64() sẽ tự chuyển đổi cho bạn.
        let result = response.base64(); 
        
        if (result && result.length > 100) {
            return Response.success(result);
        }
    }

    return Response.error("Server Sangtacviet không trả về dữ liệu hoặc bạn bị chặn IP.");
}