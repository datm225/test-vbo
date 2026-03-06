load("voice_list.js");

function execute(text, voice) {
    // Endpoint của Sangtacviet
    var url = "https://sangtacviet.com/io/s1213/tiktoktts?text=";

    try {
        // Sử dụng var thay cho let/const để tránh lỗi môi trường cũ
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
            var resultText = response.text();

            // Kiểm tra nếu là JSON
            if (resultText && resultText.indexOf('{') === 0) {
                var result = JSON.parse(resultText);
                if (result.data && result.data.v_str) {
                    return Response.success(result.data.v_str);
                }
            }

            // Nếu server trả về trực tiếp chuỗi Base64
            if (resultText && resultText.length > 100) {
                return Response.success(resultText);
            }
        }
    } catch (e) {
        return Response.error("Lỗi thực thi: " + e.message);
    }

    return Response.error("Không nhận được dữ liệu âm thanh từ server.");
}