load("voice_list.js");

function execute(text, voice) {
    // Không cần kiểm tra cookie TikTok vì Sangtacviet đã xử lý proxy
    
    let url = "https://sangtacviet.com/io/s1213/tiktoktts?text=";

    // Gửi yêu cầu POST theo đúng cấu trúc của Sangtacviet
    let response = fetch(url, {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'content-type': 'application/json',
            'referrer': 'https://sangtacviet.com/', // Bắt buộc để tránh lỗi 403
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
            "text": text,
            "voice": voice // Sử dụng ID giọng nói được chọn từ danh sách
        })
    });

    let resultText = response.text();

    // Xử lý kết quả trả về từ server
    if (resultText && resultText.startsWith('{')) {
        let result = JSON.parse(resultText);
        // Kiểm tra cấu trúc dữ liệu trả về (v_str hoặc trực tiếp audio)
        if (result.data && result.data.v_str) {
            return Response.success(result.data.v_str);
        } else if (result.audio) {
            return Response.success(result.audio);
        }
    }

    // Nếu server trả về thẳng chuỗi Base64
    return Response.success(resultText);
}