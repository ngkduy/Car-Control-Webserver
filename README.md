Hệ thống bao gồm một xe điều khiển dùng ESP32, module L298N, khung xe và các động cơ.

Hệ thống điều khiển dùng Webserver kết nối với App di động xây dựng bằng React-Native.
## Code điều khiển ESP32
Tham khảo code trong file CarWebServer_Code -> CarWebServer.ino.
Trong đó:
- Khai báo các chân sử dụng, tạo task và đợi yêu cầu từ webserver:
<img src = "https://github.com/ngkduy/Car-Control-Webserver/blob/master/Giao%20di%E1%BB%87n/Khai%20b%C3%A1o.png" width = 300/>

- Khai báo tài nguyên server và file json
<img src = "https://github.com/ngkduy/Car-Control-Webserver/blob/master/Giao%20di%E1%BB%87n/T%C3%A0i%20nguy%C3%AAn%20server%2C%20json.png" width = 300/>

- Đọc dữ liệu app gửi về từ webserver
<img src = "https://github.com/ngkduy/Car-Control-Webserver/blob/master/Giao%20di%E1%BB%87n/Post%20Webserver.png" width = 300/>

- Hàm điều khiển xe
<img src = "https://github.com/ngkduy/Car-Control-Webserver/blob/master/Giao%20di%E1%BB%87n/%C4%90i%E1%BB%81u%20khi%E1%BB%83n.png" width = 300/>


- Điều kiện điều khiển:
<img src = "https://github.com/ngkduy/Car-Control-Webserver/blob/master/Giao%20di%E1%BB%87n/%C4%90i%E1%BB%81u%20ki%E1%BB%87n.png" width = 300/>


## Giao diện app điều khiển:

* Giao diện đăng nhập
<img src = "https://github.com/ngkduy/Car-Control-Webserver/blob/master/Giao%20di%E1%BB%87n/Sign%20in.png" width = 200/>

*  Giao diện điều khiển gồm 3 tab: Home, Control và Introduce
<img src = "https://github.com/ngkduy/Car-Control-Webserver/blob/master/Giao%20di%E1%BB%87n/Giao%20di%E1%BB%87n%20%C4%91i%E1%BB%81u%20khi%E1%BB%83n.png" width = 500\>

