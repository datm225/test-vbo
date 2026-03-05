load("voice_list.js");

function execute(text, voice) {
    // URL endpoint từ Sangtacviet mà bạn đã tìm thấy
    let url = "https://sangtacviet.com/io/s1213/tiktoktts?text=";

    try {
        let response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://sangtacviet.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                "text": text,
                "voice": voice
            })
        });

        if (response.ok) {
            let resultText = response.text();
            
            // vBook cần nhận được chuỗi Base64 của file MP3 để phát
            // Nếu kết quả trả về là JSON, ta cần bóc tách lấy chuỗi âm thanh
            if (resultText && resultText.startsWith('{')) {
                let result = JSON.parse(resultText);
                if (result.data && result.data.v_str) return Response.success(result.data.v_str);
                if (result.audio) return Response.success(result.audio);
            }
            
            // Nếu không phải JSON, trả về trực tiếp (giả định là chuỗi Base64)
            return Response.success(resultText);
        }
    } catch (e) {
        return Response.error("Không thể kết nối máy chủ Sangtacviet: " + e.message);
    }

    return Response.error("Lỗi: Server không phản hồi dữ liệu âm thanh.");
}