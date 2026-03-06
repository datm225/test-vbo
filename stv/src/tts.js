load("voice_list.js");
//thay doi
function execute(text, voice) {
    // Endpoint trung gian của Sangtacviet
    var url = "https://sangtacviet.com/io/s1213/tiktoktts?text=";
	
    try {
        var response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://sangtacviet.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            body: JSON.stringify({
                "text": text,
                "voice": voice
            })
        });

        if (response.ok) {
            // vBook cần Base64 để phát nhạc. 
            // Hàm .base64() sẽ chuyển đổi dữ liệu Binary từ server Sangtacviet thành chuỗi chuẩn.
            var result = response.base64(); 
            
            if (result && result.length > 500) {
                return Response.success(result);
            }
        }
    } catch (e) {
        return Response.error("Lỗi thực thi: " + e.message);
    }

    return Response.error("Server không trả về dữ liệu âm thanh hợp lệ.");
}