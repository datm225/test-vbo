load("voice_list.js");

function execute(text, voice) {
    // Không cần kiểm tra cookie TikTok vì dùng qua server Sangtacviet
    
    let url = "https://sangtacviet.com/io/s1213/tiktoktts?text=";

    // Gửi yêu cầu POST giống như cách trình duyệt của Sangtacviet thực hiện
    let response = fetch(url, {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'content-type': 'application/json',
            'referrer': 'https://sangtacviet.com/', // Bắt buộc phải có Referer
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
            "text": text,
            "voice": voice // Sử dụng ID giọng nói từ danh sách voice_list.js
        })
    });

    if (response.ok) {
        let resultText = response.text();

        // Kiểm tra nếu server trả về JSON chứa chuỗi Base64
        if (resultText.startsWith('{')) {
            let result = JSON.parse(resultText);
            // Cấu trúc dữ liệu trả về thường nằm trong v_str hoặc tương đương
            if (result.data && result.data.v_str) {
                return Response.success(result.data.v_str);
            } else if (result.audio) {
                return Response.success(result.audio);
            }
        }
        
        // Nếu server trả về thẳng chuỗi Base64 (không phải JSON)
        return Response.success(resultText);
    }

    return Response.error("Lỗi kết nối đến server Sangtacviet.");
}