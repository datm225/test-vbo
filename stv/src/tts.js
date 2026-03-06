load("voice_list.js");

function execute(text, voice) {
    // URL endpoint của Sangtacviet
    var url = "https://sangtacviet.com/io/s1213/tiktoktts?text=";

    try {
        var response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://sangtacviet.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                "text": text,
                "voice": voice
            })
        });

        if (response.ok) {
            // Lấy nội dung trả về
            var resultText = response.text();
            
            // Nếu là JSON (giống cấu trúc cũ), bóc tách lấy chuỗi base64
            if (resultText && resultText.trim().indexOf('{') === 0) {
                var result = JSON.parse(resultText);
                if (result.data && result.data.v_str) {
                    return Response.success(result.data.v_str);
                }
            }
            
            // Nếu là chuỗi base64 trực tiếp, trả về luôn
            if (resultText && resultText.length > 100) {
                return Response.success(resultText);
            }
        }
    } catch (e) {
        return Response.error("Lỗi: " + e.message);
    }

    return Response.error("Không nhận được dữ liệu âm thanh.");
}